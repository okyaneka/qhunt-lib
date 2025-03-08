import { db } from "~/helpers";
import { detail } from "../stage-service";
import { Feature, FeatureListParams, FeaturePayload } from "~/types/feature";
import { list } from "~/helpers/service";
import { RootFilterQuery } from "mongoose";
import { S3Foreign } from "~/types/s3";
import { S3ServiceSet } from "../s3-service";
import FeatureModel from "~/models/feature-model";
import { FEATURE_STATUS } from "~/constants";
import slugify from "slugify";

export const FeatureList = async (params?: Partial<FeatureListParams>) => {
  const { page = 1, limit = 10 } = params || {};
  const filters: RootFilterQuery<Feature> = {};
  if (params?.status) filters["status"] = params.status;
  if (params?.questId) filters["quest.id"] = params.questId;
  if (params?.search)
    filters["title"] = { $regex: params.search, $options: "i" };
  if (params?.type) filters["type"] = params.type;
  return list(FeatureModel, page, limit, filters);
};

export const FeatureCreate = async (payload: FeaturePayload) => {
  return db.transaction(async (session) => {
    const { featuredImage, questId, slug, ...data } = payload;

    const s3FeaturedImg = featuredImage
      ? await S3ServiceSet(featuredImage, undefined, session).then<S3Foreign>(
          ({ fileName, fileSize, fileUrl }) => {
            return { fileName, fileSize, fileUrl };
          }
        )
      : null;
    const count = await FeatureModel.countDocuments(
      { slug: { $regex: new RegExp(`^${slug}(-\\d+)?$`, "i") } },
      { session }
    );

    const quest: Feature["quest"] = questId
      ? await detail(questId, session).then((res) => ({
          id: res.id,
          name: res.name,
          settings: { periode: res.settings.periode },
          storyline: res.storyline,
        }))
      : null;

    const [item] = await FeatureModel.create(
      [
        {
          ...data,
          quest,
          slug: !count ? slug : slugify(`${slug}-${count}`),
          featuredImage: s3FeaturedImg,
        },
      ],
      { session }
    );

    if (!item) throw new Error("feature.unexpected_error");

    return item.toObject() as Feature;
  });
};

export const FeatureDetail = async (id: string) => {
  const item = await FeatureModel.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("feature.not_found");
  return item.toObject();
};

export const FeatureUpdate = async (id: string, payload: FeaturePayload) => {
  return db.transaction(async (session) => {
    const item = await FeatureModel.findOne({ _id: id, deletedAt: null });
    if (!item) throw new Error("feature.not_found");

    const { featuredImage, questId, ...data } = payload;

    const s3FeaturedImg = featuredImage
      ? await S3ServiceSet(featuredImage, undefined, session).then<S3Foreign>(
          ({ fileName, fileSize, fileUrl }) => {
            return { fileName, fileSize, fileUrl };
          }
        )
      : null;

    const quest: Feature["quest"] = questId
      ? await detail(questId, session).then((res) => ({
          id: res.id,
          name: res.name,
          settings: { periode: res.settings.periode },
          storyline: res.storyline,
        }))
      : null;

    const update: Partial<Feature> = { ...data, quest };
    if (s3FeaturedImg) update.featuredImage = s3FeaturedImg;
    if (!update.attachments) update.attachments = [];

    const newItem = await FeatureModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: update },
      { new: true }
    );

    if (!newItem) throw new Error("feature.not_found");

    return newItem.toObject() as Feature;
  });
};

export const FeatureDelete = async (id: string) => {
  const item = await FeatureModel.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("feature.not_found");

  item.deletedAt = new Date();
  await item.save();

  return {};
};

export const FeaturePublished = async (type: string, slug: string) => {
  const item = await FeatureModel.findOne({
    type,
    slug,
    status: FEATURE_STATUS.Publish,
    deletedAt: null,
  });
  if (!item) throw new Error("feature.not_found");
  return item.toObject();
};

const FeatureService = {
  list: FeatureList,
  create: FeatureCreate,
  detail: FeatureDetail,
  update: FeatureUpdate,
  delete: FeatureDelete,
  published: FeaturePublished,
} as const;

export default FeatureService;
