import { Timestamps, DefaultListParams } from "~/helpers";
import { ChallengeForeign, ChallengeType } from "../ChallengeModel";
import { UserPublicForeign } from "../UserPublicModel";
import { UserStageForeign } from "../UserStageModel";

// export enum UserChallengeState {
//   Storyline = "storyline",
//   Content = "content",
//   Progress = "progress",
//   Result = "result",
// }

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
