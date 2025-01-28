import { TriviaForeign } from "../TriviaModel";
import { UserChallengeForeign } from "../UserChallengeModel";
import { UserPublicForeign } from "../UserPublicModel";
export interface UserTriviaSummary {
    userPublic: UserPublicForeign;
    userChallenge: UserChallengeForeign;
    totalCorrect: number;
    totalBaseScore: number;
    totalBonus: number;
    totalScore: number;
}
export interface UserTriviaResult {
    answer: string | null;
    baseScore: number;
    bonus: number;
    totalScore: number;
    isCorrect: boolean;
    feedback: string;
}
export interface UserTrivia {
    id: string;
    userPublic: UserPublicForeign;
    userChallenge: UserChallengeForeign;
    trivia: TriviaForeign;
    results: UserTriviaResult | null;
}
//# sourceMappingURL=types.d.ts.map