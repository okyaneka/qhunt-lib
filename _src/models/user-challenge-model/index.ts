import { Model, model, models, Schema } from "mongoose";
import { ToObject } from "~/helpers/model";
import {
  UserChallenge,
  UserChallengeForeign,
  UserChallengeResult,
} from "~/index";
import {
  ChallengeForeignSchema,
  ChallengeSettingsForeignSchema,
} from "../challenge-model";
import { UserPublicForeignSchema } from "../user-public-model";
import { UserStageForeignSchema } from "../user-stage-model";
import { USER_CHALLENGE_STATUS } from "~/constants";

export const UserChallengeForeignSchema = new Schema<UserChallengeForeign>(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

export const UserChallengeResultSchema = new Schema<UserChallengeResult>(
  {
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true },
    contentBonus: { type: Number, required: true },
    totalItem: { type: Number, required: true },
    totalScore: { type: Number, required: true },
    startAt: { type: Date, default: Date.now() },
    endAt: { type: Date, default: null },
    timeUsed: { type: Number, required: true },
  },
  { _id: false }
);

const UserChallengeSchema = new Schema<UserChallenge>(
  {
    userStage: { type: UserStageForeignSchema, default: null },
    challenge: { type: ChallengeForeignSchema, required: true },
    settings: { type: ChallengeSettingsForeignSchema, required: true },
    userPublic: { type: UserPublicForeignSchema, required: true },
    status: {
      type: String,
      enum: Object.values(USER_CHALLENGE_STATUS),
      default: USER_CHALLENGE_STATUS.Undiscovered,
    },
    contents: { type: [String], default: [] },
    results: { type: UserChallengeResultSchema, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserChallengeSchema.set("toJSON", ToObject);
UserChallengeSchema.set("toObject", ToObject);

const UserChallengeModel =
  (models.UserChallenge as Model<UserChallenge>) ||
  model("UserChallenge", UserChallengeSchema, "usersChallenge");

export default UserChallengeModel;
