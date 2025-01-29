import {
  DefaultListParams,
  Periode,
  PublishingStatus,
  PublishingStatusValues,
  Timestamps,
} from "~/helpers";

export const StageStatusValues = PublishingStatusValues;
export type StageStatus = PublishingStatus;

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
