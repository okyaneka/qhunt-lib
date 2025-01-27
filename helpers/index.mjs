// _src/helpers/db/index.ts
import { startSession } from "mongoose";
var transaction = async (operation) => {
  const session = await startSession();
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

// _src/helpers/qrcode/index.ts
import { BrowserQRCodeReader } from "@zxing/browser";
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

// _src/helpers/schema/index.ts
import Joi from "joi";
import { Schema } from "mongoose";
var createValidator = (base, option) => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== void 0) v = v.allow(option.allow);
  if (option?.defaultValue !== void 0) v = v.default(option.defaultValue);
  return v;
};
var string = (option) => createValidator(Joi.string().trim(), option);
var number = (option) => createValidator(Joi.number(), option);
var boolean = (option) => createValidator(Joi.boolean(), option);
var array = (item, options) => {
  let v = createValidator(
    Joi.array().items(item),
    options
  );
  if (options?.required) v = v.min(1);
  return v;
};
var generate = (fields) => Joi.object(fields);
var ToObject = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};
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
var schema = {
  createValidator,
  string,
  number,
  boolean,
  array,
  generate,
  ToObject,
  PeriodSchema,
  IdNameSchema
};
var schema_default = schema;

// _src/helpers/service/index.ts
var list = async (model, page, limit, filters = {}, sort) => {
  const skip = (page - 1) * limit;
  const filter = {
    ...filters,
    deletedAt: null
  };
  const items = await model.find(filter).skip(skip).limit(limit).sort(sort ?? { createdAt: -1 });
  const totalItems = await model.countDocuments(filter);
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
var helpers = { db: db_default, response: response_default, schema: schema_default, service: service_default, qrcode: qrcode_default };
var helpers_default = helpers;
export {
  db_default as db,
  helpers_default as default,
  qrcode_default as qrcode,
  response_default as response,
  schema_default as schema,
  service_default as service
};
