import { TriviaOption } from "../Trivia";
import { UserPublic } from "../UserPublic";

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
  answer: string;
  score: number;
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
