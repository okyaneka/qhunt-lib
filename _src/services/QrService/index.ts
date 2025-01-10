import CryptoJS from "crypto-js";
import Qr, {
  QrContentType,
  QrListQuery,
  QrPayload,
  QrStatus,
  QrUpdatePayload,
} from "~/models/QrModel";
import ChallengeService from "../ChallengeService";
import StageService from "../StageService";
import UserStageService from "../UserStageService";
import TriviaService from "../TriviaService";
import UserChallengeService from "../UserChallengeService";

export const list = async (params: QrListQuery) => {
  const skip = (params.page - 1) * params.limit;
  const filter: any = { deletedAt: null };
  if (params.status) filter.status = params.status;
  if (params.code) filter.code = params.code;
  const items = await Qr.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await Qr.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);

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
      code: CryptoJS.SHA256(`${Date.now()}${salt}`).toString(CryptoJS.enc.Hex),
      status: QrStatus.Draft,
    };
  });

  return Qr.insertMany(items);
};

export const detail = async (id: string) => {
  const item = await Qr.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");
  return item.toObject();
};

export const update = async (id: string, payload: QrUpdatePayload) => {
  const { content } = payload;
  const item = await Qr.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");

  if (content) {
    const serviceMap = {
      [QrContentType.Challenge]: ChallengeService,
      [QrContentType.Stage]: StageService,
      [QrContentType.Trivia]: TriviaService,
    };

    const service = serviceMap[content.type];
    const action = payload.status === QrStatus.Draft ? "detail" : "verify";
    await service[action](content.refId);
  }

  Object.assign(item, payload);
  await item.save();
  return item.toObject();
};

export const _delete = async (id: string) => {
  const item = await Qr.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: new Date() }
  );
  if (!item) throw new Error("item not found");
  return item;
};

export const deleteMany = async (ids: string[]) => {
  const changed = await Qr.updateMany(
    {
      _id: { $in: ids },
      deletedAt: null,
      status: QrStatus.Draft,
    },
    { $set: { deletedAt: new Date() } }
  );
  if (changed.modifiedCount == 0) throw new Error("item not found");
  return changed;
};

export const verify = async (code: string, TID: string) => {
  const qrData = await Qr.findOne({
    code,
    deletedAt: null,
    status: QrStatus.Publish,
  });

  if (!qrData) throw new Error("qr code invalid");

  const { content } = qrData;
  if (!content) throw new Error("invalid qr content");

  const services = {
    [QrContentType.Stage]: UserStageService,
    [QrContentType.Challenge]: UserChallengeService,
    [QrContentType.Trivia]: null,
  };

  const service = services[content.type];
  const data = await service?.setup(TID, content.refId, true);
  if (data) content.refId = data.id;

  return content;
};

const QrService = {
  generate,
  list,
  detail,
  update,
  delete: _delete,
  deleteMany,
  verify,
};

export default QrService;
