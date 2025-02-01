// _src/models/PhotoHuntModel/index.ts
import { model as model2, models as models2, Schema as Schema3 } from "mongoose";

// _src/helpers/common/index.ts
import deepmerge from "deepmerge";

// _src/helpers/db/index.ts
import { startSession } from "mongoose";

// _src/helpers/model/index.ts
import { Schema } from "mongoose";
var IdNameSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var PeriodSchema = new Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);
var FeedbackSchema = new Schema(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false }
);
var ToObject = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};

// _src/helpers/qrcode/index.ts
import { BrowserQRCodeReader } from "@zxing/browser";

// _src/helpers/schema/index.ts
import Joi from "joi";

// _src/helpers/types/index.ts
var PublishingStatusValues = {
  Draft: "draft",
  Publish: "publish"
};

// _src/models/PhotoHuntModel/types.ts
var PhotoHuntStatusValues = PublishingStatusValues;

// _src/models/QrModel/index.ts
import { model, models, Schema as Schema2 } from "mongoose";

// _src/models/QrModel/types.ts
var QrStatusValues = PublishingStatusValues;
var QrContentTypeValues = {
  Stage: "stage",
  Challenge: "challenge",
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};

// _src/models/QrModel/index.ts
var QrForeignSchema = new Schema2(
  {
    id: { type: String, required: true },
    code: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrContentSchema = new Schema2(
  {
    type: {
      type: String,
      enum: Object.values(QrContentTypeValues),
      required: true
    },
    refId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrLocationSchema = new Schema2(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new Schema2(
  {
    code: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: Object.values(QrStatusValues),
      required: true
    },
    content: { type: QrContentSchema, default: null },
    location: { type: QrLocationSchema, default: null },
    accessCount: { type: Number, default: null },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);
QrSchema.set("toObject", ToObject);
QrSchema.set("toJSON", ToObject);
var QrModel = models.Qr || model("Qr", QrSchema);

// _src/models/PhotoHuntModel/index.ts
var PhotoHuntForeignSchema = new Schema3(
  {
    id: { type: String, required: true },
    hint: { type: String, required: true }
  },
  { _id: false }
);
var PhotoHuntSchema = new Schema3(
  {
    hint: { type: String, default: "" },
    score: { type: Number, default: 0 },
    feedback: { type: String, default: "" },
    challenge: { type: IdNameSchema, default: null },
    status: {
      type: String,
      enum: Object.values(PhotoHuntStatusValues),
      default: PhotoHuntStatusValues.Draft
    },
    qr: { type: QrForeignSchema, default: null }
  },
  { timestamps: true }
);
PhotoHuntSchema.set("toObject", ToObject);
PhotoHuntSchema.set("toJSON", ToObject);
var PhotoHuntModel = models2.PhotoHunt || model2("PhotoHunt", PhotoHuntSchema, "photoHunts");
var PhotoHuntModel_default = PhotoHuntModel;
export {
  PhotoHuntForeignSchema,
  PhotoHuntStatusValues,
  PhotoHuntModel_default as default
};
