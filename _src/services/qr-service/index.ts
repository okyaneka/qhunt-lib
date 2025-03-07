import { QrListParams, QrPayload, QrUpdatePayload } from "~/index";
import { setup as UserChallengeSetup } from "../user-challenge-service";
import { setup as UserStageSetup } from "../user-stage-service";
import { QR_STATUS } from "~/constants";
import { createHash } from "crypto";
import QrModel from "~/models/qr-model";
import { db } from "~/helpers";
import { ClientSession } from "mongoose";

// ENHANCE: tambah validasi kalau konten exist

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

export const QrGenerate = async (count: number, session?: ClientSession) => {
  const items = new Array(count).fill({}).map<QrPayload>(() => {
    const salt = Math.floor(Math.random() * Math.pow(16, 8))
      .toString(16)
      .padStart(8, "0");
    return {
      code: createHash("sha256").update(`${Date.now()}${salt}`).digest("hex"),
      status: QR_STATUS.Draft,
    };
  });

  return QrModel.insertMany(items, { session });
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

export const QrUpdate = async (
  id: string,
  payload: QrUpdatePayload,
  session?: ClientSession
) => {
  return db.transaction(async (session) => {
    const item = await QrModel.findOne({ _id: id, deletedAt: null }, null, {
      session,
    });
    if (!item) throw new Error("item not found");

    Object.assign(item, payload);
    await item.save({ session });
    return item.toObject();
  }, session);
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
  generate: QrGenerate,
  list,
  detail,
  details,
  update: QrUpdate,
  delete: _delete,
  deleteMany,
  verify,
} as const;

export default QrService;
