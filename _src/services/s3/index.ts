import S3Model from "~/models/s3";
import { detail as UserDetail } from "../user";
import { UserForeign } from "~/types";
import { ClientSession } from "mongoose";
import { S3Payload } from "~/types/s3";
import { S3Helper } from "~/plugins";

export const set = async (
  payload: S3Payload,
  userId: string,
  session?: ClientSession
) => {
  const resS3 = await S3Helper.put(payload);
  if (!resS3) throw new Error("s3.failed_upload");

  const userData = await UserDetail(userId, session);

  const user: UserForeign = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
  };

  const item = await S3Model.create({
    fileName: resS3.fileName,
    fileUrl: resS3.fileUrl,
    fileSize: payload.buffer.length,
    fileType: payload.mimetype,
    user,
  });

  return item.toObject();
};

export const get = async (path: string) => {};

export const _delete = async (key: string) => {
  const res = await S3Helper.delete(key);
  await S3Model.deleteOne({ fileName: key });
  return res;
};

const S3Service = { set, get, delete: _delete } as const;

export default S3Service;
