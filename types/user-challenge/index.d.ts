import { Timestamps, DefaultListParams, ValueOf } from "../../helpers/types";
import { ChallengeForeign, ChallengeSettingsForeign } from "../challenge";
import { UserPublicForeign } from "../user-public";
import { UserStageForeign } from "../user-stage";
/**
 * Status description
 *
 * Undiscovered  : when challenge not discovered yet
 * Discovered    : when challenge discovered
 * Ongoing       : when user start doing the challenge
 * Completed     : when user complete the challenge
 * Failed        : when user fail the challenge
 */
export declare const USER_CHALLENGE_STATUS: {
    readonly Undiscovered: "undiscovered";
    readonly Discovered: "discovered";
    readonly OnGoing: "ongoing";
    readonly Completed: "completed";
    readonly Failed: "failed";
};
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
    totalCorrect: number;
    baseScore: number;
    contentBonus: number;
    bonus: number;
    totalScore: number;
}
export interface UserChallengeSummary {
    code: string;
    userPublic: UserPublicForeign;
    userStage: UserStageForeign;
    totalBaseScore: number;
    totalBonus: number;
    totalScore: number;
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
//# sourceMappingURL=index.d.ts.map