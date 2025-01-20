import Joi from "joi";
import schema from "~/helpers/schema";
import {
  ChallengeFeedback,
  ChallengeForeign,
  ChallengeListParams,
  ChallengePayload,
  ChallengeSettings,
  ChallengeStatus,
  ChallengeType,
} from "~/models/ChallengeModel";
import { DefaultListParamsFields } from "~/helpers/validator";

export const ChallengeListParamsValidator =
  schema.generate<ChallengeListParams>({
    ...DefaultListParamsFields,
    stageId: schema.string().allow("").default(""),
  });

export const ChallengeFeedbackValidator = schema
  .generate<ChallengeFeedback>({
    positive: schema.string({ allow: "", defaultValue: "" }),
    negative: schema.string({ allow: "", defaultValue: "" }),
  })
  .default({ positive: "", negative: "" });

export const ChallengeSettingsValidator = schema.generate<ChallengeSettings>({
  clue: schema.string({ defaultValue: "" }),
  duration: schema.number({ defaultValue: 0 }),
  type: schema
    .string({ required: true })
    .valid(...Object.values(ChallengeType)),
  feedback: ChallengeFeedbackValidator,
});

export const ChallengeForeignValidator = schema.generate<ChallengeForeign>({
  id: schema.string({ required: true }),
  name: schema.string({ required: true }),
  storyline: schema.array(Joi.string(), { defaultValue: [] }),
  settings: schema.generate<ChallengeForeign["settings"]>({
    duration: schema.number({ allow: 0 }),
    type: schema
      .string({ required: true })
      .valid(...Object.values(ChallengeType)),
  }),
});

export const ChallengePayloadValidator = schema.generate<ChallengePayload>({
  name: schema.string({ required: true }),
  storyline: schema.array(schema.string()).default([]),
  stageId: schema.string({ required: true }),
  status: schema
    .string({ required: true })
    .valid(...Object.values(ChallengeStatus)),
  settings: ChallengeSettingsValidator.required(),
});

const ChallengeValidator = {
  ChallengeListParamsValidator,
  ChallengeFeedbackValidator,
  ChallengeSettingsValidator,
  ChallengeForeignValidator,
  ChallengePayloadValidator,
};

export default ChallengeValidator;
