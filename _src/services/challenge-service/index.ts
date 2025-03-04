import db from "~/helpers/db";
import { ChallengeListParams, ChallengePayload } from "~/index";
import { detail as StageDetail } from "../stage-service";
import ChallengeModel from "~/models/challenge-model";
import StageModel from "~/models/stage-model";
import { CHALLENGE_STATUS } from "~/constants";

export const list = async (params: Partial<ChallengeListParams>) => {
  const { page = 1, limit = 10 } = params;
  const skip = (page - 1) * limit;
  const filter: any = { deletedAt: null };

  if (params.stageId === "null") filter["stage"] = null;
  else if (params.stageId) filter["stage.id"] = params.stageId;
  if (params.type) filter["settings.type"] = params.type;
  const list = await ChallengeModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalItems = await ChallengeModel.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    list: list.map((item) => item.toObject()),
    page: page,
    totalItems,
    totalPages,
  };
};

export const create = async (payload: ChallengePayload) => {
  return db.transaction(async (session) => {
    const { stageId, ...value } = payload;
    const stageData = stageId ? await StageDetail(stageId, session) : null;
    const stage = stageData ? { id: stageData.id, name: stageData.name } : null;

    const [item] = await ChallengeModel.create([{ ...value, stage }], {
      session,
    });

    if (stage) {
      const contents = stageData?.contents || [];
      contents.push(item.id);
      item.order = contents.length;
      await Promise.all([
        StageModel.findOneAndUpdate(
          { _id: stageId },
          { $set: { contents } },
          { session }
        ),
        item.save({ session }),
      ]);
    }

    return item.toObject();
  });
};

export const detail = async (id: string) => {
  const item = await ChallengeModel.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};

export const ChallengeDetails = async (ids: string[]) => {
  const items = await ChallengeModel.find({ _id: { $in: ids } });
  return items.map((item) => item.toObject());
};

export const update = async (id: string, payload: ChallengePayload) => {
  return await db.transaction(async (session) => {
    const { stageId, ...value } = payload;

    const item = await ChallengeModel.findOne({ _id: id, deletedAt: null });

    if (!item) throw new Error("challenge not found");

    const newStage = stageId ? await StageDetail(stageId) : null;
    const oldStage = item.stage?.id ? await StageDetail(item.stage.id) : null;

    const newContent = newStage?.contents || [];
    const oldContent = oldStage?.contents || [];

    if (!newContent.includes(id)) newContent.push(id);
    if (oldContent.includes(id)) oldContent.splice(oldContent.indexOf(id), 1);

    await StageModel.findOneAndUpdate(
      { _id: newStage?.id },
      { $set: { contents: newContent } },
      { session }
    );

    await StageModel.findOneAndUpdate(
      { _id: oldStage?.id },
      { $set: { contents: oldContent } },
      { session }
    );

    const stage = newStage ? { id: newStage.id, name: newStage.name } : null;
    Object.assign(item, value, { stage });
    await item.save({ session });

    return item.toObject();
  });
};

export const updateContent = async (id: string, contents: string[]) => {
  const item = await ChallengeModel.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { contents } },
    { new: true }
  );

  if (!item) throw new Error("challenge not found");
  return item.toObject();
};

export const _delete = async (id: string) => {
  const item = await ChallengeModel.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");

  return item.toObject();
};

export const verify = async (id: string) => {
  const item = await ChallengeModel.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  if (item.status !== CHALLENGE_STATUS.Publish)
    throw new Error("challenge not published yet");
  return item.toObject();
};

const ChallengeService = {
  list,
  create,
  detail,
  details: ChallengeDetails,
  // detailContent,
  update,
  updateContent,
  delete: _delete,
  verify,
} as const;

export default ChallengeService;
