import UserStage, {
  UserStageListParams,
  UserStageResult,
} from "~/models/UserStageModel";
import { verify as StageServiceVerify } from "../StageService";
import {
  setup as UserChallengeServiceSetup,
  summary as UserChallengeServiceSummary,
} from "../UserChallengeService";
import { verify as UserPublicServiceVerify } from "../UserPublicService";
import { StageForeignValidator } from "~/validators/StageValidator";
import { UserPublicForeignValidator } from "~/validators/UserPublicValidator";

const initResults = (): UserStageResult => ({
  baseScore: 0,
  challengeBonus: 0,
  bonus: 0,
  totalScore: 0,
});

export const verify = async (stageId: string, TID: string) => {
  return await UserStage.findOne({
    "userPublic.code": TID,
    "stage.id": stageId,
  });
};

export const setup = async (stageId: string, TID: string) => {
  const exist = await verify(stageId, TID);
  if (exist) return exist;

  const userPublicData = await UserPublicServiceVerify(TID);
  const stageData = await StageServiceVerify(stageId);

  const userPublic = await UserPublicForeignValidator.validateAsync(
    userPublicData,
    { convert: true, abortEarly: false, stripUnknown: true }
  );

  const stage = await StageForeignValidator.validateAsync(stageData, {
    convert: true,
    abortEarly: false,
    stripUnknown: true,
  });

  const userStageData = await UserStage.create({ userPublic, stage });

  const contents = stageData.contents.map((challengeId) =>
    UserChallengeServiceSetup(challengeId, TID)
  );
  const contentsData = await Promise.all(contents).catch(async (err: Error) => {
    await userStageData.deleteOne();
    throw err;
  });
  userStageData.contents = contentsData.map((item) => item?.id);
  await userStageData.save();

  return userStageData.toObject();
};

export const list = async (params: UserStageListParams, TID: string) => {
  const skip = (params.page - 1) * params.limit;
  const filter: any = {
    deletedAt: null,
    "stage.name": { $regex: params.search, $options: "i" },
    "userPublic.code": TID,
  };
  if (params.status) filter.status = params.status;
  const items = await UserStage.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await UserStage.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);

  return {
    list: items.map((item) =>
      item.toObject({
        transform: (doc, ret) => {
          const { _id, __v, userPublic, ...rest } = ret;
          return { id: _id, ...rest };
        },
      })
    ),
    page: params.page,
    totalItems,
    totalPages,
  };
};

export const detail = async (id: string, TID: string) => {
  const item = await UserStage.findOne({
    _id: id,
    deletedAt: null,
    "userPublic.code": TID,
  });
  if (!item) throw new Error("user stage not found");
  return item.toObject({
    transform: (doc, ret) => {
      const { _id, __v, userPublic, ...rest } = ret;
      return { id: _id, ...rest };
    },
  });
};

export const submitState = async (id: string, TID: string) => {
  const item = await UserStage.findOne({
    _id: id,
    "userPublic.code": TID,
  });
  if (!item) throw new Error("user stage not found");

  const results = item?.results || initResults();

  const [summary] = await UserChallengeServiceSummary(id, TID);
  console.log(summary);

  results.baseScore = summary.totalBaseScore;
  results.bonus = 0; //summary.totalBonus
  results.challengeBonus = summary.totalBonus;
  results.totalScore = summary.totalScore;

  item.results = results;
  await item.save();
  return item;
};

const UserStageService = { list, detail, setup, verify, submitState };

export default UserStageService;
