import { Timestamps, DefaultListParams } from "~/helpers";
import { ChallengeForeign, ChallengeSettingsForeign } from "../ChallengeModel";
import { UserPublicForeign } from "../UserPublicModel";
import { UserStageForeign } from "../UserStageModel";

/**
 * Status description
 *
 * Undiscovered  : when challenge not discovered yet
 * Discovered    : when challenge discovered
 * Ongoing       : when user start doing the challenge
 * Completed     : when user complete the challenge
 * Failed        : when user fail the challenge
 */
export enum UserChallengeStatus {
  Undiscovered = "undiscovered",
  Discovered = "discovered",
  OnGoing = "ongoing",
  Completed = "completed",
  Failed = "failed",
}

export interface UserChallengeForeign {
  id: string;
  challengeId: string;
  name: string;
}

export interface UserChallengeResult {
  startAt: Date;
  endAt: Date | null;
  timeUsed: number;
  baseScore: number;
  correctCount: number;
  correctBonus: number;
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
