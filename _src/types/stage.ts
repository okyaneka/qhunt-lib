import { STAGE_STATUS } from "~/constants";
import {
  DefaultListParams,
  Periode,
  QrForeign,
  Timestamps,
  ValueOf,
} from "~/index";

export type StageStatus = ValueOf<typeof STAGE_STATUS>;

export interface StageSettings {
  periode: Periode | null;
  unlockAll: boolean;
  canDoRandomChallenges: boolean;
  canStartFromChallenges: boolean;
}

export interface StageListParams extends DefaultListParams {
  status: StageStatus | null;
}

export interface StagePayload {
  name: string;
  storyline: string[];
  prologue: string[];
  epilogue: string[];
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
  prologue: string[];
  epilogue: string[];
  status: StageStatus;
  contents: string[];
  settings: StageSettings;
  qr: QrForeign | null;
}
