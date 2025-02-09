import { enc, lib, SHA256 } from "crypto-js";
import { UserModel } from "~/models";
import { UserPublicModel } from "~/models";

export const verify = async (value: string) => {
  if (!value) throw new Error("token is required");

  const userPublic = await UserPublicModel.findOneAndUpdate(
    {
      $or: [{ "user.id": value }, { code: value }],
      deletedAt: null,
    },
    { lastAccessedAt: new Date() }
  );
  if (!userPublic) throw new Error("invalid user");
  return userPublic.toObject();
};

export const setup = async (userId?: string) => {
  const timestamp = Date.now();
  const salt = lib.WordArray.random(4).toString(enc.Hex);
  const code: string = SHA256(`${timestamp}${salt}`).toString(enc.Hex);
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

const UserPublicService = { verify, setup };

export default UserPublicService;
