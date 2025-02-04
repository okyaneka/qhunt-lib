import schema from "~/helpers/schema";
import { FeedbackValidator } from "~/helpers/validator";
import {
  TriviaForeign,
  TriviaForeignOption,
  TriviaOption,
  TriviaPayload,
} from "~/types";

export const TriviaOptionValidator = schema.generate<TriviaOption>({
  isCorrect: schema.boolean({ defaultValue: false }),
  point: schema.number({ defaultValue: 0 }),
  text: schema.string({ required: true }),
});

export const TriviaOptionsValidator = schema
  .array(TriviaOptionValidator, {
    required: true,
  })
  .custom((value, helpers) => {
    const hasCorrect = value.some((option: any) => option.isCorrect === true);
    return hasCorrect ? value : helpers.error("array.hasCorrect");
  })
  .messages({
    "array.hasCorrect":
      "{#label} at least one option must have `isCorrect` set to true.",
  });

export const TriviaPayloadValidator = schema.generate<TriviaPayload>({
  id: schema.string(),
  question: schema.string({ required: true }),
  feedback: FeedbackValidator,
  allowMultiple: schema.boolean({ defaultValue: false }),
  options: TriviaOptionsValidator,
});

export const TriviaItemsPayloadValidator = schema.array(
  TriviaPayloadValidator,
  {
    required: true,
  }
);

const TriviaForeignOptionValidator = schema.generate<TriviaForeignOption>({
  text: schema.string({ required: true }),
});

export const TriviaForeignValidator = schema.generate<TriviaForeign>({
  id: schema.string({ required: true }),
  question: schema.string({ required: true }),
  allowMultiple: schema.boolean({ required: true }),
  options: schema.array(TriviaForeignOptionValidator, { required: true }),
});

const TriviaValidator = {
  TriviaOptionValidator,
  TriviaOptionsValidator,
  TriviaPayloadValidator,
  TriviaItemsPayloadValidator,
  TriviaForeignValidator,
};

export default TriviaValidator;
