import Joi from "joi";
import schema from "../schema";
import { Periode } from "../types";

export const PeriodeValidator = schema.generate<Periode>({
  startDate: Joi.date().required().greater("now"),
  endDate: Joi.date().required().greater(Joi.ref("startDate")),
});

const validator = {};

export default validator;
