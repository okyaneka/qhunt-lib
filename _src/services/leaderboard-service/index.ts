import { PipelineStage } from "mongoose";
import UserStageModel from "~/models/user-stage-model";
import { LeaderboardData, LeaderboardStage } from "~/types/leaderboard";

export const stage = async (
  stageId: string,
  TID?: string,
  limit?: number
): Promise<LeaderboardData> => {
  const filter = { "stage.id": stageId, results: { $ne: null } };
  const pipelines: PipelineStage[] = [
    { $match: filter },
    {
      $setWindowFields: {
        sortBy: { "results.totalScore": -1 },
        output: { rank: { $rank: {} } },
      },
    },
    {
      $project: {
        rank: 1,
        userPublic: 1,
        stage: 1,
        totalScore: "$results.totalScore",
      },
    },
  ];

  if (limit) pipelines.splice(2, 0, { $limit: limit });
  else if (TID) pipelines.splice(2, 0, { $match: { "userPublic.code": TID } });

  const total = await UserStageModel.countDocuments(filter);

  const ranks = await UserStageModel.aggregate<LeaderboardStage>(pipelines);

  return { ranks, total };
};

const LeaderboardService = { stage } as const;

export default LeaderboardService;
