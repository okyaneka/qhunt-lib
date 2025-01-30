import ChallengeService from "../ChallengeService";
import PhotoHuntModel, {
  PhotoHunt,
  PhotoHuntPayload,
} from "~/models/PhotoHuntModel";
import QrService from "../QrService";
import { QrListParamsValidator } from "~/validators/QrValidator";
import { common } from "~/helpers";

const create = async (challengeId: string, payload: PhotoHuntPayload[]) => {
  if (payload.length === 0) return [];

  const challenge = await ChallengeService.detail(challengeId);
  const challengeForeign = { id: challenge.id, name: challenge.name };
  const qrParams = await QrListParamsValidator.validateAsync({
    hasContent: false,
    limit: payload.length,
  });
  const qrs = (await QrService.list(qrParams)).list.map(({ id, code }) => ({
    id,
    code,
  }));

  if (qrs.length !== payload.length)
    throw new Error("QR code data is not enough. please generate again.");

  const items = payload.map((item, i) => ({
    ...item,
    challenge: challengeForeign,
    qr: qrs[i],
  }));
  return await PhotoHuntModel.insertMany(items);
};

const update = async (payload: PhotoHuntPayload[]) => {
  if (payload.length === 0) return [];
  const ids = payload.map(({ id }) => id);
  const existing = await PhotoHuntModel.find({ _id: { $in: ids } });
  const newValue = existing.map((old) => {
    const val = payload.find((val) => val.id == old.id);
    return common.deepmerge<PhotoHunt>(old.toObject(), val || {});
  });

  await PhotoHuntModel.bulkWrite(
    newValue.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.id },
          update: { $set: item },
        },
      };
    })
  );
  return await PhotoHuntModel.find({ _id: { $in: ids } });
};

export const details = async (challengeId: string) => {
  const items = await PhotoHuntModel.find({ "challenge.id": challengeId });
  return items.map((item) => item.toObject());
};

export const sync = async (
  challengeId: string,
  payload: PhotoHuntPayload[]
) => {
  if (payload.length === 0) return [];

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

  const itemsCreated = await create(challengeId, itemsCreate);
  const itemsUpdated = await update(itemsUpdate);

  return [...itemsCreated, ...itemsUpdated].map((item) => item.toObject());
};

export const verify = async (id: string) => {};

const PhotoHuntService = { details, sync, verify };

export default PhotoHuntService;
