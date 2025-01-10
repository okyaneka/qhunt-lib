import { Model, model, models, Schema } from "mongoose";
import { UserStage, UserStageForeign, UserStageStatus } from "./types";
import { ToObject } from "../../helpers/schema";
import { StageForeignSchema } from "../StageModel";
import { UserPublicForeignSchema } from "../UserPublicModel";

export const UserStageForeignSchema = new Schema<UserStageForeign>(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true },
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
    score: { type: Number, default: null },
    contents: { type: [String], default: [] },
  },
  { timestamps: true }
);

UserStageSchema.set("toJSON", ToObject);
UserStageSchema.set("toObject", ToObject);

export * from "./types";

const UserStageModel =
  (models.UserStage as Model<UserStage>) ||
  model("UserStage", UserStageSchema, "usersStage");

export default UserStageModel;
