import Joi from "joi";
import { ChallengeFeedback, ChallengeForeign, ChallengeListParams, ChallengePayload, ChallengeSettings } from "~/models/ChallengeModel";
export declare const ChallengeListParamsValidator: Joi.ObjectSchema<ChallengeListParams>;
export declare const ChallengeFeedbackValidator: Joi.ObjectSchema<ChallengeFeedback>;
export declare const ChallengeSettingsSchema: Joi.ObjectSchema<ChallengeSettings>;
export declare const ChallengeForeignValidator: Joi.ObjectSchema<ChallengeForeign>;
export declare const ChallengePayloadValidator: Joi.ObjectSchema<ChallengePayload>;
declare const ChallengeValidator: {
    ChallengeListParamsValidator: Joi.ObjectSchema<ChallengeListParams>;
    ChallengeFeedbackValidator: Joi.ObjectSchema<ChallengeFeedback>;
    ChallengeSettingsSchema: Joi.ObjectSchema<ChallengeSettings>;
    ChallengeForeignValidator: Joi.ObjectSchema<ChallengeForeign>;
    ChallengePayloadValidator: Joi.ObjectSchema<ChallengePayload>;
};
export default ChallengeValidator;
//# sourceMappingURL=index.d.ts.map