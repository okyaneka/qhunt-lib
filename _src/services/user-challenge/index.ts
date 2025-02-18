import dayjs from "dayjs";
import { verify as ChallengeVerify } from "../challenge";
import { ChallengeModel, UserChallengeModel } from "~/models";
import {
  CHALLENGE_TYPES,
  UserChallengeForeign,
  UserChallengeParams,
  UserChallengeResult,
  USER_CHALLENGE_STATUS,
  UserChallengeSummary,
  UserStage,
  Stage,
} from "~/types";
import { verify as UserPublicVerivy } from "../user-public";
import UserStageService from "../user-stage";
import {
  ChallengeForeignValidator,
  ChallengeSettingsForeignValidator,
} from "~/validators/challenge";
import { UserPublicForeignValidator } from "~/validators/user-public";
import StageService from "../stage";
import service from "~/helpers/service";
import {
  details as UserTriviaDetails,
  setup as UserTriviaSetup,
  submitEmpties as UserTriviaSubmitEmpties,
  summary as UserTriviaSummary,
} from "~/services/user-trivia";
import {
  details as UserPhotoHuntDetails,
  setup as UserPhotoHuntSetup,
  submitEmpties as UserPhotoHuntSubmitEmpties,
  summary as UserPhotoHuntSummary,
} from "~/services/user-photo-hunt";
import { ClientSession } from "mongoose";
import { timeBonus } from "~/helpers/bonus";

const services = {
  [CHALLENGE_TYPES.Trivia]: {
    setup: UserTriviaSetup,
    details: UserTriviaDetails,
    submitEmpties: UserTriviaSubmitEmpties,
    summary: UserTriviaSummary,
  },
  [CHALLENGE_TYPES.PhotoHunt]: {
    setup: UserPhotoHuntSetup,
    details: UserPhotoHuntDetails,
    submitEmpties: UserPhotoHuntSubmitEmpties,
    summary: UserPhotoHuntSummary,
  },
};

const initResult = (): UserChallengeResult => {
  return {
    baseScore: 0,
    bonus: 0,
    timeUsed: 0,
    totalScore: 0,
    contentBonus: 0,
    totalItem: 0,
    startAt: new Date(),
    endAt: null,
  };
};

const verify = async (
  challengeId: string,
  TID: string,
  setDiscover?: boolean
) => {
  const item = await UserChallengeModel.findOne({
    "userPublic.code": TID,
    "challenge.id": challengeId,
    deletedAt: null,
  });
  if (!item) return null;
  if (item.status == USER_CHALLENGE_STATUS.Undiscovered && setDiscover)
    await UserChallengeModel.updateOne(
      { _id: item.id },
      { $set: { status: USER_CHALLENGE_STATUS.Discovered } }
    );
  return item.toObject();
};

export const init = async (
  stage: Stage,
  userStage: UserStage,
  session?: ClientSession
) => {
  const challenges = await ChallengeModel.find({
    _id: { $in: stage.contents },
  });
  const userPublic = userStage.userPublic;

  const payload = challenges.map((item) => {
    const {
      id,
      name,
      order,
      storyline,
      settings: { duration, type },
    } = item;
    return {
      userStage: {
        id: userStage.id,
        stageId: userStage.stage.id,
        name: userStage.stage.name,
      },
      challenge: { id, name, order, storyline },
      userPublic,
      settings: { duration, type },
    };
  });

  const contents = await UserChallengeModel.insertMany(payload, { session });

  await Promise.all(
    contents.map(async (item) => {
      const items = await services[item.settings.type].setup(
        userPublic,
        {
          id: item.id,
          challengeId: item.challenge.id,
          name: item.challenge.name,
        },
        session
      );
      item.contents = items.map((i) => i.id);
      await item.save({ session });
      return item.toObject();
    })
  );

  return await UserChallengeModel.find({
    _id: { $in: contents.map((item) => item._id) },
  });
};

export const setup = async (
  challengeId: string,
  TID: string,
  setDiscover?: boolean
) => {
  const exist = await verify(challengeId, TID, setDiscover);
  if (exist) return exist;

  const userPublicData = await UserPublicVerivy(TID);
  const challengeData = await ChallengeVerify(challengeId);

  const stageId = challengeData.stage?.id;
  const userStageData =
    stageId && (await UserStageService.verify(stageId, TID));

  // challenges were discovered before stages
  if (stageId && !userStageData) {
    const stageData = await StageService.detail(stageId);

    // check is can setup from challenge
    if (!stageData.settings.canStartFromChallenges)
      throw new Error("user stage has not been found yet");

    // if yes, setup the stage and everything in it
    await UserStageService.setup(stageId, TID);
    const result = await verify(challengeId, TID, setDiscover);
    if (result) return result;
    throw new Error("challenge setup error");
  }

  const userStage = userStageData && {
    id: userStageData.id,
    stageId: userStageData.stage.id,
    name: userStageData.stage.name,
  };

  const userPublic = await UserPublicForeignValidator.validateAsync(
    userPublicData,
    { abortEarly: false, stripUnknown: true, convert: true }
  );

  const challenge = await ChallengeForeignValidator.validateAsync(
    challengeData,
    { abortEarly: false, stripUnknown: true, convert: true }
  );

  const settings = await ChallengeSettingsForeignValidator.validateAsync(
    challengeData.settings,
    { abortEarly: false, stripUnknown: true, convert: true }
  );

  const userChallengeData = await UserChallengeModel.create({
    userStage,
    challenge,
    userPublic,
    settings,
    status: USER_CHALLENGE_STATUS[setDiscover ? "Discovered" : "Undiscovered"],
  });

  const userChallenge: UserChallengeForeign = {
    id: userChallengeData.id,
    challengeId: userChallengeData.challenge.id,
    name: userChallengeData.challenge.name,
  };

  const contents = await services[settings.type].setup(
    userPublic,
    userChallenge
  );

  userChallengeData.contents = contents.map((item) => item.id);
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
    UserChallengeModel,
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
  const data = await UserChallengeModel.findOne({
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

export const submit = async (
  id: string,
  TID: string,
  session?: ClientSession
) => {
  const userChallenge = await detail(id, TID);
  if (!userChallenge) throw new Error("user challenge not found");

  const {
    settings: { type: challengeType },
  } = userChallenge;

  await services[challengeType].submitEmpties(id, TID, session);

  const summary = await services[challengeType].summary(id, TID, session);

  const results = userChallenge.results || initResult();
  const timeUsed = Math.min(
    dayjs().diff(dayjs(results.startAt), "seconds"),
    userChallenge.settings.duration
  );

  results.totalItem = summary.totalItem;
  results.contentBonus = summary.totalBonus || 0;
  results.baseScore = summary.totalBaseScore;
  results.bonus = timeBonus(
    timeUsed,
    userChallenge.settings.duration,
    (userChallenge.contents.length * 100) / 2
  );
  results.totalScore = results.baseScore + results.bonus + results.contentBonus;
  results.endAt = new Date();
  results.timeUsed = timeUsed;

  const newUserChallenge = await UserChallengeModel.findOneAndUpdate(
    { _id: userChallenge.id },
    { $set: { results, status: USER_CHALLENGE_STATUS.Completed } },
    { new: true, session }
  );
  if (!newUserChallenge) throw new Error("");

  if (userChallenge.userStage)
    await UserStageService.submitState(userChallenge.userStage.id, TID);

  return newUserChallenge.toObject();
};

export const submitState = async (
  id: string,
  TID: string,
  finish?: boolean,
  session?: ClientSession
) => {
  const { OnGoing, Completed } = USER_CHALLENGE_STATUS;

  const userChallenge = await UserChallengeModel.findOne({ _id: id }, null, {
    session,
  });
  if (!userChallenge) throw new Error("user_challenge.not_found");
  if (userChallenge.status === Completed) return userChallenge.toObject();

  const {
    settings: { type: challengeType },
  } = userChallenge;

  const summary = await services[challengeType].summary(id, TID, session);
  const results = userChallenge.results || initResult();

  results.totalItem = summary.totalItem;
  results.baseScore = summary.totalBaseScore;
  results.contentBonus = summary.totalBonus;

  if (finish) {
    await services[challengeType].submitEmpties(id, TID, session);
    const timeUsed = Math.min(
      dayjs().diff(dayjs(results.startAt), "seconds"),
      userChallenge.settings.duration
    );
    const bonus = timeBonus(
      timeUsed,
      userChallenge.settings.duration,
      (userChallenge.contents.length * 100) / 2
    );

    results.bonus = bonus;
    results.timeUsed = timeUsed;
    results.endAt = new Date();
  }

  results.totalScore = results.baseScore + results.bonus + results.contentBonus;

  userChallenge.results = results;
  userChallenge.status = finish ? Completed : OnGoing;
  await userChallenge.save({ session });

  if (userChallenge.userStage && finish)
    await UserStageService.submitState(
      userChallenge.userStage.id,
      TID,
      session
    );

  return userChallenge.toObject();
};

export const summary = async (
  userStageId: string,
  TID: string,
  session?: ClientSession
): Promise<UserChallengeSummary[]> => {
  return UserChallengeModel.aggregate()
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
    })
    .session(session || null);
};

const UserChallengeService = {
  verify,
  setup,
  list,
  detail,
  // detailContent,
  submit,
  submitState,
  summary,
  init,
} as const;

export default UserChallengeService;
