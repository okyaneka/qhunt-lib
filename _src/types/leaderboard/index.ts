import { IdName, ValueOf } from "~/helpers/types";
import { UserPublicForeign } from "../user-public";

export const LEADERBOARD_MODE = {
  Ranks: "ranks",
  Current: "current",
} as const;

export type LeaderboardMode = ValueOf<typeof LEADERBOARD_MODE>;

export interface LeaderboardParams {
  stageId: string;
  mode: LeaderboardMode;
}

export interface LeaderboardStage {
  rank: number;
  userPublic: UserPublicForeign;
  stage: IdName;
  totalScore: number;
}

export interface LeaderboardData {
  ranks: LeaderboardStage[];
  total: number;
}
