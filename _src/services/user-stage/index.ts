import { UserStageModel } from "~/models";
import { UserStageListParams, UserStageResult } from "~/types";
import { verify as StageVerify } from "../stage";
import {
  init as UserChallengeInit,
  summary as UserChallengeServiceSummary,
} from "../user-challenge";
import { verify as UserPublicVerify } from "../user-public";
import { StageForeignValidator } from "~/validators/stage";
import { UserPublicForeignValidator } from "~/validators/user-public";
import { transaction } from "~/helpers/db";

const initResults = (): UserStageResult => ({
  baseScore: 0,
  challengeBonus: 0,
  bonus: 0,
  totalScore: 0,
});

export const verify = async (stageId: string, TID: string) => {
  return await UserStageModel.findOne({
    "userPublic.code": TID,
    "stage.id": stageId,
  });
};

export const setup = async (stageId: string, TID: string) => {
  return transaction(async (session) => {
    console.time("queryTime");

    const exist = await verify(stageId, TID);
    if (exist) return exist;

    const userPublicData = await UserPublicVerify(TID);
    const stageData = await StageVerify(stageId);

    const userPublic = await UserPublicForeignValidator.validateAsync(
      userPublicData,
      { convert: true, abortEarly: false, stripUnknown: true }
    );

    const stage = await StageForeignValidator.validateAsync(stageData, {
      convert: true,
      abortEarly: false,
      stripUnknown: true,
    });

    const [userStageData] = await UserStageModel.create(
      [{ userPublic, stage }],
      { session }
    );

    const contents = await UserChallengeInit(stageData, userStageData, session);

    userStageData.contents = contents.map((item) => item.id);
    await userStageData.save({ session });

    return userStageData.toObject();
  }).finally(() => {
    console.timeEnd("queryTime");
  });
};

export const list = async (params: UserStageListParams, TID: string) => {
  const skip = (params.page - 1) * params.limit;
  const filter: any = {
    deletedAt: null,
    "stage.name": { $regex: params.search, $options: "i" },
    "userPublic.code": TID,
  };
  if (params.status) filter.status = params.status;
  const items = await UserStageModel.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await UserStageModel.countDocuments(filter);
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
  const item = await UserStageModel.findOne({
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
  const item = await UserStageModel.findOne({
    _id: id,
    "userPublic.code": TID,
  });
  if (!item) throw new Error("user stage not found");

  const results = item?.results || initResults();

  const [summary] = await UserChallengeServiceSummary(id, TID);

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
