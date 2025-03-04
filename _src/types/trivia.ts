import { Feedback, IdName, Timestamps } from "~/index";

export interface TriviaOption {
  text: string;
  isCorrect: boolean;
  point: number;
}

export interface TriviaPayload {
  id?: string;
  question: string;
  feedback: Feedback;
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
  feedback: Feedback;
  allowMultiple: boolean;
  options: TriviaOption[];
}
