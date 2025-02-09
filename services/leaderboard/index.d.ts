import { LeaderboardData } from "../../types/leaderboard";
export declare const stage: (stageId: string, TID?: string, limit?: number) => Promise<LeaderboardData>;
declare const LeaderboardService: {
    readonly stage: (stageId: string, TID?: string, limit?: number) => Promise<LeaderboardData>;
};
export default LeaderboardService;
//# sourceMappingURL=index.d.ts.map