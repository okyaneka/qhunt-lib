import { Timestamps, DefaultListParams } from "../../helpers";
import { UserPublicForeign } from "../UserPublicModel";
import { StageForeign } from "../StageModel";
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
export interface UserStage extends Timestamps {
    id: string;
    userPublic: UserPublicForeign;
    stage: StageForeign;
    status: UserStageStatus;
    score: number | null;
    contents: string[];
}
//# sourceMappingURL=types.d.ts.map