import { QrModel, PhotoHuntModel } from "~/models";
import { IdName } from "~/helpers/types";
import { transaction } from "~/helpers/db";
import { ClientSession } from "mongoose";
import { QrListParamsValidator } from "~/validators/qr";
import { QrContent, CHALLENGE_TYPES, PhotoHuntPayload } from "~/types";
import { list as QrServiceList } from "../qr";
import {
  detail as ChallengeDetail,
  updateContent as ChallengeUpdateContent,
} from "../challenge";

const createMany = async (
  challenge: IdName,
  payload: PhotoHuntPayload[],
  session: ClientSession
) => {
  if (payload.length === 0) return [];

  const qrParams = await QrListParamsValidator.validateAsync({
    hasContent: false,
    limit: payload.length,
  });

  const qrs = (await QrServiceList(qrParams)).list.map(({ id, code }) => ({
    id,
    code,
  }));

  if (qrs.length !== payload.length)
    throw new Error("photohunt.sync.qr_not_enough_error");

  const items = await PhotoHuntModel.insertMany(
    payload.map((item, i) => ({
      ...item,
      challenge,
      qr: qrs[i],
    })),
    { session }
  );

  const res = await QrModel.bulkWrite(
    items.map((item) => {
      const content: QrContent = {
        type: "photohunt",
        refId: item.id,
      };
      return {
        updateOne: {
          filter: { _id: item.qr?.id },
          update: { $set: { content } },
        },
      };
    }),
    { session }
  );

  if (res.modifiedCount !== items.length)
    throw new Error("photohunt.sync.qr_updating_error");

  return items;
};

const updateMany = async (
  challenge: IdName,
  payload: PhotoHuntPayload[],
  session: ClientSession
) => {
  if (payload.length === 0) return [];
  const ids = payload.map(({ id }) => id);

  const res = await PhotoHuntModel.bulkWrite(
    payload.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.id },
          update: { $set: { ...item, challenge } },
        },
      };
    }),
    { session }
  );

  if (res.modifiedCount !== payload.length)
    throw new Error("photohunt.sync.update_error");

  return await PhotoHuntModel.find({ _id: { $in: ids } });
};

export const detail = async (id: string) => {
  const item = await PhotoHuntModel.findOne({ _id: id });
  if (!item) throw new Error("photo hunt not found");

  return item.toObject();
};

export const details = async (challengeId: string) => {
  const challenge = await ChallengeDetail(challengeId);

  if (challenge.settings.type !== CHALLENGE_TYPES.PhotoHunt)
    throw new Error("challenge.not_photohunt_type_error");

  const items = await PhotoHuntModel.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};

export const sync = async (
  challengeId: string,
  payload: PhotoHuntPayload[]
) => {
  return transaction(async (session) => {
    await PhotoHuntModel.updateMany(
      { "challenge.id": challengeId },
      { $set: { challenge: null } },
      { session }
    );

    if (payload.length === 0) return [];

    const challenge = await ChallengeDetail(challengeId);

    if (challenge.settings.type !== CHALLENGE_TYPES.PhotoHunt)
      throw new Error("challenge.not_photohunt_type_error");

    const challengeForeign = { id: challenge.id, name: challenge.name };

    const { create: itemsCreate, update: itemsUpdate } = payload.reduce<{
      create: PhotoHuntPayload[];
      update: PhotoHuntPayload[];
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

export const verifyCode = async (challengeId: string, code: string) => {
  const item = await PhotoHuntModel.findOne({
    "challenge.id": challengeId,
    "qr.code": code,
  });
  if (!item) throw new Error("photohunt.not_found");
  return item.toObject();
};

const PhotoHuntService = { detail, details, sync, verify, verifyCode };

export default PhotoHuntService;
