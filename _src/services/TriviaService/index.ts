import { Challenge } from "~/models/ChallengeModel";
import Trivia, { TriviaPayload } from "~/models/TriviaModel";
import ChallengeService from "../ChallengeService";

export const sync = async (
  challenge: Challenge,
  items: TriviaPayload[]
): Promise<string[]> => {
  const idName = { id: challenge.id, name: challenge.name };
  const create = items
    .filter((item) => !item.id)
    .map((item) => ({ ...item, challenge: idName }));
  const update = items.filter((item) => item.id);

  await Trivia.updateMany(
    { "challenge.id": challenge.id },
    { $set: { challenge: null } }
  );

  const actCreate = Trivia.insertMany(create);
  const actUpdate = update.map((item) =>
    Trivia.findOneAndUpdate({ _id: item.id }, { $set: item }, { new: true })
  );

  const [resCreate, ...resUpdate] = await Promise.all([
    actCreate,
    ...actUpdate,
  ]);

  const content = resUpdate
    .map((item) => item?._id.toString())
    .concat(...resCreate.map((item) => item._id.toString()))
    .filter((v) => v != undefined);

  await ChallengeService.updateContent(challenge.id, content);

  return content;
};

export const content = async (challenge: Challenge) => {
  const items = await Trivia.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};

export const detail = async (id: string) => {
  const item = await Trivia.findOne({ _id: id });
  if (!item) throw new Error("trivia not found");
  return item;
};

export const verify = async (id: string) => {};

const TriviaService = { sync, content, detail, verify };

export default TriviaService;
