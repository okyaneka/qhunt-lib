import { model, Schema } from "mongoose";
import { UserStage, UserStageForeign, UserStageStatus } from "./types";
import { ToObject } from "~/helpers/schema";
import { StageForeignSchema } from "../Stage";
import { UserPublicForeignSchema } from "../UserPublic";

const UserStageSchema = new Schema<UserStage>(
  {
    stage: { type: StageForeignSchema, required: true },
    userPublic: { type: UserPublicForeignSchema, required: true },
    status: {
      type: String,
      enum: Object.values(UserStageStatus),
      default: UserStageStatus.OnGoing,
    },
    score: { type: Number, default: null },
    contents: { type: [String], default: [] },
  },
  { timestamps: true }
);

UserStageSchema.set("toJSON", ToObject);
UserStageSchema.set("toObject", ToObject);

const UserStage = model("UserStage", UserStageSchema, "usersStage");

export * from "./types";

export const UserStageForeignSchema = new Schema<UserStageForeign>(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

export default UserStage;
