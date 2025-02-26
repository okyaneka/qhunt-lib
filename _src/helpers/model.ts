import { Schema, ToObjectOptions } from "mongoose";
import { Feedback, IdName, Periode } from "~";

export const IdNameSchema = new Schema<IdName>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);

export const PeriodSchema = new Schema<Periode>(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false }
);

export const FeedbackSchema = new Schema<Feedback>(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" },
  },
  { _id: false }
);

export const ToObject: ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  },
};

const model = {
  IdNameSchema,
  PeriodSchema,
  FeedbackSchema,
  ToObject,
} as const;

export default model;
