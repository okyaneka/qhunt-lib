import { model, Model, models, Schema } from "mongoose";
import { PhotoHunt, PhotoHuntForeign, PhotoHuntStatusValues } from "./types";
import { IdNameSchema, ToObject } from "~/helpers/model";
import { QrForeignSchema } from "../QrModel";

export const PhotoHuntForeignSchema = new Schema<PhotoHuntForeign>(
  {
    id: { type: String, required: true },
    hint: { type: String, required: true },
  },
  { _id: false }
);

const PhotoHuntSchema = new Schema<PhotoHunt>(
  {
    hint: { type: String, default: "" },
    score: { type: Number, default: 0 },
    feedback: { type: String, default: "" },
    challenge: { type: IdNameSchema, default: null },
    status: {
      type: String,
      enum: Object.values(PhotoHuntStatusValues),
      default: PhotoHuntStatusValues.Draft,
    },
    qr: { type: QrForeignSchema, default: null },
  },
  { timestamps: true }
);

PhotoHuntSchema.set("toObject", ToObject);
PhotoHuntSchema.set("toJSON", ToObject);

export * from "./types";

const PhotoHuntModel =
  (models.PhotoHunt as Model<PhotoHunt>) ||
  model("PhotoHunt", PhotoHuntSchema, "photoHunts");

export default PhotoHuntModel;
