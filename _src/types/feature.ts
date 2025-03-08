import { FEATURE_STATUS, FEATURE_TYPES } from "~/constants";
import { DefaultListParams, Timestamps, ValueOf } from "./helper";
import { S3Foreign, S3Payload } from "./s3";
import { StageForeign } from "./stage";

export type FeatureListParams = Pick<Feature, "type" | "status"> &
  DefaultListParams & {
    questId: string;
  };

export type FeatureStatus = ValueOf<typeof FEATURE_STATUS>;

export type FeatureType = ValueOf<typeof FEATURE_TYPES>;

export type FeaturePayload = Pick<
  Feature,
  "title" | "content" | "status" | "type" | "slug" | "attachments" | "featured"
> & { questId: string | null; featuredImage: S3Payload | null };

export interface Feature extends Timestamps {
  id: string;
  title: string;
  slug: string;
  content: string;
  featured: boolean;
  featuredImage: S3Foreign | null;
  quest: StageForeign | null;
  status: FeatureStatus;
  type: FeatureType;
  attachments: S3Foreign[];
}
