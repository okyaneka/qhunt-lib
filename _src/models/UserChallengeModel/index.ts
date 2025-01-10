import { Model, model, models, Schema } from "mongoose";
import { ToObject } from "../../helpers/schema";
import {
  UserChallenge,
  UserChallengeForeign,
  UserChallengeStatus,
} from "./types";
import { ChallengeForeignSchema } from "../ChallengeModel";
import { UserPublicForeignSchema } from "../UserPublicModel";
import { UserStageForeignSchema } from "../UserStageModel";

export const UserChallengeForeignSchema = new Schema<UserChallengeForeign>(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const UserChallengeSchema = new Schema<UserChallenge>(
  {
    userStage: { type: UserStageForeignSchema, default: null },
    challenge: { type: ChallengeForeignSchema, required: true },
    userPublic: { type: UserPublicForeignSchema, required: true },
    status: {
      type: String,
      enum: Object.values(UserChallengeStatus),
      default: UserChallengeStatus.Undiscovered,
    },
    contents: { type: [String], default: [] },
    score: { type: Number, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserChallengeSchema.set("toJSON", ToObject);
UserChallengeSchema.set("toObject", ToObject);

export * from "./types";

const UserChallengeModel =
  (models.UserChallenge as Model<UserChallenge>) ||
  model("UserChallenge", UserChallengeSchema, "usersChallenge");

export default UserChallengeModel;
