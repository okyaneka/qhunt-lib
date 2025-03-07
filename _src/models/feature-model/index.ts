import { Model, model, models, Schema } from "mongoose";
import { ToObject } from "~/helpers/model";
import { Feature } from "~/types/feature";
import { StageForeignSchema } from "../stage-model";
import { FEATURE_STATUS, FEATURE_TYPES } from "~/constants";
import { S3ForeignSchema } from "../s3-model";

const FeatureSchema = new Schema<Feature>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    quest: { type: StageForeignSchema, default: null },
    featuredImage: { type: S3ForeignSchema, default: null },
    status: {
      type: String,
      enum: Object.values(FEATURE_STATUS),
      default: FEATURE_STATUS.Draft,
    },
    type: { type: String, enum: Object.values(FEATURE_TYPES), required: true },
    attachments: { type: [S3ForeignSchema], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

FeatureSchema.set("toJSON", ToObject);
FeatureSchema.set("toObject", ToObject);

const FeatureModel =
  (models.Feature as Model<Feature>) || model("Feature", FeatureSchema);

export default FeatureModel;
