import { ScoreSummary } from "~/helpers";
import { TriviaForeign } from "../TriviaModel";
import { UserChallengeForeign } from "../UserChallengeModel";
import { UserPublicForeign } from "../UserPublicModel";
import { ChallengeTypeValues } from "../ChallengeModel";

export interface UserTriviaSummary extends ScoreSummary {
  type: typeof ChallengeTypeValues.Trivia;
  userPublic: UserPublicForeign;
  userChallenge: UserChallengeForeign;
  totalCorrect: number;
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
