import { model, Schema } from "mongoose";
import { idNameSchema, ToObject } from "~/helpers/schema";
import {
  Trivia,
  TriviaForeign,
  TriviaForeignOption,
  TriviaOption,
} from "./types";
import { ChallengeFeedbackSchema } from "../Challenge";

const TriviaOptionSchema = new Schema<TriviaOption>(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 },
  },
  { _id: false, versionKey: false }
);

const TriviaSchema = new Schema<Trivia>(
  {
    challenge: { type: idNameSchema, default: null },
    question: { type: String, required: true },
    feedback: { type: ChallengeFeedbackSchema, default: {} },
    allowMultiple: { type: Boolean, default: false },
    options: { type: [TriviaOptionSchema], required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

TriviaSchema.set("toObject", ToObject);
TriviaSchema.set("toJSON", ToObject);

const Trivia = model("Trivia", TriviaSchema);

export * from "./types";

export const TriviaForeignOptionSchema = new Schema<TriviaForeignOption>(
  {
    text: { type: String, required: true },
  },
  { _id: false }
);

export const TriviaForeignSchema = new Schema<TriviaForeign>(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    allowMultiple: { type: Boolean, required: true },
    options: { type: [TriviaForeignOptionSchema], required: true },
  },
  { _id: false }
);

export default Trivia;
