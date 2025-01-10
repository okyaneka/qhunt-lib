import UserPublic from "~/models/UserPublicModel";

export const sync = async (TID: string) => {
  const exists = await UserPublic.findOne({ code: TID, deletedAt: null });
  if (exists) return exists.toObject();
  return (await UserPublic.create({ code: TID, deletedAt: null })).toObject();
};

export const verify = async (code: string) => {
  const user = await UserPublic.findOne({ code, deletedAt: null });
  if (!user) throw new Error("code invalid");
  return user.toObject();
};

const UserPublicService = { sync, verify };

export default UserPublicService;
