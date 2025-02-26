import { transaction } from "~/helpers/db";
import ChallengeModel from "~/models/challenge-model";
import StageModel from "~/models/stage-model";
import { StageListParams, StagePayload } from "~";
import { STAGE_STATUS } from "~/helpers/contants";

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

export const list = async (params: StageListParams) => {
  const skip = (params.page - 1) * params.limit;
  const filter = {
    deletedAt: null,
    name: { $regex: params.search, $options: "i" },
  };
  const items = await StageModel.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await StageModel.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);

  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
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

export const detail = async (id: string) => {
  const item = await StageModel.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  return item.toObject();
};

export const update = async (id: string, payload: StagePayload) => {
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

const StageService = { list, create, detail, update, delete: _delete, verify };

export default StageService;
