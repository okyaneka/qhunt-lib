import ChallengeService from "../ChallengeService";
import UserChallenge, {
  UserChallengeForeign,
  UserChallengeParams,
  UserChallengeStatus,
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

export const submit = async (id: string, payload: any, TID: string) => {};

const UserChallengeService = {
  verify,
  setup,
  list,
  detail,
  detailContent,
  submit,
} as const;

export default UserChallengeService;
