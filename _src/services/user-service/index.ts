import {
  UserListParams,
  UserPayload,
  UserPublicPayload,
  S3Foreign,
  S3Payload,
  UserForeign,
  UserProvider,
  UserLoginPayload,
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
import { S3ServiceSet, S3ServiceDelete } from "../s3-service";
import { redis } from "~/plugins/redis";
import { USER_PROVIDERS, USER_ROLES } from "~/constants";
import { User as FirebaseUser } from "firebase/auth";
import { urlToBuffer } from "~/helpers";

export const register = async (payload: UserPayload, TID: string) => {
  return await db.transaction(async (session) => {
    const { email, name, password: rawPassword } = payload;

    const userPublic = await UserPublicVerify(TID, session);
    if (userPublic.user?.id) throw new Error("user.exists");

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
          role: USER_ROLES.Public,
          provider: [USER_PROVIDERS.Email],
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

export const googleSign = async (payload: FirebaseUser, TID: string) => {
  return await db.transaction(async (session) => {
    const { email, displayName: name, photoURL, phoneNumber: phone } = payload;
    if (!(email && name)) throw new Error("user.payload_invalid");

    const user = await Promise.resolve().then(async () => {
      const userExists = await UserModel.findOne({ email }, null, { session });
      if (userExists) {
        if (!userExists.provider.includes(USER_PROVIDERS.Google)) {
          userExists.provider.push(USER_PROVIDERS.Google);
          await userExists.save({ session });
        }
        return userExists;
      }

      const [user] = await UserModel.create(
        [{ name, email, provider: ["google"] }],
        { session }
      );
      return user;
    });

    if (user.provider.includes(USER_PROVIDERS.Google)) return user.toObject();

    const userId = user._id.toString();

    const userForeign: UserForeign = {
      id: userId,
      name,
      email,
      photo: user.photo?.fileUrl || null,
    };

    if (photoURL) {
      const res = await urlToBuffer(photoURL);
      const s3payload: S3Payload = {
        ...res,
        filename: `${name}_photo`,
      };
      const photo = await S3ServiceSet(s3payload, userId, session);

      userForeign.photo = photo.fileUrl;
      const s3foreign: S3Foreign = {
        fileName: photo.fileName,
        fileSize: photo.fileSize,
        fileUrl: photo.fileUrl,
      };
      await UserModel.updateOne(
        { _id: userId },
        { $set: { photo: s3foreign } },
        { session }
      );
    }

    await UserPublicModel.findOneAndUpdate(
      { "user.id": userId },
      { $set: { name, phone, user: userForeign } },
      { session, new: true }
    );

    await dataSync(TID, session);

    const userResult = await UserModel.findOne({ _id: userId }, null, {
      session,
    });

    return userResult?.toObject();
  });
};

export const login = async (
  payload: UserLoginPayload,
  provider: UserProvider,
  secret: string
) => {
  const email = payload.email;
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("user not found");

  if (provider == "email") {
    if (!user.password) throw new Error("user.password_empty");
    if (!payload.password) throw new Error("login.password_empty");
    const isPasswordValid = await compare(payload.password, user.password);
    if (!isPasswordValid) throw new Error("invalid password");
  }

  const userPublic = await UserPublicModel.findOne({ "user.id": user._id });
  if (!userPublic) throw new Error("user_public.not_found");

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
  return await db.transaction(async (session) => {
    const user = await detail(userId, session);
    const userPublic = await UserPublicModel.findOne({ "user.id": userId });

    if (!userPublic) throw new Error("user.not_found");

    const oldPhoto = user.photo?.fileName;
    if (oldPhoto) await S3ServiceDelete(oldPhoto);

    const res = await S3ServiceSet(payload, userId, session);

    const photo: S3Foreign = {
      fileName: res.fileName,
      fileSize: res.fileSize,
      fileUrl: res.fileUrl,
    };

    await UserModel.updateOne(
      { _id: user.id },
      { $set: { photo } },
      { session }
    );

    const newUser: UserForeign = {
      id: user.id,
      email: user.email,
      name: user.name,
      photo: res.fileUrl,
    };
    userPublic.user = newUser;
    await userPublic.save({ session });
    redis.pub("update-user", userPublic);

    return userPublic.toObject();
  });
};

export const _delete = async (id: string) => {};

export const dataSync = async (TID: string, session?: ClientSession) => {
  await stageSync(TID, session);
  await challengeSync(TID, session);
};

const UserService = {
  register,
  googleSign,
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
