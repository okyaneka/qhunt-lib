import Joi from "joi";
import schema from "~/helpers/schema";
import {
  CHALLENGE_STATUS,
  CHALLENGE_TYPES,
  ChallengeForeign,
  ChallengeListParams,
  ChallengePayload,
  ChallengeSettings,
  ChallengeSettingsForeign,
} from "~/types";
import {
  DefaultListParamsFields,
  FeedbackValidator,
} from "~/helpers/validator";

export const ChallengeListParamsValidator =
  schema.generate<ChallengeListParams>({
    ...DefaultListParamsFields,
    type: schema.string().valid(...Object.values(CHALLENGE_TYPES)),
    stageId: schema.string().allow(null, ""),
  });

export const ChallengeSettingsValidator = schema.generate<ChallengeSettings>({
  clue: schema.string({ defaultValue: "" }),
  duration: schema.number({ defaultValue: 0 }),
  type: schema
    .string({ required: true })
    .valid(...Object.values(CHALLENGE_TYPES)),
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
      .valid(...Object.values(CHALLENGE_TYPES)),
  });

export const ChallengePayloadValidator = schema.generate<ChallengePayload>({
  name: schema.string({ required: true }),
  storyline: schema.array(schema.string()).default([]),
  stageId: schema.string().allow(null, ""),
  status: schema
    .string({ required: true, defaultValue: CHALLENGE_STATUS.Draft })
    .valid(...Object.values(CHALLENGE_STATUS)),
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
