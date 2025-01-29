import Joi from "joi";
import schema from "~/helpers/schema";
import {
  ChallengeForeign,
  ChallengeListParams,
  ChallengePayload,
  ChallengeSettings,
  ChallengeSettingsForeign,
  ChallengeStatusValues,
  ChallengeTypeValues,
} from "~/models/ChallengeModel";
import {
  DefaultListParamsFields,
  FeedbackValidator,
} from "~/helpers/validator";

export const ChallengeListParamsValidator =
  schema.generate<ChallengeListParams>({
    ...DefaultListParamsFields,
    stageId: schema.string().allow("").default(""),
  });

export const ChallengeSettingsValidator = schema.generate<ChallengeSettings>({
  clue: schema.string({ defaultValue: "" }),
  duration: schema.number({ defaultValue: 0 }),
  type: schema
    .string({ required: true })
    .valid(...Object.values(ChallengeTypeValues)),
  feedback: FeedbackValidator,
});

export const ChallengeForeignValidator = schema.generate<ChallengeForeign>({
  id: schema.string({ required: true }),
  name: schema.string({ required: true }),
  order: schema.number({ defaultValue: null }),
  storyline: schema.array(Joi.string(), { defaultValue: [] }),
});

export const ChallengeSettingsForeignValidator =
  schema.generate<ChallengeSettingsForeign>({
    duration: schema.number({ allow: 0 }),
    type: schema
      .string({ required: true })
      .valid(...Object.values(ChallengeTypeValues)),
  });

export const ChallengePayloadValidator = schema.generate<ChallengePayload>({
  name: schema.string({ required: true }),
  storyline: schema.array(schema.string()).default([]),
  stageId: schema.string({ required: true }),
  status: schema
    .string({ required: true })
    .valid(...Object.values(ChallengeStatusValues)),
  settings: ChallengeSettingsValidator.required(),
});

const ChallengeValidator = {
  ChallengeForeignValidator,
  ChallengeListParamsValidator,
  ChallengePayloadValidator,
  ChallengeSettingsForeignValidator,
  ChallengeSettingsValidator,
};

export default ChallengeValidator;
