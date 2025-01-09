import { model, Schema } from "mongoose";
import { ToObject } from "~/helpers/schema";
import { Qr, QrContent, QrContentType, QrLocation, QrStatus } from "./types";

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

const Qr = model<Qr>("Qr", QrSchema);

export * from "./types";

export default Qr;
