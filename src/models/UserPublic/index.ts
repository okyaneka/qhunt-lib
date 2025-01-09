import { model, Schema } from "mongoose";
import { UserPublic, UserPublicForeign, UserPublicGender } from "./types";
import { idNameSchema, ToObject } from "~/helpers/schema";

const UserPublicSchema = new Schema<UserPublic>(
  {
    user: { type: idNameSchema, default: null },
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

const UserPublic = model<UserPublic>(
  "UserPublic",
  UserPublicSchema,
  "usersPublic"
);

export * from "./types";

export const UserPublicForeignSchema = new Schema<UserPublicForeign>(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String },
  },
  { _id: false }
);

export default UserPublic;
