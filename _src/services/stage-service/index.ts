import db, { transaction } from "~/helpers/db";
import ChallengeModel from "~/models/challenge-model";
import StageModel from "~/models/stage-model";
import {
  Challenge,
  Qr,
  QrContent,
  QrForeign,
  StageListParams,
  StagePayload,
} from "~/index";
import { STAGE_STATUS } from "~/constants";
import { AnyBulkWriteOperation, ClientSession } from "mongoose";
import { QrGenerate } from "../qr-service";
import { QrModel } from "~/models";
import { ChallengeDetails } from "../challenge-service";

const isUsed = async (ids: string[], id?: string) => {
  const filter: any = {
    _id: { $in: ids },
    deletedAt: null,
    stage: { $ne: null },
  };
  if (id) filter["stage.id"] = { $ne: id };
  const used = (await ChallengeModel.find(filter)).map((item) => item.id);

  if (used.length)
    throw new Error(
      `challenge${used.length > 1 ? "s" : ""} ${used.join(", ")} ${
        used.length > 1 ? "are" : "is"
      } used`
    );
};

export const list = async (params: Partial<StageListParams>) => {
  const { page = 1, limit = 10, search = "" } = params;
  const skip = (page - 1) * limit;
  const filter = {
    deletedAt: null,
    name: { $regex: search, $options: "i" },
  };
  const items = await StageModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalItems = await StageModel.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    list: items.map((item) => item.toObject()),
    page: page,
    totalItems,
    totalPages,
  };
};

export const create = async (payload: StagePayload) => {
  await isUsed(payload.contents);
  const contents = await ChallengeModel.find({
    _id: { $in: payload.contents },
  });

  const stage = await StageModel.create({
    ...payload,
    contents: contents.map((item) => item.id),
  });

  const sync = contents.map((item) => {
    item.stage = { id: stage.id, name: stage.name };
    return item.save();
  });

  await Promise.all(sync);

  return stage.toObject();
};

export const detail = async (id: string, session?: ClientSession) => {
  const item = await StageModel.findOne({ _id: id, deletedAt: null }, null, {
    session,
  });
  if (!item) throw new Error("stage not found");
  return item.toObject();
};

export const StageUpdate = async (id: string, payload: StagePayload) => {
  return await transaction(async (session) => {
    await isUsed(payload.contents, id);
    const stage = await StageModel.findOne({ _id: id, deletedAt: null });

    if (!stage) throw new Error("stage not found");

    const contents = (
      await ChallengeModel.find({
        _id: { $in: payload.contents },
        deletedAt: null,
      })
    ).map((item) => item.id);

    await ChallengeModel.updateMany(
      { "stage.id": stage.id },
      { $set: { stage: null } },
      { session }
    );

    await ChallengeModel.updateMany(
      { _id: { $in: contents } },
      { $set: { stage: { id: stage.id, name: stage.name } } },
      { session }
    );

    Object.assign(stage, { ...payload, contents });
    await stage.save({ session });

    return stage.toObject();
  });
};

export const _delete = async (id: string) => {
  const item = await StageModel.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } }
  );
  if (!item) throw new Error("stage not found");
  return item;
};

export const verify = async (id: string) => {
  const item = await StageModel.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  if (item.status !== STAGE_STATUS.Publish)
    throw new Error("stage not published yet");
  return item.toObject();
};

export const StagePublish = async (id: string) => {
  return db.transaction(async (session) => {
    const stage = await StageModel.findOne(
      { _id: id, deletedAt: null },
      { _id: true, contents: true, qr: true },
      { session }
    );
    if (!stage) throw new Error("stage.not_found");

    const challenges = await ChallengeModel.find(
      { _id: { $in: stage.contents }, qr: null, deletedAt: null },
      { _id: true },
      { session }
    );

    const qrs = await QrGenerate(
      challenges.length + (stage.qr ? 0 : 1),
      session
    );

    if (!stage.qr) {
      const qr = qrs.pop();
      if (!qr) throw new Error("qr.not_enough");

      const stageQr: QrForeign = {
        id: qr.id,
        code: qr.code,
        location: qr.location,
      };
      const qrContent: QrContent = {
        type: "stage",
        refId: stage.id,
      };

      await StageModel.updateOne(
        { _id: stage.id },
        { $set: { qr: stageQr, status: "publish" } },
        { session }
      );
      await QrModel.updateOne(
        { _id: qr.id },
        { $set: { content: qrContent, status: "publish" } },
        session
      );
    }

    const { bulkChallenges, bulkQr } = challenges.reduce<{
      bulkChallenges: AnyBulkWriteOperation<Challenge>[];
      bulkQr: AnyBulkWriteOperation<Qr>[];
    }>(
      (acc, cur) => {
        const qr = qrs.pop();
        if (!qr) throw new Error("qr.not_enough");

        const qrForeign: QrForeign = {
          id: qr?.id,
          code: qr?.code,
          location: qr?.location,
        };

        acc.bulkChallenges.push({
          updateOne: {
            filter: { _id: cur.id },
            update: { $set: { qr: qrForeign, status: "publish" } },
          },
        });

        acc.bulkQr.push({
          updateOne: {
            filter: { _id: qr.id },
            update: {
              $set: {
                content: { type: "challenge", refId: cur.id },
                status: "publish",
              },
            },
          },
        });

        return acc;
      },
      { bulkChallenges: [], bulkQr: [] }
    );

    await ChallengeModel.bulkWrite(bulkChallenges, { session });
    await QrModel.bulkWrite(bulkQr, { session });

    const newStage = await StageModel.findById(stage.id, null, { session });
    const newChallenges = await ChallengeModel.find(
      { _id: { $in: newStage?.contents }, deletedAt: null },
      null,
      { session }
    );

    if (!newStage) throw new Error("stage.not_found");

    return {
      stage: newStage.toObject(),
      challenges: newChallenges.map((item) => item.toObject()),
    };
  });
};

export const StageDetailFull = async (id: string) => {
  const stage = await detail(id);
  const challenges = await ChallengeDetails(stage.contents);

  return { stage, challenges };
};

const StageService = {
  list,
  create,
  detail,
  update: StageUpdate,
  delete: _delete,
  verify,
  publish: StagePublish,
  detailFull: StageDetailFull,
};

export default StageService;
