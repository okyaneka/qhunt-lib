import Joi from "joi";
import { ChallengeForeign, ChallengeListParams, ChallengePayload, ChallengeSettings, ChallengeSettingsForeign } from "../../types";
export declare const ChallengeListParamsValidator: Joi.ObjectSchema<ChallengeListParams>;
export declare const ChallengeSettingsValidator: Joi.ObjectSchema<ChallengeSettings>;
export declare const ChallengeForeignValidator: Joi.ObjectSchema<ChallengeForeign>;
export declare const ChallengeSettingsForeignValidator: Joi.ObjectSchema<ChallengeSettingsForeign>;
export declare const ChallengePayloadValidator: Joi.ObjectSchema<ChallengePayload>;
declare const ChallengeValidator: {
    ChallengeForeignValidator: Joi.ObjectSchema<ChallengeForeign>;
    ChallengeListParamsValidator: Joi.ObjectSchema<ChallengeListParams>;
    ChallengePayloadValidator: Joi.ObjectSchema<ChallengePayload>;
    ChallengeSettingsForeignValidator: Joi.ObjectSchema<ChallengeSettingsForeign>;
    ChallengeSettingsValidator: Joi.ObjectSchema<ChallengeSettings>;
};
export default ChallengeValidator;
//# sourceMappingURL=index.d.ts.map