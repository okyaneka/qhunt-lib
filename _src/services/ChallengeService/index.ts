import { db } from "~/helpers";
import Challenge, {
  ChallengeListParams,
  ChallengePayload,
  ChallengeStatus,
} from "~/models/ChallengeModel";
import StageService from "../StageService";
import Stage from "~/models/StageModel";

export const list = async (params: ChallengeListParams) => {
  const skip = (params.page - 1) * params.limit;
  const filter: any = { deletedAt: null };
  if (params.stageId == "null") filter.stage = null;
  else if (params.stageId) filter["stage.id"] = params.stageId;
  const list = await Challenge.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await Challenge.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);

  return {
    list: list.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages,
  };
};

export const create = async (payload: ChallengePayload) => {
  const { stageId, ...value } = payload as any;
  const stage = await StageService.detail(stageId).catch(() => null);
  value.stage = stage ? { id: stage.id, name: stage.name } : null;

  const item = await Challenge.create(value);

  if (stage) {
    const contents = stage.contents || [];
    contents.push(item.id);
    await Stage.findOneAndUpdate({ _id: stageId }, { $set: { contents } });
  }

  return item.toObject();
};

export const detail = async (id: string) => {
  const item = await Challenge.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};

export const update = async (id: string, payload: ChallengePayload) => {
  return await db.transaction(async (session) => {
    const { stageId, ...value } = payload as any;

    const item = await Challenge.findOne({ _id: id, deletedAt: null });

    if (!item) throw new Error("challenge not found");

    const newStage = await StageService.detail(stageId).catch(() => null);
    const oldStage =
      item?.stage?.id && item.stage.id != stageId
        ? await StageService.detail(item.stage.id).catch(() => null)
        : null;

    const newContent = newStage?.contents || [];
    const oldContent = oldStage?.contents || [];

    value.stage = newStage ? { id: newStage.id, name: newStage.name } : null;
    if (!newContent.includes(id)) newContent.push(id);
    if (oldContent.includes(id)) oldContent.splice(oldContent.indexOf(id), 1);

    await Stage.findOneAndUpdate(
      { _id: newStage?.id },
      { $set: { contents: newContent } },
      { session }
    );

    await Stage.findOneAndUpdate(
      { _id: oldStage?.id },
      { $set: { contents: oldContent } },
      { session }
    );

    Object.assign(item, value);
    await item.save({ session });

    return item.toObject();
  });
};

export const updateContent = async (id: string, contents: string[]) => {
  const item = await Challenge.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { contents } },
    { new: true }
  );

  if (!item) throw new Error("challenge not found");
  return item.toObject();
};

export const _delete = async (id: string) => {
  const item = await Challenge.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");

  return item.toObject();
};

export const verify = async (id: string) => {
  const item = await Challenge.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  if (item.status !== ChallengeStatus.Publish)
    throw new Error("challenge not published yet");
  return item.toObject();
};

const ChallengeService = {
  list,
  create,
  detail,
  update,
  updateContent,
  delete: _delete,
  verify,
};

export default ChallengeService;
