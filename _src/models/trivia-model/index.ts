import { Model, model, models, Schema } from "mongoose";
import { FeedbackSchema, IdNameSchema, ToObject } from "~/helpers/model";
import { Trivia, TriviaForeign, TriviaForeignOption, TriviaOption } from "~";

const TriviaOptionSchema = new Schema<TriviaOption>(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 },
  },
  { _id: false, versionKey: false }
);

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

const TriviaSchema = new Schema<Trivia>(
  {
    challenge: { type: IdNameSchema, default: null },
    question: { type: String, required: true },
    feedback: { type: FeedbackSchema, default: {} },
    allowMultiple: { type: Boolean, default: false },
    options: { type: [TriviaOptionSchema], required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

TriviaSchema.set("toObject", ToObject);
TriviaSchema.set("toJSON", ToObject);

const TriviaModel =
  (models.Trivia as Model<Trivia>) || model("Trivia", TriviaSchema);

export default TriviaModel;
