import { model, Model, models, Schema } from "mongoose";
import { PhotoHunt, PhotoHuntForeign } from "~/index";
import { IdNameSchema, ToObject } from "~/helpers/model";
import { QrForeignSchema } from "../qr-model";
import { PHOTO_HUNT_STATUS } from "~/constants";

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
      enum: Object.values(PHOTO_HUNT_STATUS),
      default: PHOTO_HUNT_STATUS.Draft,
    },
    qr: { type: QrForeignSchema, default: null },
  },
  { timestamps: true }
);

PhotoHuntSchema.set("toObject", ToObject);
PhotoHuntSchema.set("toJSON", ToObject);

const PhotoHuntModel =
  (models.PhotoHunt as Model<PhotoHunt>) ||
  model("PhotoHunt", PhotoHuntSchema, "photoHunts");

export default PhotoHuntModel;
