import Joi from "joi";
import ChallengeValidator from "./ChallengeValidator";
import QrValidator from "./QrValidator";
import StageValidator from "./StageValidator";
import TriviaValidator from "./TriviaValidator";
import UserChallengeValidator from "./UserChallengeValidator";
import UserPublicValidator from "./UserPublicValidator";
import UserStageValidator from "./UserStageValidator";
import UserValidator from "./UserValidator";
declare const validators: {
    readonly ChallengeValidator: {
        ChallengeListParamsValidator: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengeListParams>;
        ChallengeFeedbackValidator: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengeFeedback>;
        ChallengeSettingsSchema: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengeSettings>;
        ChallengeForeignValidator: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengeForeign>;
        ChallengePayloadValidator: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengePayload>;
    };
    readonly QrValidator: {
        QrListQueryValidator: Joi.ObjectSchema<import("../models/QrModel").QrListQuery>;
        QrGeneratePayloadValidator: Joi.ObjectSchema<import("../models/QrModel").QrGeneratePayload>;
        QrUpdatePayloadValidator: Joi.ObjectSchema<import("../models/QrModel").QrUpdatePayload>;
        QrDeleteBulkPayloadValidator: Joi.ObjectSchema<import("../models/QrModel").QrDeleteBulkPayload>;
    };
    readonly StageValidator: {
        StageSettingsValidator: Joi.ObjectSchema<import("../models/StageModel").StageSettings>;
        StageListParamsValidator: Joi.ObjectSchema<import("../models/StageModel").StageListParams>;
        StagePayloadValidator: Joi.ObjectSchema<import("../models/StageModel").StagePayload>;
        StageForeignValidator: Joi.ObjectSchema<import("../models/StageModel").StageForeign>;
    };
    readonly TriviaValidator: {
        TriviaOptionValidator: Joi.ObjectSchema<import("../models/TriviaModel").TriviaOption>;
        TriviaOptionsValidator: Joi.ArraySchema<import("../models/TriviaModel").TriviaOption>;
        TriviaPayloadValidator: Joi.ObjectSchema<import("../models/TriviaModel").TriviaPayload>;
        TriviaItemsPayloadValidator: Joi.ObjectSchema<{
            items: import("../models/TriviaModel").TriviaPayload[];
        }>;
        TriviaForeignValidator: Joi.ObjectSchema<import("../models/TriviaModel").TriviaForeign>;
    };
    readonly UserChallengeValidator: {
        UserChallengeForeignValidator: Joi.ObjectSchema<import("../models/UserChallengeModel").UserChallengeForeign>;
        UserChallengeParamsValidator: Joi.ObjectSchema<import("../models/UserChallengeModel").UserChallengeParams>;
    };
    readonly UserPublicValidator: {
        UserPublicForeignValidator: Joi.ObjectSchema<import("../models/UserPublicModel").UserPublicForeign>;
    };
    readonly UserStageValidator: {
        UserStageForeignValidator: Joi.ObjectSchema<import("../models/UserStageModel").UserStageForeign>;
        UserStageListParamsValidator: Joi.ObjectSchema<import("../models/UserStageModel").UserStageListParams>;
    };
    readonly UserValidator: {
        UserPayloadValidator: Joi.ObjectSchema<import("../models/UserModel").UserPayload>;
        UserListQueryValidator: Joi.ObjectSchema<import("../models/UserModel").UserListQuery>;
    };
};
export interface DefaultListParams {
    page: number;
    limit: number;
    search: string;
}
export declare const DefaultListParamsFields: {
    page: Joi.NumberSchema<number>;
    limit: Joi.NumberSchema<number>;
    search: Joi.StringSchema<string>;
};
export declare const DefaultListQueryFields: {
    page: Joi.NumberSchema<number>;
    limit: Joi.NumberSchema<number>;
    search: Joi.StringSchema<string>;
};
export { ChallengeValidator, QrValidator, StageValidator, TriviaValidator, UserChallengeValidator, UserPublicValidator, UserStageValidator, UserValidator, };
export default validators;
//# sourceMappingURL=index.d.ts.map