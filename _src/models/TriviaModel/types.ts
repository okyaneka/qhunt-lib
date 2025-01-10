import { IdName, Timestamps } from "~/helpers";
import { ChallengeFeedback } from "~/models/ChallengeModel";

export interface TriviaOption {
  text: string;
  isCorrect: boolean;
  point: number;
}

export interface TriviaPayload {
  id?: string;
  question: string;
  feedback: ChallengeFeedback;
  allowMultiple: boolean;
  options: TriviaOption[];
}

export type TriviaForeignOption = Pick<TriviaOption, "text">;

export type TriviaForeign = Pick<
  Trivia,
  "id" | "question" | "allowMultiple"
> & { options: TriviaForeignOption[] };

export interface Trivia extends Timestamps {
  id: string;
  challenge: IdName | null;
  question: string;
  feedback: ChallengeFeedback;
  allowMultiple: boolean;
  options: TriviaOption[];
}
