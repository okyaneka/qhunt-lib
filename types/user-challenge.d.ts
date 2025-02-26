import { Timestamps, DefaultListParams, ValueOf, ScoreSummary } from "..";
import { ChallengeForeign, ChallengeSettingsForeign } from "./challenge";
import { UserPublicForeign } from "./user-public";
import { UserStageForeign } from "./user-stage";
import { USER_CHALLENGE_STATUS } from "../constants";
export type UserChallengeStatus = ValueOf<typeof USER_CHALLENGE_STATUS>;
export interface UserChallengeForeign {
    id: string;
    challengeId: string;
    name: string;
}
export interface UserChallengeResult {
    startAt: Date;
    endAt: Date | null;
    timeUsed: number;
    totalItem: number;
    baseScore: number;
    contentBonus: number;
    bonus: number;
    totalScore: number;
}
export interface UserChallengeSummary extends ScoreSummary {
    code: string;
    userPublic: UserPublicForeign;
    userStage: UserStageForeign;
}
export interface UserChallenge extends Timestamps {
    id: string;
    challenge: ChallengeForeign;
    settings: ChallengeSettingsForeign;
    userStage: UserStageForeign | null;
    userPublic: UserPublicForeign;
    status: UserChallengeStatus;
    results: UserChallengeResult | null;
    contents: string[];
}
export interface UserChallengeParams extends DefaultListParams {
    userStageId: string;
    status: UserChallengeStatus | null;
}
//# sourceMappingURL=user-challenge.d.ts.map