import S3Model from "~/models/s3-model";
import { UserForeign } from "~";
import { ClientSession } from "mongoose";
import { S3Payload } from "~/types/s3";
import { awsS3 } from "~/plugins/aws-s3";
import { UserModel } from "~/models";

export const S3ServiceSet = async (
  payload: S3Payload,
  userId: string,
  session?: ClientSession
) => {
  const resS3 = await awsS3.put(payload);
  if (!resS3) throw new Error("s3.failed_upload");

  const userData = await UserModel.findOne({ _id: userId }, null, { session });
  if (!userData) throw new Error("s3.user_empty");

  const user: UserForeign = {
    id: userData._id.toString(),
    name: userData.name,
    email: userData.email,
    photo: null,
  };

  const [item] = await S3Model.create(
    [
      {
        fileName: resS3.fileName,
        fileUrl: resS3.fileUrl,
        fileSize: payload.buffer.length,
        fileType: payload.mimetype,
        user,
      },
    ],
    { session }
  );

  return item.toObject();
};

export const S3ServiceGet = async (path: string) => {};

export const S3ServiceDelete = async (key: string, session?: ClientSession) => {
  const res = await awsS3.delete(key);
  await S3Model.deleteOne({ fileName: key }, { session });
  return res;
};

const S3Service = {
  set: S3ServiceSet,
  get: S3ServiceGet,
  delete: S3ServiceDelete,
} as const;

export default S3Service;
