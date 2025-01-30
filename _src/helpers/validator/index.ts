import Joi from "joi";
import schema from "../schema";
import { Feedback, Periode } from "../types";

export const PeriodeValidator = schema.generate<Periode>({
  startDate: Joi.date().required(),
  endDate: Joi.date().required().greater(Joi.ref("startDate")),
});

export const DefaultListParamsFields = {
  page: schema.number({ defaultValue: 1 }),
  limit: schema.number({ defaultValue: 10 }),
  search: schema.string({ allow: "", defaultValue: "" }),
};

export const FeedbackValidator = schema
  .generate<Feedback>({
    positive: schema.string({ allow: "", defaultValue: "" }),
    negative: schema.string({ allow: "", defaultValue: "" }),
  })
  .default({ positive: "", negative: "" });

const validator = {
  PeriodeValidator,
  DefaultListParamsFields,
  FeedbackValidator,
};

export default validator;
