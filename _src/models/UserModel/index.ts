import { Model, model, models, Schema, ToObjectOptions } from "mongoose";
import { User, UserRole } from "./types";

const ToObject: ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, __v, password, ...rest } = ret;
    return { id: _id, ...rest };
  },
};

const UserSchema = new Schema<User>(
  {
    name: { type: String, default: "" },
    role: { type: String, enum: Object.values(UserRole) },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", ToObject);
UserSchema.set("toObject", ToObject);

export * from "./types";

const UserModel = (models.User as Model<User>) || model("User", UserSchema);

export default UserModel;
