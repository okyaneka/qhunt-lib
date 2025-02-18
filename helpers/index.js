'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var deepmerge = require('deepmerge');
var mongoose = require('mongoose');
var browser = require('@zxing/browser');
var Joi = require('joi');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var deepmerge__default = /*#__PURE__*/_interopDefault(deepmerge);
var Joi__default = /*#__PURE__*/_interopDefault(Joi);

// _src/helpers/bonus/index.ts
var timeBonus = (seconds, totalSeconds, maxPoint = 1e3) => {
  return Math.round(maxPoint * (1 - seconds / totalSeconds));
};
var bonus = { timeBonus };
var bonus_default = bonus;
var common = { deepmerge: deepmerge__default.default };
var common_default = common;
var transaction = async (operation) => {
  const session = await mongoose.startSession();
  session.startTransaction();
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
var IdNameSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var PeriodSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);
var FeedbackSchema = new mongoose.Schema(
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
  const reader = new browser.BrowserQRCodeReader();
  return reader.decodeOnceFromStream(stream, el);
};
var scanByFile = (file) => {
  const reader = new browser.BrowserQRCodeReader();
  const url = URL.createObjectURL(file);
  return reader.decodeFromImageUrl(url);
};
var qrcode = { scanByStream, scanByFile };
var qrcode_default = qrcode;

// _src/helpers/response/index.ts
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
  return response.error({ validation }, "validation error");
};
var response = { success, error, errorValidation };
var response_default = response;
var createValidator = (base, option) => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== undefined) v = v.allow(option.allow);
  if (option?.defaultValue !== undefined) v = v.default(option.defaultValue);
  return v;
};
var string = (option) => createValidator(Joi__default.default.string().trim(), option);
var number = (option) => createValidator(Joi__default.default.number(), option);
var boolean = (option) => createValidator(Joi__default.default.boolean(), option);
var array = (item, options) => {
  let v = createValidator(
    Joi__default.default.array().items(item)
  );
  if (options?.required) v = v.min(1);
  if (options?.defaultValue) v.default(options.defaultValue);
  if (options?.allow) v.allow(options.allow);
  return v;
};
var generate = (fields) => Joi__default.default.object(fields);
var schema = {
  createValidator,
  string,
  number,
  boolean,
  array,
  generate
};
var schema_default = schema;

// _src/helpers/service/index.ts
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
var helpers = {
  bonus: bonus_default,
  common: common_default,
  db: db_default,
  model: model_default,
  qrcode: qrcode_default,
  response: response_default,
  schema: schema_default,
  service: service_default
};
var helpers_default = helpers;

exports.bonus = bonus_default;
exports.common = common_default;
exports.db = db_default;
exports.default = helpers_default;
exports.model = model_default;
exports.qrcode = qrcode_default;
exports.response = response_default;
exports.schema = schema_default;
exports.service = service_default;
