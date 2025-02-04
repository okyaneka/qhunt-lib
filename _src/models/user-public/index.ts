import { Model, model, models, Schema } from "mongoose";
import { UserPublic, UserPublicForeign, UserPublicGender } from "~/types";
import { ToObject } from "~/helpers/model";
import { UserForeignSchema } from "../user";

export const UserPublicForeignSchema = new Schema<UserPublicForeign>(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String },
  },
  { _id: false }
);

const UserPublicSchema = new Schema<UserPublic>(
  {
    user: { type: UserForeignSchema, default: null },
    code: { type: String, required: true },
    name: { type: String, default: "" },
    dob: { type: Date, default: null },
    gender: {
      type: String,
      enum: Object.values(UserPublicGender),
      default: null,
    },
    phone: { type: String, default: "" },
    lastAccessedAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserPublicSchema.set("toJSON", ToObject);
UserPublicSchema.set("toObject", ToObject);

const UserPublicModel =
  (models.UserPublic as Model<UserPublic>) ||
  model("UserPublic", UserPublicSchema, "usersPublic");

export default UserPublicModel;
