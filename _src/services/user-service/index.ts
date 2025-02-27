import {
  UserListParams,
  UserPayload,
  UserPublicPayload,
  UserRole,
  S3Foreign,
  S3Payload,
  UserForeign,
} from "~";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import db from "~/helpers/db";
import UserModel from "~/models/user-model";
import UserPublicModel from "~/models/user-public-model";
import { verify as UserPublicVerify } from "../user-public-service";
import { ClientSession } from "mongoose";
import { userSync as stageSync } from "~/services/user-stage-service";
import { userSync as challengeSync } from "~/services/user-challenge-service";
import { set as S3Set, _delete as S3Delete } from "../s3-service";
import { redis } from "~/plugins/redis";

export const register = async (payload: UserPayload, TID: string) => {
  return await db.transaction(async (session) => {
    const { email, name, password: rawPassword } = payload;

    const userPublic = await UserPublicVerify(TID, session);
    if (userPublic.user?.id) throw new Error("user already exists");

    const userExists = await UserModel.findOne({ email }, { _id: 1 }).session(
      session
    );
    if (userExists) throw new Error("email taken");

    const password = await hash(rawPassword, 10);

    const [user] = await UserModel.create(
      [
        {
          name,
          email,
          password,
          role: UserRole.Public,
        },
      ],
      { session }
    );

    const data = {
      name: user.name,
      user: { id: user._id, name: user.name, email: user.email },
    };

    await UserPublicModel.updateOne({ code: TID }, { $set: data }, { session });

    await dataSync(TID, session);

    return user.toObject();
  });
};

export const login = async (
  payload: Omit<UserPayload, "name">,
  secret: string
) => {
  const email = payload.email;
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("user not found");

  const isPasswordValid = await compare(payload.password, user.password);

  if (!isPasswordValid) throw new Error("invalid password");

  const userPublic = await UserPublicModel.findOne({ "user.id": user._id });
  if (!userPublic) throw new Error("user_public.not_found");

  // .catch(
  //   () => null
  // )) || (await UserPublicSetup(user.id));

  const token = sign({ id: user._id }, secret, {
    expiresIn: 30 * 24 * 60 * 60,
  });

  const { _id: id, name } = user;

  return { id, name, email, TID: userPublic.code, token };
};

export const profile = async (bearer: string) => {};

export const list = async (params: UserListParams) => {};

export const create = async (payload: UserPayload) => {};

export const detail = async (id: string, session?: ClientSession) => {
  const user = await UserModel.findOne({ _id: id, deletedAt: null }, null, {
    session,
  });

  if (!user) throw new Error("user not found");

  const meta = await UserPublicVerify(user.id, session);

  return {
    ...user.toObject(),
    meta,
  };
};

export const update = async (id: string, payload: UserPublicPayload) => {
  return db.transaction(async (session) => {
    await UserModel.updateOne(
      { _id: id },
      { $set: { name: payload.name } },
      { session, new: true }
    );
    const userPublic = await UserPublicModel.findOneAndUpdate(
      { "user.id": id },
      { $set: { ...payload, "user.name": payload.name } },
      { session, new: true }
    );
    if (!userPublic) throw new Error("user.not_found");

    await dataSync(userPublic.code, session);

    redis.pub("update-user", userPublic);

    return userPublic.toObject();
  });
};

export const updatePhoto = async (userId: string, payload: S3Payload) => {
  return db.transaction(async (session) => {
    const user = await detail(userId, session);
    const userPublic = await UserPublicModel.findOne({ "user.id": userId });

    if (!userPublic) throw new Error("user.not_found");

    const oldPhoto = user.photo?.fileName;
    if (oldPhoto) await S3Delete(oldPhoto);

    const res = await S3Set(payload, userId, session);

    const photo: S3Foreign = {
      fileName: res.fileName,
      fileSize: res.fileSize,
      fileUrl: res.fileUrl,
    };

    await UserModel.updateOne({ _id: user.id }, { $set: { photo } });

    const newUser: UserForeign = {
      id: user.id,
      email: user.email,
      name: user.name,
      photo: res.fileUrl,
    };
    userPublic.user = newUser;
    redis.pub("update-user", userPublic);

    return userPublic;
  });
};

export const _delete = async (id: string) => {};

export const dataSync = async (TID: string, session?: ClientSession) => {
  await stageSync(TID, session);
  await challengeSync(TID, session);
};

const UserService = {
  register,
  login,
  profile,
  list,
  create,
  detail,
  update,
  updatePhoto,
  delete: _delete,
};

export default UserService;
