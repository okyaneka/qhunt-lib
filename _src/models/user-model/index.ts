import { Model, model, models, Schema, ToObjectOptions } from "mongoose";
import { User, UserForeign } from "~";
import { S3ForeignSchema } from "../s3-model";
import { USER_PROVIDERS, USER_ROLES } from "~/constants";

const ToObject: ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, __v, password, ...rest } = ret;
    return { id: _id, ...rest };
  },
};

export const UserForeignSchema = new Schema<UserForeign>(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" },
    email: { type: String, required: true },
    photo: { type: String, default: null },
  },
  { _id: false }
);

const UserSchema = new Schema<User>(
  {
    name: { type: String, default: "" },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.Public,
    },
    email: { type: String, required: true, unique: true },
    photo: { type: S3ForeignSchema, default: null },
    provider: {
      type: [String],
      enum: Object.values(USER_PROVIDERS),
      default: [],
    },
    password: { type: String, default: null },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", ToObject);
UserSchema.set("toObject", ToObject);

const UserModel = (models.User as Model<User>) || model("User", UserSchema);

export default UserModel;
