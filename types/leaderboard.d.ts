import { IdName, ValueOf } from "..";
import { UserPublicForeign } from "./user-public";
import { LEADERBOARD_MODE } from "../constants";
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
