import { UserChallengeForeign } from "~/models/UserChallengeModel";
import { UserPublicForeign } from "~/models/UserPublicModel";
import UserTrivia, {
  UserTriviaResult,
  UserTriviaSummary,
} from "~/models/UserTriviaModel";
import { TriviaForeignValidator } from "~/validators/TriviaValidator";
import {
  details as TriviaServiceDetails,
  detail as TriviaServiceDetail,
} from "../TriviaService";
import { ChallengeTypeValues } from "~/models/ChallengeModel";

export const verify = async (triviaId: string, TID: string) => {
  const item = await UserTrivia.findOne({
    "userPublic.code": TID,
    "trivia.id": triviaId,
    deletedAt: null,
  });
  if (!item) throw new Error("user trivia not found");
  return item;
};

export const setup = async (
  userPublic: UserPublicForeign,
  userChallenge: UserChallengeForeign
): Promise<string[]> => {
  const trivias = await TriviaServiceDetails(userChallenge.challengeId);

  const payload = trivias.map(async (item) => {
    const trivia = await TriviaForeignValidator.validateAsync(item, {
      stripUnknown: true,
    });
    const userTrivia = await verify(trivia.id, userPublic.code).catch(
      () => null
    );
    if (userTrivia) return userTrivia;

    return await UserTrivia.create({
      userPublic,
      userChallenge,
      trivia,
    });
  });

  const items = await Promise.all(payload);

  return items.map((item) => item.toObject().id);
};

export const details = async (
  ids: string[],
  TID: string,
  hasResult?: boolean
) => {
  const filter: any = {};
  if (hasResult !== undefined)
    filter.results = hasResult ? { $ne: null } : null;

  const data = await UserTrivia.find({
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
  const userTrivia = await UserTrivia.findOne({
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
  return await UserTrivia.updateMany(
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
  const [summary] = await UserTrivia.aggregate()
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
    .addFields({ type: ChallengeTypeValues.Trivia });

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
