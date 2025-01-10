import Joi from "joi";
import schema from "~/helpers/schema";
import {
  StageForeign,
  StageListParams,
  StagePayload,
  StageStatus,
} from "~/models/StageModel";
import { DefaultListQueryFields } from "..";
import { PeriodeValidator } from "~/helpers/validator";

export const StageSettingsValidator = schema.generate<StagePayload["settings"]>(
  {
    canDoRandomChallenges: schema.boolean({ defaultValue: false }),
    canStartFromChallenges: schema.boolean({ defaultValue: false }),
    periode: PeriodeValidator.allow(null),
  }
);

export const StageListParamsValidator = schema.generate<StageListParams>({
  ...DefaultListQueryFields,
  status: schema.string({ allow: null }).valid(...Object.values(StageStatus)),
});

export const StagePayloadValidator = schema.generate<StagePayload>({
  name: schema.string({ required: true }),
  storyline: schema.array(Joi.string()).default([]),
  contents: schema.array(Joi.string()).default([]),
  status: schema
    .string({ required: true })
    .valid(...Object.values(StageStatus)),
  settings: StageSettingsValidator.required(),
});

export const StageForeignValidator = schema.generate<StageForeign>({
  id: schema.string({ required: true }),
  name: schema.string({ required: true }),
  storyline: schema.array(Joi.string(), { defaultValue: [] }),
  settings: schema.generate<StageForeign["settings"]>({
    periode: PeriodeValidator.allow(null),
  }),
});

const StageValidator = {
  StageSettingsValidator,
  StageListParamsValidator,
  StagePayloadValidator,
  StageForeignValidator,
};

export default StageValidator;
