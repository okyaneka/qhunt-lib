import { enc, lib, SHA256 } from "crypto-js";
import UserPublic from "~/models/UserPublicModel";

export const verify = async (code: string) => {
  const user = await UserPublic.findOne({ code, deletedAt: null });
  if (!user) throw new Error("code invalid");
  user.lastAccessedAt = new Date();
  await user.save();
  return user.toObject();
};

export const setup = async () => {
  const timestamp = Date.now();
  const salt = lib.WordArray.random(4).toString(enc.Hex);
  const code: string = SHA256(`${timestamp}${salt}`).toString(enc.Hex);
  return await UserPublic.create({ code });
};

const UserPublicService = { verify, setup };

export default UserPublicService;
