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
        ChallengeForeignValidator: import("joi").ObjectSchema<import("../models/ChallengeModel").ChallengeForeign>;
        ChallengeListParamsValidator: import("joi").ObjectSchema<import("../models/ChallengeModel").ChallengeListParams>;
        ChallengePayloadValidator: import("joi").ObjectSchema<import("../models/ChallengeModel").ChallengePayload>;
        ChallengeSettingsForeignValidator: import("joi").ObjectSchema<import("../models/ChallengeModel").ChallengeSettingsForeign>;
        ChallengeSettingsValidator: import("joi").ObjectSchema<import("../models/ChallengeModel").ChallengeSettings>;
    };
    readonly QrValidator: {
        QrListParamsValidator: import("joi").ObjectSchema<import("../models/QrModel").QrListParams>;
        QrGeneratePayloadValidator: import("joi").ObjectSchema<import("../models/QrModel").QrGeneratePayload>;
        QrUpdatePayloadValidator: import("joi").ObjectSchema<import("../models/QrModel").QrUpdatePayload>;
        QrDeleteBulkPayloadValidator: import("joi").ObjectSchema<import("../models/QrModel").QrDeleteBulkPayload>;
    };
    readonly StageValidator: {
        StageSettingsValidator: import("joi").ObjectSchema<import("../models/StageModel").StageSettings>;
        StageListParamsValidator: import("joi").ObjectSchema<import("../models/StageModel").StageListParams>;
        StagePayloadValidator: import("joi").ObjectSchema<import("../models/StageModel").StagePayload>;
        StageForeignValidator: import("joi").ObjectSchema<import("../models/StageModel").StageForeign>;
    };
    readonly TriviaValidator: {
        TriviaOptionValidator: import("joi").ObjectSchema<import("../models/TriviaModel").TriviaOption>;
        TriviaOptionsValidator: import("joi").ArraySchema<import("../models/TriviaModel").TriviaOption>;
        TriviaPayloadValidator: import("joi").ObjectSchema<import("../models/TriviaModel").TriviaPayload>;
        TriviaItemsPayloadValidator: import("joi").ObjectSchema<{
            items: import("../models/TriviaModel").TriviaPayload[];
        }>;
        TriviaForeignValidator: import("joi").ObjectSchema<import("../models/TriviaModel").TriviaForeign>;
    };
    readonly UserChallengeValidator: {
        UserChallengeForeignValidator: import("joi").ObjectSchema<import("../models/UserChallengeModel").UserChallengeForeign>;
        UserChallengeParamsValidator: import("joi").ObjectSchema<import("../models/UserChallengeModel").UserChallengeParams>;
    };
    readonly UserPublicValidator: {
        UserPublicForeignValidator: import("joi").ObjectSchema<import("../models/UserPublicModel").UserPublicForeign>;
    };
    readonly UserStageValidator: {
        UserStageForeignValidator: import("joi").ObjectSchema<import("../models/UserStageModel").UserStageForeign>;
        UserStageListParamsValidator: import("joi").ObjectSchema<import("../models/UserStageModel").UserStageListParams>;
    };
    readonly UserValidator: {
        UserPayloadValidator: import("joi").ObjectSchema<import("../models/UserModel").UserPayload>;
        UserListParamsValidator: import("joi").ObjectSchema<import("../models/UserModel").UserListParams>;
    };
};
export { ChallengeValidator, QrValidator, StageValidator, TriviaValidator, UserChallengeValidator, UserPublicValidator, UserStageValidator, UserValidator, };
export default validators;
//# sourceMappingURL=index.d.ts.map