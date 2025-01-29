import db from "~/helpers/db";
import Challenge from "~/models/ChallengeModel";
import Stage, {
  StageListParams,
  StagePayload,
  StageStatusValues,
} from "~/models/StageModel";

const isUsed = async (ids: string[], id?: string) => {
  const filter: any = {
    _id: { $in: ids },
    deletedAt: null,
    stage: { $ne: null },
  };
  if (id) filter["stage.id"] = { $ne: id };
  const used = (await Challenge.find(filter)).map((item) => item.id);

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
  const items = await Stage.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await Stage.countDocuments(filter);
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
  const contents = await Challenge.find({ _id: { $in: payload.contents } });

  const stage = await Stage.create({
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
  const item = await Stage.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  return item.toObject();
};

export const update = async (id: string, payload: StagePayload) => {
  return await db.transaction(async (session) => {
    await isUsed(payload.contents, id);
    const stage = await Stage.findOne({ _id: id, deletedAt: null });

    if (!stage) throw new Error("stage not found");

    const contents = (
      await Challenge.find({ _id: { $in: payload.contents }, deletedAt: null })
    ).map((item) => item.id);

    await Challenge.updateMany(
      { "stage.id": stage.id },
      { $set: { stage: null } },
      { session }
    );

    await Challenge.updateMany(
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
  const item = await Stage.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } }
  );
  if (!item) throw new Error("stage not found");
  return item;
};

export const verify = async (id: string) => {
  const item = await Stage.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  if (item.status !== StageStatusValues.Publish)
    throw new Error("stage not published yet");
  return item.toObject();
};

const StageService = { list, create, detail, update, delete: _delete, verify };

export default StageService;
