import { Model, model, models, Schema } from "mongoose";
import { S3, S3Foreign } from "~/types/s3";
import { UserForeignSchema } from "../user-model";
import { ToObject } from "~/helpers/model";

export const S3ForeignSchema = new Schema<S3Foreign>(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
  },
  { _id: false }
);

const S3Schema = new Schema<S3>(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    user: { type: UserForeignSchema, required: true },
  },
  { timestamps: true }
);

S3Schema.set("toObject", ToObject);
S3Schema.set("toJSON", ToObject);

const S3Model = (models.S3 as Model<S3>) || model("S3", S3Schema);

export default S3Model;
