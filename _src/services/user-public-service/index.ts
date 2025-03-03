import { ClientSession } from "mongoose";
import UserModel from "~/models/user-model";
import UserPublicModel from "~/models/user-public-model";
import { createHash, randomBytes } from "crypto";
import { UserPublicFull } from "~/types/user-public";
import { detail as UserServiceDetail } from "../user-service";

export const verify = async (value: string, session?: ClientSession) => {
  if (!value) throw new Error("token is required");

  const userPublic = await UserPublicModel.findOneAndUpdate(
    {
      $or: [{ "user.id": value }, { code: value }],
      deletedAt: null,
    },
    { lastAccessedAt: new Date() },
    { new: true, session }
  );
  if (!userPublic) throw new Error("invalid user");
  return userPublic.toObject();
};

export const detail = async (
  TID: string,
  session?: ClientSession
): Promise<UserPublicFull> => {
  const userPublic = await UserPublicModel.findOne(
    {
      code: TID,
      deletedAt: null,
    },
    null,
    { session }
  );

  if (!userPublic) throw new Error("user_public.not_found");

  const userPublicFull: UserPublicFull = {
    ...userPublic.toObject(),
    user: null,
  };

  if (userPublic?.user?.id) {
    const user = await UserServiceDetail(userPublic.user.id, session);
    userPublicFull.user = user;
  }

  return userPublicFull;
};

export const setup = async (userId?: string) => {
  const timestamp = Date.now();
  const salt = randomBytes(4).toString("hex");
  const code: string = createHash("sha256")
    .update(`${timestamp}${salt}`)
    .digest("hex");
  const payload: any = { code };
  if (userId) {
    const userPublic = await UserPublicModel.findOne({
      "user.id": userId,
      deletedAt: null,
    });
    if (userPublic) return userPublic.toObject();
    const user = await UserModel.findOne({ _id: userId, deletedAt: null });
    if (user) payload.user = { id: user.id, name: user.name };
  }

  const user = await UserPublicModel.create(payload);
  return user.toObject();
};

const UserPublicService = { verify, detail, setup };

export default UserPublicService;
