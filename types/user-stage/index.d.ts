import { Timestamps, DefaultListParams } from "../../helpers/types";
import { UserPublicForeign } from "../user-public";
import { StageForeign } from "../stage";
export declare enum UserStageStatus {
    OnGoing = "ongoing",
    Completed = "completed",
    End = "end"
}
export interface UserStageListParams extends DefaultListParams {
    status: UserStageStatus | null;
}
export interface UserStageForeign {
    id: string;
    stageId: string;
    name: string;
}
export interface UserStageResult {
    baseScore: number;
    challengeBonus: number;
    bonus: number;
    totalScore: number;
}
export interface UserStage extends Timestamps {
    id: string;
    userPublic: UserPublicForeign;
    stage: StageForeign;
    status: UserStageStatus;
    results: UserStageResult | null;
    contents: string[];
}
//# sourceMappingURL=index.d.ts.map