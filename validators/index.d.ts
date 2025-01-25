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
        ChallengeFeedbackValidator: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengeFeedback>;
        ChallengeForeignValidator: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengeForeign>;
        ChallengeListParamsValidator: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengeListParams>;
        ChallengePayloadValidator: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengePayload>;
        ChallengeSettingsForeignValidator: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengeSettingsForeign>;
        ChallengeSettingsValidator: Joi.ObjectSchema<import("../models/ChallengeModel").ChallengeSettings>;
    };
    readonly QrValidator: {
        QrListParamsValidator: Joi.ObjectSchema<import("../models/QrModel").QrListParams>;
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
        UserListParamsValidator: Joi.ObjectSchema<import("../models/UserModel").UserListParams>;
    };
};
export { ChallengeValidator, QrValidator, StageValidator, TriviaValidator, UserChallengeValidator, UserPublicValidator, UserStageValidator, UserValidator, };
export default validators;
//# sourceMappingURL=index.d.ts.map