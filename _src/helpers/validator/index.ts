import Joi from "joi";
import schema from "../schema";
import { Periode } from "../types";

export const PeriodeValidator = schema.generate<Periode>({
  startDate: Joi.date().required().greater("now"),
  endDate: Joi.date().required().greater(Joi.ref("startDate")),
});

export const DefaultListParamsFields = {
  page: schema.number({ defaultValue: 1 }),
  limit: schema.number({ defaultValue: 10 }),
  search: schema.string({ allow: "", defaultValue: "" }),
};

const validator = { PeriodeValidator, DefaultListParamsFields };

export default validator;
