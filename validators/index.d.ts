import ChallengeValidator from "./challenge";
import QrValidator from "./qr";
import StageValidator from "./stage";
import TriviaValidator from "./trivia";
import UserChallengeValidator from "./user-challenge";
import UserPublicValidator from "./user-public";
import UserStageValidator from "./user-stage";
import UserValidator from "./user";
declare const validators: {
    readonly ChallengeValidator: {
        ChallengeForeignValidator: import("joi").ObjectSchema<import("..").ChallengeForeign>;
        ChallengeListParamsValidator: import("joi").ObjectSchema<import("..").ChallengeListParams>;
        ChallengePayloadValidator: import("joi").ObjectSchema<import("..").ChallengePayload>;
        ChallengeSettingsForeignValidator: import("joi").ObjectSchema<import("..").ChallengeSettingsForeign>;
        ChallengeSettingsValidator: import("joi").ObjectSchema<import("..").ChallengeSettings>;
    };
    readonly QrValidator: {
        QrListParamsValidator: import("joi").ObjectSchema<import("..").QrListParams>;
        QrGeneratePayloadValidator: import("joi").ObjectSchema<import("..").QrGeneratePayload>;
        QrUpdatePayloadValidator: import("joi").ObjectSchema<import("..").QrUpdatePayload>;
        QrDeleteBulkPayloadValidator: import("joi").ObjectSchema<import("..").QrDeleteBulkPayload>;
    };
    readonly StageValidator: {
        StageSettingsValidator: import("joi").ObjectSchema<import("..").StageSettings>;
        StageListParamsValidator: import("joi").ObjectSchema<import("..").StageListParams>;
        StagePayloadValidator: import("joi").ObjectSchema<import("..").StagePayload>;
        StageForeignValidator: import("joi").ObjectSchema<import("..").StageForeign>;
    };
    readonly TriviaValidator: {
        TriviaOptionValidator: import("joi").ObjectSchema<import("..").TriviaOption>;
        TriviaOptionsValidator: import("joi").ArraySchema<import("..").TriviaOption[]>;
        TriviaPayloadValidator: import("joi").ObjectSchema<import("..").TriviaPayload>;
        TriviaItemsPayloadValidator: import("joi").ArraySchema<import("..").TriviaPayload[]>;
        TriviaForeignValidator: import("joi").ObjectSchema<import("..").TriviaForeign>;
    };
    readonly UserChallengeValidator: {
        UserChallengeForeignValidator: import("joi").ObjectSchema<import("..").UserChallengeForeign>;
        UserChallengeParamsValidator: import("joi").ObjectSchema<import("..").UserChallengeParams>;
    };
    readonly UserPublicValidator: {
        UserPublicForeignValidator: import("joi").ObjectSchema<import("..").UserPublicForeign>;
    };
    readonly UserStageValidator: {
        UserStageForeignValidator: import("joi").ObjectSchema<import("..").UserStageForeign>;
        UserStageListParamsValidator: import("joi").ObjectSchema<import("..").UserStageListParams>;
    };
    readonly UserValidator: {
        UserPayloadValidator: import("joi").ObjectSchema<import("..").UserPayload>;
        UserListParamsValidator: import("joi").ObjectSchema<import("..").UserListParams>;
    };
};
export { ChallengeValidator, QrValidator, StageValidator, TriviaValidator, UserChallengeValidator, UserPublicValidator, UserStageValidator, UserValidator, };
export default validators;
//# sourceMappingURL=index.d.ts.map