import { DefaultListParams, Feedback, Timestamps, ValueOf } from "~";
import { Stage } from "./stage";
import { CHALLENGE_STATUS, CHALLENGE_TYPES } from "~/helpers/contants";

export type ChallengeStatus = ValueOf<typeof CHALLENGE_STATUS>;
export type ChallengeType = ValueOf<typeof CHALLENGE_TYPES>;

export interface ChallengeSettings {
  type: ChallengeType;
  duration: number;
  clue: string;
  feedback: Feedback;
}

export interface ChallengeListParams extends DefaultListParams {
  stageId?: string;
  type?: ChallengeType;
}

export interface ChallengePayload {
  name: string;
  storyline: string[];
  stageId: string | null;
  status: ChallengeStatus;
  settings: ChallengeSettings;
}

export type ChallengeSettingsForeign = Pick<
  ChallengeSettings,
  "type" | "duration"
>;

export type ChallengeForeign = Pick<
  Challenge,
  "id" | "name" | "storyline" | "order"
>;

export interface Challenge extends Timestamps {
  id: string;
  stage: Pick<Stage, "id" | "name"> | null;
  name: string;
  storyline: string[];
  order: number | null;
  status: ChallengeStatus;
  settings: ChallengeSettings;
  contents: string[];
}
