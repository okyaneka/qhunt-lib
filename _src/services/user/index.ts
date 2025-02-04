import { UserListParams, UserPayload, UserRole } from "~/types";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { db } from "~/helpers";
import { UserModel, UserPublicModel } from "~/models";
import {
  setup as UserPublicSetup,
  verify as UserPublicVerify,
} from "../user-public";

export const register = async (payload: UserPayload, code?: string) => {
  return await db.transaction(async (session) => {
    const email = payload.email;
    const userExists = await UserModel.findOne({ email }).session(session);
    if (userExists) throw new Error("email taken");

    const password = await hash(payload.password, 10);

    const [user] = await UserModel.create(
      [
        {
          email,
          password,
          role: UserRole.Public,
        },
      ],
      { session }
    );

    await UserPublicModel.findOneAndUpdate(
      { code },
      { $set: { user: { id: user._id, name: user.name } } },
      { new: true, session }
    );

    return user;
  });
};

export const login = async (payload: UserPayload, secret: string) => {
  const email = payload.email;
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("user not found");

  const isPasswordValid = await compare(payload.password, user.password);

  if (!isPasswordValid) throw new Error("invalid password");

  const userPublic =
    (await UserPublicModel.findOne({ "user.id": user._id }).catch(
      () => null
    )) || (await UserPublicSetup(user.id));

  const token = sign({ id: user._id }, secret, {
    expiresIn: 30 * 24 * 60 * 60,
  });

  const { _id: id, name } = user;

  return { id, name, email, TID: userPublic.code, token };
};

export const profile = async (bearer: string) => {};

export const list = async (params: UserListParams) => {};

export const create = async (payload: UserPayload) => {};

export const detail = async (id: string) => {
  const user = await UserModel.findOne({ _id: id, deletedAt: null }).catch(
    () => {}
  );

  if (!user) throw new Error("user not found");

  const meta = await UserPublicVerify(user.id);

  return {
    ...user.toObject(),
    meta,
  };
};

export const update = async (id: string, payload: UserPayload) => {};

export const _delete = async (id: string) => {};

const UserService = {
  register,
  login,
  profile,
  list,
  create,
  detail,
  update,
  delete: _delete,
};

export default UserService;
