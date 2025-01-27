import { TriviaOption } from "../TriviaModel";
import { UserPublic } from "../UserPublicModel";
export interface UserTriviaChallenge {
    id: string;
    challengeId: string;
    name: string;
}
export interface UserTriviaContent {
    id: string;
    question: string;
    allowMultiple: boolean;
    options: Pick<TriviaOption, "text">[];
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
    userPublic: Pick<UserPublic, "id" | "name" | "code">;
    userChallenge: UserTriviaChallenge;
    trivia: UserTriviaContent;
    results: UserTriviaResult | null;
}
//# sourceMappingURL=types.d.ts.map