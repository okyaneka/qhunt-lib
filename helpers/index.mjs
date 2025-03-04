import { Schema, startSession } from 'mongoose';
import { BrowserQRCodeReader } from '@zxing/browser';

// _src/helpers/bonus.ts
var timeBonus = (seconds, totalSeconds, maxPoint = 1e3) => {
  return Math.round(maxPoint * (1 - seconds / totalSeconds));
};
var bonus = { timeBonus };
var bonus_default = bonus;
var transaction = async (operation, clientSession) => {
  const session = clientSession ?? await startSession();
  clientSession ?? session.startTransaction();
  return await operation(session).then(async (res) => {
    await session.commitTransaction();
    return res;
  }).catch(async (err) => {
    await session.abortTransaction();
    throw err;
  }).finally(() => {
    session.endSession();
  });
};
var db = { transaction };
var db_default = db;
var IdNameSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var PeriodSchema = new Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);
var FeedbackSchema = new Schema(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false }
);
var ToObject = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};
var model = {
  IdNameSchema,
  PeriodSchema,
  FeedbackSchema,
  ToObject
};
var model_default = model;
var scanByStream = (stream, el) => {
  const reader = new BrowserQRCodeReader();
  return reader.decodeOnceFromStream(stream, el);
};
var scanByFile = (file) => {
  const reader = new BrowserQRCodeReader();
  const url = URL.createObjectURL(file);
  return reader.decodeFromImageUrl(url);
};
var qrcode = { scanByStream, scanByFile };
var qrcode_default = qrcode;

// _src/helpers/response.ts
var success = (data = null, message = "success") => {
  return {
    code: 200,
    message,
    data: data || {},
    error: {}
  };
};
var error = (error2 = null, message = "", code = 400) => {
  return {
    code,
    message,
    data: {},
    error: error2 || {}
  };
};
var errorValidation = (error2) => {
  const validation = error2?.details.reduce((car, cur) => {
    return { ...car, [cur.context?.key]: cur.message };
  }, {});
  return response.error({ validation }, "validation_error");
};
var response = { success, error, errorValidation };
var response_default = response;

// _src/helpers/service.ts
var list = async (model2, page, limit, filters = {}, sort) => {
  const skip = (page - 1) * limit;
  const filter = {
    ...filters,
    deletedAt: null
  };
  const items = await model2.find(filter).skip(skip).limit(limit).sort(sort ?? { createdAt: -1 });
  const totalItems = await model2.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);
  return {
    list: items.map((item) => item.toObject ? item.toObject() : item),
    page,
    totalItems,
    totalPages
  };
};
var service = { list };
var service_default = service;

// _src/helpers/index.ts
var urlToBuffer = async (photoURL) => {
  const response2 = await fetch(photoURL);
  if (!response2.ok) throw new Error("Failed to fetch image");
  const arrayBuffer = await response2.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimetype = response2.headers.get("content-type") || "application/octet-stream";
  return { buffer, mimetype };
};

export { bonus_default as bonus, db_default as db, model_default as model, qrcode_default as qrcode, response_default as response, service_default as service, urlToBuffer };
