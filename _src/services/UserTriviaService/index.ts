import Trivia from "~/models/TriviaModel";
import { UserChallengeForeign } from "~/models/UserChallengeModel";
import { UserPublicForeign } from "~/models/UserPublicModel";
import UserTrivia from "~/models/UserTriviaModel";
import { TriviaForeignValidator } from "~/validators/TriviaValidator";

export const verify = async (triviaId: string, TID: string) => {
  const item = await UserTrivia.findOne({
    "userPublic.code": TID,
    "trivia.id": triviaId,
    deletedAt: null,
  });
  if (!item) throw new Error("user challenge is undiscovered");
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

export const details = async (ids: string[], TID: string) => {
  const data = await UserTrivia.find({
    _id: { $in: ids },
    "userPublic.code": TID,
  });

  return data.map((item) =>
    item.toObject({
      transform: (doc, ret) => {
        const { _id, __v, userPublic, ...rest } = ret;
        return { id: _id, ...rest };
      },
    })
  );
};

const UserTriviaService = { setup, details } as const;

export default UserTriviaService;
