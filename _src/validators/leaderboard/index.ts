import { schema } from "~/helpers";
import { LEADERBOARD_MODE, LeaderboardParams } from "~/types/leaderboard";

export const LeaderboardParamsValidator = schema.generate<LeaderboardParams>({
  stageId: schema.string({ required: true }),
  mode: schema
    .string({ required: true })
    .valid(...Object.values(LEADERBOARD_MODE)),
});

const LeaderboardValidator = { LeaderboardParamsValidator } as const;

export default LeaderboardValidator;
