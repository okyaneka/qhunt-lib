import {
  UserChallengeForeign,
  UserPublicForeign,
  UserTriviaResult,
  UserTriviaSummary,
  CHALLENGE_TYPES,
  TriviaForeign,
} from "~/types";
import {
  details as TriviaServiceDetails,
  detail as TriviaServiceDetail,
} from "../trivia";
import { UserTriviaModel } from "~/models";
import { ClientSession } from "mongoose";

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
  hasResult?: boolean
) => {
  const filter: any = {};
  if (hasResult !== undefined)
    filter.results = hasResult ? { $ne: null } : null;

  const data = await UserTriviaModel.find({
    ...filter,
    _id: { $in: ids },
    "userPublic.code": TID,
  });

  return data.map((item) => item.toObject());
};

export const submit = async (
  id: string,
  TID: string,
  answer: string | null = null,
  bonus?: number
) => {
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
  await userTrivia.save();
  return userTrivia.toObject();
};

export const submitEmpties = async (userChallengeId: string, TID: string) => {
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
    { $set: { results } }
  );
};

export const summary = async (
  userChallengeId: string,
  TID: string
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

      userPublic: { $first: "$userPublic" },
      userChallenge: { $first: "$userChallenge" },
      totalCorrect: {
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
    .addFields({ type: CHALLENGE_TYPES.Trivia });

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
