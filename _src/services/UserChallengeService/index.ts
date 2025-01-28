import dayjs from "dayjs";
import ChallengeService from "../ChallengeService";
import UserChallenge, {
  UserChallengeForeign,
  UserChallengeParams,
  UserChallengeResult,
  UserChallengeStatus,
  UserChallengeSummary,
} from "~/models/UserChallengeModel";
import UserPublicService from "../UserPublicService";
import UserStageService from "../UserStageService";
import UserTriviaService from "../UserTriviaService";
import {
  ChallengeForeignValidator,
  ChallengeSettingsForeignValidator,
} from "~/validators/ChallengeValidator";
import { ChallengeType } from "~/models/ChallengeModel";
import { UserPublicForeignValidator } from "~/validators/UserPublicValidator";
import StageService from "../StageService";
import service from "~/helpers/service";

const initResult = (): UserChallengeResult => {
  return {
    baseScore: 0,
    bonus: 0,
    timeUsed: 0,
    totalScore: 0,
    correctBonus: 0,
    correctCount: 0,
    startAt: new Date(),
    endAt: null,
  };
};

export const verify = async (
  code: string,
  challengeId: string,
  isDiscover?: boolean
) => {
  const item = await UserChallenge.findOne({
    "userPublic.code": code,
    "challenge.id": challengeId,
    deletedAt: null,
  });
  if (!item) throw new Error("user challenge is undiscovered");
  if (isDiscover) {
    item.status = UserChallengeStatus.Discovered;
    await item.save();
  }
  return item.toObject();
};

export const discover = async (id: string) => {
  const item = await UserChallenge.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set: { status: UserChallengeStatus.Discovered },
    },
    { new: true }
  );
  if (!item) throw new Error("user challenge is undiscovered");
  return item.toObject();
};

export const setup = async (
  code: string,
  challengeId: string,
  isDiscover?: boolean
) => {
  const exist = await verify(code, challengeId).catch(() => null);
  if (exist) return await discover(exist.id);

  const userPublicData = await UserPublicService.verify(code);
  const challengeData = await ChallengeService.verify(challengeId);

  const stageId = challengeData.stage?.id;
  const userStageData = stageId
    ? await UserStageService.verify(code, stageId).catch(() => null)
    : null;

  if (stageId && !userStageData) {
    const stageData = await StageService.detail(stageId);
    if (!stageData.settings.canStartFromChallenges)
      throw new Error("user stage not discovered yet");

    await UserStageService.setup(code, stageId);
    return await verify(code, challengeId, isDiscover);
  }

  const userStage = userStageData
    ? {
        id: userStageData.id,
        stageId: userStageData.stage.id,
        name: userStageData.stage.name,
      }
    : null;

  const userPublic = await UserPublicForeignValidator.validateAsync(
    userPublicData,
    {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    }
  );

  const challenge = await ChallengeForeignValidator.validateAsync(
    challengeData,
    {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    }
  );

  const settings = await ChallengeSettingsForeignValidator.validateAsync(
    challengeData.settings,
    {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    }
  );

  const userChallengeData = await UserChallenge.create({
    userStage,
    challenge,
    userPublic,
    settings,
    status: isDiscover
      ? UserChallengeStatus.Discovered
      : UserChallengeStatus.Undiscovered,
  });

  const userChallenge: UserChallengeForeign = {
    id: userChallengeData.id,
    challengeId: userChallengeData.challenge.id,
    name: userChallengeData.challenge.name,
  };

  const services = {
    [ChallengeType.Trivia]: UserTriviaService,
  } as const;

  const contents = await services[settings.type].setup(
    userPublic,
    userChallenge,
    challengeData.contents
  );

  userChallengeData.contents = contents;
  await userChallengeData.save();

  return userChallengeData.toObject();
};

export const list = async (params: UserChallengeParams, TID: string) => {
  const { search, status, userStageId } = params;

  const filters: Record<string, any> = { "userPublic.code": TID };
  if (search) filters["challenge.name"] = { $regex: search, $options: "i" };
  if (status) filters.status = status;
  if (userStageId) filters["userStage.id"] = userStageId;

  const { list, ...rest } = await service.list(
    UserChallenge,
    params.page,
    params.limit,
    filters,
    "challenge.order"
  );

  return {
    list: list.map(({ userPublic, ...item }) => item),
    ...rest,
  };
};

export const detail = async (id: string, TID: string) => {
  const data = await UserChallenge.findOne({
    _id: id,
    deletedAt: null,
    "userPublic.code": TID,
  });
  if (!data) throw new Error("user challenge not found");
  return data.toObject({
    transform: (doc, ret) => {
      const { _id, __v, userPublic, ...rest } = ret;
      return { id: _id, ...rest };
    },
  });
};

export const detailContent = async (
  id: string,
  TID: string,
  hasResult?: boolean
) => {
  const data = await UserChallenge.findOne({
    _id: id,
    deletedAt: null,
    "userPublic.code": TID,
  });

  if (!data) throw new Error("user challenge not found");
  const {
    status,
    settings: { type: challengeType },
    contents,
  } = data;

  if (status === UserChallengeStatus.Undiscovered)
    throw new Error("user challenge is undiscovered");

  const services = {
    [ChallengeType.Trivia]: UserTriviaService,
  } as const;

  return await services[challengeType].details(contents, TID, hasResult);
};

export const submit = async (id: string, TID: string, bonus: number = 0) => {
  const userChallenge = await UserChallenge.findOne({ _id: id });
  if (!userChallenge) throw new Error("user challenge not found");
  const results = userChallenge.results || initResult();
  const contents = await detailContent(id, TID);
  await Promise.all(
    contents.map((content) => UserTriviaService.submit(content.id, TID))
  );
  const [summary] = await UserTriviaService.summary(id, TID);

  const timeUsed = dayjs().diff(dayjs(results.startAt), "seconds");

  results.baseScore = summary.totalBaseScore;
  results.correctCount = summary.totalCorrect;
  results.correctBonus = summary.totalBonus;
  results.bonus = bonus;
  results.totalScore = summary.totalBaseScore + summary.totalBonus + bonus;
  results.endAt = new Date();
  results.timeUsed = timeUsed;

  userChallenge.results = results;
  userChallenge.status = UserChallengeStatus.Completed;
  await userChallenge.save();
  if (userChallenge.userStage)
    await UserStageService.submitState(userChallenge.userStage.id, TID);
  return userChallenge.toObject();
};

export const submitState = async (id: string, TID: string) => {
  const userChallenge = await UserChallenge.findOne({ _id: id });
  if (!userChallenge) throw new Error("user challenge not found");
  if (userChallenge.status === UserChallengeStatus.Completed)
    return userChallenge.toObject();
  const results = userChallenge.results || initResult();

  const [summary] = await UserTriviaService.summary(id, TID);

  results.baseScore = summary.totalBaseScore;
  results.correctBonus = summary.totalBonus;
  results.totalScore = summary.totalBaseScore + summary.totalBonus;

  userChallenge.results = results;
  userChallenge.status = UserChallengeStatus.OnGoing;
  await userChallenge.save();
  return userChallenge.toObject();
};

export const summary = async (
  userStageId: string,
  TID: string
): Promise<UserChallengeSummary[]> => {
  return UserChallenge.aggregate()
    .match({
      "userStage.id": userStageId,
      "userPublic.code": TID,
    })
    .group({
      _id: "$userPublic.code",
      userPublic: { $first: "$userPublic" },
      userStage: { $first: "$userStage" },
      totalBaseScore: { $sum: "$results.baseScore" },
      totalBonus: {
        $sum: { $add: ["$results.bonus", "$results.correctBonus"] },
      },
      totalScore: { $sum: "$results.totalScore" },
    });
};

const UserChallengeService = {
  verify,
  setup,
  list,
  detail,
  detailContent,
  submit,
  submitState,
  summary,
} as const;

export default UserChallengeService;
