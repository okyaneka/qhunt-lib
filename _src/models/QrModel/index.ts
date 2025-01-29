import { Model, model, models, Schema } from "mongoose";
import { ToObject } from "~/helpers/model";
import {
  Qr,
  QrContent,
  QrContentType,
  QrForeign,
  QrLocation,
  QrStatus,
} from "./types";

export const QrForeignSchema = new Schema<QrForeign>(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);

const QrContentSchema = new Schema<QrContent>(
  {
    type: { type: String, enum: Object.values(QrContentType), required: true },
    refId: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);

const QrLocationSchema = new Schema<QrLocation>(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  { _id: false, versionKey: false }
);

const QrSchema = new Schema<Qr>(
  {
    code: { type: String, required: true, unique: true },
    status: { type: String, enum: Object.values(QrStatus), required: true },
    content: { type: QrContentSchema, default: null },
    location: { type: QrLocationSchema, default: null },
    accessCount: { type: Number, default: null },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

QrSchema.set("toObject", ToObject);
QrSchema.set("toJSON", ToObject);

export * from "./types";

const QrModel = (models.Qr as Model<Qr>) || model("Qr", QrSchema);

export default QrModel;
