import { db } from "~/helpers";
import Challenge, {
  ChallengeListParams,
  ChallengePayload,
  ChallengeStatusValues,
} from "~/models/ChallengeModel";
import StageService from "../StageService";
import Stage from "~/models/StageModel";

export const list = async (params: ChallengeListParams) => {
  const skip = (params.page - 1) * params.limit;
  const filter: any = { deletedAt: null };

  if (params.stageId === "null") filter["stage"] = null;
  else if (params.stageId) filter["stage.id"] = params.stageId;
  if (params.type) filter["settings.type"] = params.type;
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
  return db.transaction(async (session) => {
    const { stageId, ...value } = payload;
    const stageData = stageId ? await StageService.detail(stageId) : null;
    const stage = stageData ? { id: stageData.id, name: stageData.name } : null;

    const [item] = await Challenge.create([value], { session });

    if (stage) {
      const contents = stageData?.contents || [];
      contents.push(item.id);
      item.order = contents.length;
      await Promise.all([
        Stage.findOneAndUpdate(
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
  const item = await Challenge.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};

// export const detailContent = async (id: string) => {
//   const item = await Challenge.findOne({ _id: id, deletedAt: null });
//   if (!item) throw new Error("challenge not found");

//   const services = {
//     [ChallengeTypeValues.Trivia]: TriviaService,
//   };

//   return await services[item.settings.type].content(item);
// };

export const update = async (id: string, payload: ChallengePayload) => {
  return await db.transaction(async (session) => {
    const { stageId, ...value } = payload;

    const item = await Challenge.findOne({ _id: id, deletedAt: null });

    if (!item) throw new Error("challenge not found");

    const newStage = stageId ? await StageService.detail(stageId) : null;
    const oldStage = item.stage?.id
      ? await StageService.detail(item.stage.id)
      : null;

    const newContent = newStage?.contents || [];
    const oldContent = oldStage?.contents || [];

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

    const stage = newStage ? { id: newStage.id, name: newStage.name } : null;
    Object.assign(item, value, { stage });
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
  if (item.status !== ChallengeStatusValues.Publish)
    throw new Error("challenge not published yet");
  return item.toObject();
};

const ChallengeService = {
  list,
  create,
  detail,
  // detailContent,
  update,
  updateContent,
  delete: _delete,
  verify,
} as const;

export default ChallengeService;
