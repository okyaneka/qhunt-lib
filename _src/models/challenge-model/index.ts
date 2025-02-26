import { Model, model, models, Schema } from "mongoose";
import {
  Challenge,
  ChallengeForeign,
  ChallengeSettings,
  ChallengeSettingsForeign,
} from "~";
import { CHALLENGE_STATUS, CHALLENGE_TYPES } from "~/helpers/contants";
import { FeedbackSchema, IdNameSchema, ToObject } from "~/helpers/model";

const ChallengeSettingsSchema = new Schema<ChallengeSettings>(
  {
    type: {
      type: String,
      enum: Object.values(CHALLENGE_TYPES),
      required: true,
    },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: FeedbackSchema },
  },
  { _id: false, versionKey: false }
);

export const ChallengeSettingsForeignSchema =
  new Schema<ChallengeSettingsForeign>(
    {
      type: {
        type: String,
        enum: Object.values(CHALLENGE_TYPES),
        required: true,
      },
      duration: { type: Number },
    },
    { _id: false }
  );

export const ChallengeForeignSchema = new Schema<ChallengeForeign>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    order: { type: Number, default: null },
  },
  { _id: false }
);

const ChallengeSchema = new Schema<Challenge>(
  {
    name: { type: String, required: true },
    stage: { type: IdNameSchema, default: null },
    storyline: { type: [String] },
    status: {
      type: String,
      enum: Object.values(CHALLENGE_STATUS),
      default: CHALLENGE_STATUS.Draft,
    },
    order: { type: Number, default: null },
    settings: { type: ChallengeSettingsSchema, default: null },
    contents: { type: [String] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

ChallengeSchema.set("toJSON", ToObject);
ChallengeSchema.set("toObject", ToObject);

const ChallengeModel =
  (models.Challenge as Model<Challenge>) || model("Challenge", ChallengeSchema);

export default ChallengeModel;
