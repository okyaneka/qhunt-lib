import {
  detail as ChallengeDetail,
  updateContent as ChallengeUpdateContent,
} from "../challenge-service";
import TriviaModel from "~/models/trivia-model";
import { TriviaPayload } from "~/index";
import { IdName } from "~/index";
import { ClientSession } from "mongoose";
import { transaction } from "~/helpers/db";
import { CHALLENGE_TYPES } from "~/constants";

const createMany = async (
  challenge: IdName,
  payload: TriviaPayload[],
  session: ClientSession
) => {
  if (payload.length === 0) return [];

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
    challenge,
  }));
  return await TriviaModel.insertMany(items, { session });
};

const updateMany = async (
  challenge: IdName,
  payload: TriviaPayload[],
  session: ClientSession
) => {
  if (payload.length === 0) return [];
  const ids = payload.map(({ id }) => id);

  const res = await TriviaModel.bulkWrite(
    payload.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.id },
          update: {
            $set: {
              ...item,
              challenge,
            },
          },
        },
      };
    }),
    { session }
  );

  if (res.modifiedCount !== payload.length)
    throw new Error("trivia.sync.update_error");

  return await TriviaModel.find({ _id: { $in: ids } });
};

export const detail = async (id: string) => {
  const item = await TriviaModel.findOne({ _id: id });
  if (!item) throw new Error("trivia not found");
  return item;
};

export const details = async (challengeId: string) => {
  const challenge = await ChallengeDetail(challengeId);

  if (challenge.settings.type !== CHALLENGE_TYPES.Trivia)
    throw new Error("challenge.not_trivia_type_error");

  const items = await TriviaModel.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};

export const sync = async (challengeId: string, payload: TriviaPayload[]) => {
  return await transaction(async (session) => {
    // reset
    await TriviaModel.updateMany(
      { "challenge.id": challengeId },
      { $set: { challenge: null } },
      { session }
    );

    if (payload.length === 0) return [];

    const challenge = await ChallengeDetail(challengeId);

    if (challenge.settings.type !== CHALLENGE_TYPES.Trivia)
      throw new Error("challenge.not_trivia_type_error");

    const challengeForeign = { id: challenge.id, name: challenge.name };

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

    const itemsCreated = await createMany(
      challengeForeign,
      itemsCreate,
      session
    );
    const itemsUpdated = await updateMany(
      challengeForeign,
      itemsUpdate,
      session
    );
    const items = [...itemsCreated, ...itemsUpdated].map((item) =>
      item.toObject()
    );

    await ChallengeUpdateContent(
      challengeId,
      items.map(({ id }) => id)
    );

    return items;
  });
};

export const verify = async (id: string) => {};

const TriviaService = { detail, details, sync, verify };

export default TriviaService;
