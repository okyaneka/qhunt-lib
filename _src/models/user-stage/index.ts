import { Model, model, models, Schema } from "mongoose";
import {
  UserStage,
  UserStageForeign,
  UserStageResult,
  UserStageStatus,
} from "~/types";
import { ToObject } from "~/helpers/model";
import { StageForeignSchema } from "../stage";
import { UserPublicForeignSchema } from "../user-public";

export const UserStageForeignSchema = new Schema<UserStageForeign>(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

export const UserStageResultSchema = new Schema<UserStageResult>(
  {
    baseScore: { type: Number, required: true },
    challengeBonus: { type: Number, required: true },
    bonus: { type: Number, required: true },
    totalScore: { type: Number, required: true },
  },
  { _id: false }
);

const UserStageSchema = new Schema<UserStage>(
  {
    stage: { type: StageForeignSchema, required: true },
    userPublic: { type: UserPublicForeignSchema, required: true },
    status: {
      type: String,
      enum: Object.values(UserStageStatus),
      default: UserStageStatus.OnGoing,
    },
    results: { type: UserStageResultSchema, default: null },
    contents: { type: [String], default: [] },
  },
  { timestamps: true }
);

UserStageSchema.set("toJSON", ToObject);
UserStageSchema.set("toObject", ToObject);

const UserStageModel =
  (models.UserStage as Model<UserStage>) ||
  model("UserStage", UserStageSchema, "usersStage");

export default UserStageModel;
