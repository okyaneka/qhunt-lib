import TriviaModel, { Trivia, TriviaPayload } from "~/models/TriviaModel";
import ChallengeService from "../ChallengeService";
import { deepmerge } from "~/helpers/common";

const createMany = async (challengeId: string, payload: TriviaPayload[]) => {
  if (payload.length === 0) return [];

  const challenge = await ChallengeService.detail(challengeId);
  const challengeForeign = { id: challenge.id, name: challenge.name };

  // FOR NEXT DEVELOPMENT IF ITS ENABLE SINGULAR TRIVIA
  // const qrParams = await QrListParamsValidator.validateAsync({
  //   hasContent: false,
  //   limit: payload.length,
  // });
  // const qrs = (await QrService.list(qrParams)).list.map(({ id, code }) => ({
  //   id,
  //   code,
  // }));
  // if (qrs.length !== payload.length)
  //   throw new Error("QR code data is not enough. please generate again.");

  const items = payload.map((item, i) => ({
    ...item,
    challenge: challengeForeign,
  }));
  return await TriviaModel.insertMany(items);
};

const updateMany = async (payload: TriviaPayload[]) => {
  if (payload.length === 0) return [];
  const ids = payload.map(({ id }) => id);
  const existing = await TriviaModel.find({ _id: { $in: ids } });
  const newValue = existing.map((old) => {
    const val = payload.find((val) => val.id == old.id);
    return deepmerge<Trivia>(old.toObject(), val || {});
  });

  await TriviaModel.bulkWrite(
    newValue.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.id },
          update: { $set: item },
        },
      };
    })
  );
  return await TriviaModel.find({ _id: { $in: ids } });
};

export const detail = async (id: string) => {
  const item = await TriviaModel.findOne({ _id: id });
  if (!item) throw new Error("trivia not found");
  return item;
};

export const details = async (challengeId: string) => {
  const items = await TriviaModel.find({ "challenge.id": challengeId });
  return items.map((item) => item.toObject());
};

export const sync = async (challengeId: string, payload: TriviaPayload[]) => {
  if (payload.length === 0) return [];

  const { create: itemsCreate, update: itemsUpdate } = payload.reduce<{
    create: TriviaPayload[];
    update: TriviaPayload[];
  }>(
    (acc, cur) => {
      acc[cur.id ? "update" : "create"].push(cur);
      return acc;
    },
    { create: [], update: [] }
  );

  const itemsCreated = await createMany(challengeId, itemsCreate);
  const itemsUpdated = await updateMany(itemsUpdate);

  return [...itemsCreated, ...itemsUpdated].map((item) => item.toObject());
};

export const verify = async (id: string) => {};

const TriviaService = { detail, details, sync, verify };

export default TriviaService;
