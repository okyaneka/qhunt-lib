import { PeriodSchema, ToObject } from "~/helpers/model";
import {
  STAGE_STATUS,
  Stage,
  StageForeign,
  StageSettingsForeign,
} from "~/types";
import { Model, model, models, Schema } from "mongoose";

const StageSettingsSchema = new Schema<Stage["settings"]>(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null },
  },
  { _id: false }
);

export const StageSettingsForeignSchema = new Schema<StageSettingsForeign>(
  {
    periode: { type: PeriodSchema, required: true },
  },
  { _id: false }
);

export const StageForeignSchema = new Schema<StageForeign>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true },
  },
  { _id: false }
);

const StageSchema = new Schema<Stage>(
  {
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    status: {
      type: String,
      enum: Object.values(STAGE_STATUS),
      default: STAGE_STATUS.Draft,
    },
    settings: { type: StageSettingsSchema, required: true },
    contents: { type: [String], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

StageSchema.set("toObject", ToObject);
StageSchema.set("toJSON", ToObject);

const StageModel =
  (models.Stage as Model<Stage>) || model("Stage", StageSchema);

export default StageModel;
