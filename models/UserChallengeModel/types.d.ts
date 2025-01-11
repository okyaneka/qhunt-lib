import { Timestamps, DefaultListParams } from "../../helpers";
import { ChallengeForeign } from "../ChallengeModel";
import { UserPublicForeign } from "../UserPublicModel";
import { UserStageForeign } from "../UserStageModel";
export declare enum UserChallengeStatus {
    Undiscovered = "undiscovered",
    OnGoing = "ongoing",
    Completed = "completed",
    Failed = "failed"
}
export interface UserChallengeForeign {
    id: string;
    challengeId: string;
    name: string;
}
export interface UserChallenge extends Timestamps {
    id: string;
    challenge: ChallengeForeign;
    userStage: UserStageForeign | null;
    userPublic: UserPublicForeign;
    status: UserChallengeStatus;
    score: number | null;
    contents: string[];
}
export interface UserChallengeParams extends DefaultListParams {
    userStageId: string;
    status: UserChallengeStatus | null;
}
//# sourceMappingURL=types.d.ts.map