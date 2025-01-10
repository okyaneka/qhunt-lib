import { Model, model, models, Schema } from "mongoose";
import {
  Challenge,
  ChallengeFeedback,
  ChallengeForeign,
  ChallengeSettings,
  ChallengeSettingsForeign,
  ChallengeStatus,
  ChallengeType,
} from "./types";
import { IdNameSchema, ToObject } from "../../helpers/schema";

export const ChallengeFeedbackSchema = new Schema<ChallengeFeedback>(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" },
  },
  { _id: false, versionKey: false }
);

const ChallengeSettingsSchema = new Schema<ChallengeSettings>(
  {
    type: { type: String, enum: Object.values(ChallengeType), required: true },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: ChallengeFeedbackSchema },
  },
  { _id: false, versionKey: false }
);

export const ChallengeSettingsForeignSchema =
  new Schema<ChallengeSettingsForeign>(
    {
      type: {
        type: String,
        enum: Object.values(ChallengeType),
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
    settings: { type: ChallengeSettingsSchema, required: true },
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
      enum: Object.values(ChallengeStatus),
      default: ChallengeStatus.Draft,
    },
    settings: { type: ChallengeSettingsSchema, default: null },
    contents: { type: [String] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

ChallengeSchema.set("toJSON", ToObject);
ChallengeSchema.set("toObject", ToObject);

export * from "./types";

const ChallengeModel =
  (models.Challenge as Model<Challenge>) || model("Challenge", ChallengeSchema);

export default ChallengeModel;
