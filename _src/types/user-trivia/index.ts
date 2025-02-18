import { ScoreSummary } from "~/helpers/types";
import { TriviaForeign } from "../trivia";
import { UserChallengeForeign } from "../user-challenge";
import { UserPublicForeign } from "../user-public";
import { CHALLENGE_TYPES } from "../challenge";

export interface UserTriviaSummary extends ScoreSummary {
  type: typeof CHALLENGE_TYPES.Trivia;
  userPublic: UserPublicForeign;
  userChallenge: UserChallengeForeign;
}

export interface UserTriviaResult {
  answer: string | null;
  baseScore: number;
  bonus: number;
  totalScore: number;
  isCorrect: boolean;
  feedback: string | null;
}

export interface UserTrivia {
  id: string;
  userPublic: UserPublicForeign;
  userChallenge: UserChallengeForeign;
  trivia: TriviaForeign;
  results: UserTriviaResult | null;
}
