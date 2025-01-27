import Trivia from "~/models/TriviaModel";
import { UserChallengeForeign } from "~/models/UserChallengeModel";
import { UserPublicForeign } from "~/models/UserPublicModel";
import UserTrivia, { UserTriviaResult } from "~/models/UserTriviaModel";
import { TriviaForeignValidator } from "~/validators/TriviaValidator";
import TriviaService from "../TriviaService";
import UserTriviaModel from "~/models/UserTriviaModel";

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
  userChallenge: UserChallengeForeign,
  content: string[]
): Promise<string[]> => {
  const trivias = await Trivia.find({ _id: { $in: content } });

  const payload = trivias
    .map((item) => item.toObject())
    .map(async (item) => {
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

  const trivia = await TriviaService.detail(userTrivia.trivia.id);
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

const UserTriviaService = { setup, details, submit } as const;

export default UserTriviaService;
