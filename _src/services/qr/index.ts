import { enc, SHA256 } from "crypto-js";
import { QrModel } from "~/models";
import { QR_STATUS, QrListParams, QrPayload, QrUpdatePayload } from "~/types";
import { detail as StageDetail, verify as StageVerify } from "../stage";
import {
  detail as ChallengeDetail,
  verify as ChallengeVerify,
} from "../challenge";
import {
  detail as PhotoHuntDetail,
  verify as PhotoHuntVerify,
} from "../photo-hunt";
import { detail as TriviaDetail, verify as TriviaVerify } from "../trivia";
import { setup as UserStageSetup } from "../user-stage";
import { setup as UserChallengeSetup } from "../user-challenge";

const services = {
  stage: { detail: StageDetail, verify: StageVerify },
  challenge: {
    detail: ChallengeDetail,
    verify: ChallengeVerify,
  },
  photohunt: { detail: PhotoHuntDetail, verify: PhotoHuntVerify },
  trivia: { detail: TriviaDetail, verify: TriviaVerify },
} as const;

const servicesSetup = {
  stage: { setup: UserStageSetup },
  challenge: { setup: UserChallengeSetup },
  trivia: null,
  photohunt: null,
} as const;

export const list = async (params: Partial<QrListParams>) => {
  const { page = 1, limit = 10 } = params;

  const skip = (page - 1) * limit;
  const filter: any = { deletedAt: null };
  if (params.status) filter.status = params.status;
  if (params.code) filter.code = params.code;
  if (params.hasContent != null)
    filter.content = params.hasContent ? { $ne: null } : null;
  const items = await QrModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalItems = await QrModel.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages,
  };
};

export const generate = async (count: number) => {
  const items = new Array(count).fill({}).map<QrPayload>(() => {
    const salt = Math.floor(Math.random() * Math.pow(16, 8))
      .toString(16)
      .padStart(8, "0");
    return {
      code: SHA256(`${Date.now()}${salt}`).toString(enc.Hex),
      status: QR_STATUS.Draft,
    };
  });

  return QrModel.insertMany(items);
};

export const detail = async (id: string) => {
  const item = await QrModel.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");
  return item.toObject();
};

export const details = async (ids: string[]) => {
  const items = await QrModel.find({ _id: { $in: ids } });
  return items.map((item) => item.toObject());
};

export const update = async (id: string, payload: QrUpdatePayload) => {
  const { content } = payload;
  const item = await QrModel.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");

  if (content) {
    const service = services[content.type];
    const action = payload.status === QR_STATUS.Draft ? "detail" : "verify";
    await service[action](content.refId);
  }

  Object.assign(item, payload);
  await item.save();
  return item.toObject();
};

export const _delete = async (id: string) => {
  const item = await QrModel.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: new Date() }
  );
  if (!item) throw new Error("item not found");
  return item;
};

export const deleteMany = async (ids: string[]) => {
  const changed = await QrModel.updateMany(
    {
      _id: { $in: ids },
      deletedAt: null,
      status: QR_STATUS.Draft,
    },
    { $set: { deletedAt: new Date() } }
  );
  if (changed.modifiedCount == 0) throw new Error("item not found");
  return changed;
};

export const verify = async (code: string, TID: string) => {
  const qrData = await QrModel.findOne({
    code,
    deletedAt: null,
    status: QR_STATUS.Publish,
  });

  if (!qrData || !["stage", "challenge"].includes(String(qrData.content?.type)))
    throw new Error("qr code invalid");

  const { content } = qrData;
  if (!content) throw new Error("invalid qr content");

  const service = servicesSetup[content.type];
  const data = await service?.setup(content.refId, TID, true);
  if (data) content.refId = data.id;
  await QrModel.updateOne(
    { _id: qrData.id },
    { accessCount: (qrData.accessCount || 0) + 1 }
  );

  return content;
};

const QrService = {
  generate,
  list,
  detail,
  details,
  update,
  delete: _delete,
  deleteMany,
  verify,
};

export default QrService;
