import { DefaultListParams, Timestamps } from "~/helpers";
import { Stage } from "../StageModel";

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
