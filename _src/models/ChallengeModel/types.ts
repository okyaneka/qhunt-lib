import { DefaultListParams } from "~/validators";
import { Stage } from "../StageModel";
import { Timestamps } from "~/helpers";

export enum ChallengeStatus {
  Draft = "draft",
  Publish = "publish",
}

export enum ChallengeType {
  Trivia = "trivia",
}

export interface ChallengeFeedback {
  positive: string;
  negative: string;
}

export interface ChallengeSettings {
  type: ChallengeType;
  duration: number;
  clue: string;
  feedback: ChallengeFeedback;
}

export interface ChallengeListParams extends DefaultListParams {
  stageId: string;
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

export type ChallengeForeign = Pick<Challenge, "id" | "name" | "storyline"> & {
  settings: ChallengeSettingsForeign;
};

export interface Challenge extends Timestamps {
  id: string;
  stage: Pick<Stage, "id" | "name"> | null;
  name: string;
  storyline: string[];
  status: ChallengeStatus;
  settings: ChallengeSettings;
  contents: string[];
}
