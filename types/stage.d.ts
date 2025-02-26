import { STAGE_STATUS } from "../constants";
import { DefaultListParams, Periode, Timestamps, ValueOf } from "..";
export type StageStatus = ValueOf<typeof STAGE_STATUS>;
export interface StageSettings {
    periode: Periode | null;
    canDoRandomChallenges: boolean;
    canStartFromChallenges: boolean;
}
export interface StageListParams extends DefaultListParams {
    status: StageStatus | null;
}
export interface StagePayload {
    name: string;
    storyline: string[];
    status: StageStatus;
    contents: string[];
    settings: StageSettings;
}
export type StageSettingsForeign = Pick<StageSettings, "periode">;
export type StageForeign = Pick<Stage, "id" | "name" | "storyline"> & {
    settings: StageSettingsForeign;
};
export interface Stage extends Timestamps {
    id: string;
    name: string;
    storyline: string[];
    status: StageStatus;
    contents: string[];
    settings: StageSettings;
}
//# sourceMappingURL=stage.d.ts.map