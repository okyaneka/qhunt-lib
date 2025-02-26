import {
  UserChallengeForeign,
  UserPublicForeign,
  UserTriviaResult,
  UserTriviaSummary,
  TriviaForeign,
} from "~";
import {
  details as TriviaServiceDetails,
  detail as TriviaServiceDetail,
} from "../trivia-service";
import UserTriviaModel from "~/models/user-trivia-model";
import { ClientSession } from "mongoose";
import { db } from "~/helpers";
import { submit as UserChallengeSubmit } from "../user-challenge-service";
import { CHALLENGE_TYPES } from "~/helpers/contants";

export const verify = async (triviaId: string, TID: string) => {
  const item = await UserTriviaModel.findOne({
    "userPublic.code": TID,
    "trivia.id": triviaId,
    deletedAt: null,
  });
  if (!item) throw new Error("user trivia not found");
  return item;
};

export const setup = async (
  userPublic: UserPublicForeign,
  userChallenge: UserChallengeForeign,
  session?: ClientSession
) => {
  const trivias = await TriviaServiceDetails(userChallenge.challengeId);

  const payload = trivias.map((item) => {
    const trivia: TriviaForeign = {
      id: item.id,
      allowMultiple: item.allowMultiple,
      options: item.options.map(({ text }) => ({ text })),
      question: item.question,
    };

    return {
      userPublic,
      userChallenge,
      trivia,
    };
  });

  return await UserTriviaModel.insertMany(payload, { session });
};

export const details = async (
  ids: string[],
  TID: string,
  hasResult?: boolean,
  session?: ClientSession
) => {
  const filter: any = {};
  if (hasResult !== undefined)
    filter.results = hasResult ? { $ne: null } : null;

  const data = await UserTriviaModel.find(
    {
      ...filter,
      _id: { $in: ids },
      "userPublic.code": TID,
    },
    null,
    { session }
  );

  return data.map((item) => item.toObject());
};

export const submit = async (
  id: string,
  TID: string,
  answer: string | null = null,
  bonus?: number
) => {
  return db.transaction(async (session) => {
    const userTrivia = await UserTriviaModel.findOne({
      _id: id,
      "userPublic.code": TID,
    });
    if (!userTrivia) throw new Error("user trivia not found");
    if (userTrivia.results) return userTrivia.toObject();

    const trivia = await TriviaServiceDetail(userTrivia.trivia.id);
    const selectedAnswer = trivia.options.find((v) => v.text == answer);
    const isCorrect = Boolean(selectedAnswer?.isCorrect);
    const baseScore = selectedAnswer?.point || 0;
    const results: UserTriviaResult = {
      answer,
      feedback: trivia.feedback[isCorrect ? "positive" : "negative"],
      isCorrect,
      baseScore,
      bonus: bonus || 0,
      totalScore: baseScore + (bonus || 0),
    };
    userTrivia.results = results;
    await userTrivia.save({ session });

    await UserChallengeSubmit(userTrivia.userChallenge.id, TID, session);

    return userTrivia.toObject();
  });
};

export const submitEmpties = async (
  userChallengeId: string,
  TID: string,
  session?: ClientSession
) => {
  const results = {
    answer: null,
    feedback: null,
    isCorrect: false,
    baseScore: 0,
    bonus: 0,
    totalScore: 0,
  };
  return await UserTriviaModel.updateMany(
    {
      "userChallenge.id": userChallengeId,
      "userPublic.code": TID,
      results: null,
    },
    { $set: { results } },
    { session }
  );
};

export const summary = async (
  userChallengeId: string,
  TID: string,
  session?: ClientSession
): Promise<UserTriviaSummary> => {
  const [summary] = await UserTriviaModel.aggregate()
    .match({
      "userChallenge.id": userChallengeId,
      "userPublic.code": TID,
    })
    .group({
      _id: {
        userChallenge: "$userChallenge.id",
        userPublic: "$userPublic.code",
      },
      type: { $first: CHALLENGE_TYPES.Trivia },
      userPublic: { $first: "$userPublic" },
      userChallenge: { $first: "$userChallenge" },
      totalItem: {
        $sum: {
          $cond: {
            if: { $eq: ["$results.isCorrect", true] },
            then: 1,
            else: 0,
          },
        },
      },
      totalBaseScore: { $sum: "$results.baseScore" },
      totalBonus: { $sum: "$results.bonus" },
      totalScore: { $sum: "$results.totalScore" },
    })
    .session(session || null);

  return summary;
};

const UserTriviaService = {
  setup,
  details,
  submit,
  submitEmpties,
  summary,
} as const;

export default UserTriviaService;
