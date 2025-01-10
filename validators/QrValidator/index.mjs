var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// _src/validators/QrValidator/index.ts
import Joi3 from "joi";

// _src/helpers/schema/index.ts
import Joi from "joi";
import { Schema } from "mongoose";
var createValidator = (base, option) => {
  let v = base;
  if (option == null ? void 0 : option.required) v = v.required();
  if ((option == null ? void 0 : option.allow) !== void 0) v = v.allow(option.allow);
  if ((option == null ? void 0 : option.defaultValue) !== void 0) v = v.default(option.defaultValue);
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
  if (options == null ? void 0 : options.required) v = v.min(1);
  return v;
};
var generate = (fields) => Joi.object(fields);
var ToObject = {
  transform: (doc, ret) => {
    const _a = ret, { _id, deletedAt, __v } = _a, rest = __objRest(_a, ["_id", "deletedAt", "__v"]);
    return __spreadValues({ id: _id.toString() }, rest);
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

// _src/models/QrModel/index.ts
import { model, models, Schema as Schema2 } from "mongoose";

// _src/models/QrModel/types.ts
var QrStatus = /* @__PURE__ */ ((QrStatus2) => {
  QrStatus2["Draft"] = "draft";
  QrStatus2["Publish"] = "publish";
  return QrStatus2;
})(QrStatus || {});
var QrContentType = /* @__PURE__ */ ((QrContentType2) => {
  QrContentType2["Stage"] = "stage";
  QrContentType2["Challenge"] = "challenge";
  QrContentType2["Trivia"] = "trivia";
  return QrContentType2;
})(QrContentType || {});

// _src/models/QrModel/index.ts
var QrContentSchema = new Schema2(
  {
    type: { type: String, enum: Object.values(QrContentType), required: true },
    refId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrLocationSchema = new Schema2(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new Schema2(
  {
    code: { type: String, required: true, unique: true },
    status: { type: String, enum: Object.values(QrStatus), required: true },
    content: { type: QrContentSchema, default: null },
    location: { type: QrLocationSchema, default: null },
    accessCount: { type: Number, default: null },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);
QrSchema.set("toObject", ToObject);
QrSchema.set("toJSON", ToObject);
var QrModel = models.Qr || model("Qr", QrSchema);

// _src/helpers/validator/index.ts
import Joi2 from "joi";
var PeriodeValidator = schema_default.generate({
  startDate: Joi2.date().required().greater("now"),
  endDate: Joi2.date().required().greater(Joi2.ref("startDate"))
});
var DefaultListParamsFields = {
  page: schema_default.number({ defaultValue: 1 }),
  limit: schema_default.number({ defaultValue: 10 }),
  search: schema_default.string({ allow: "", defaultValue: "" })
};

// _src/validators/QrValidator/index.ts
var QrListParamsValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListParamsFields), {
  code: schema_default.string({ allow: "" }),
  status: schema_default.string({ allow: "" }).valid(...Object.values(QrStatus))
}));
var QrGeneratePayloadValidator = schema_default.generate({
  amount: schema_default.number({ required: true })
});
var QrContentValidator = schema_default.generate({
  refId: schema_default.string({ required: true }),
  type: schema_default.string({ required: true }).valid(...Object.values(QrContentType))
});
var QrLocationValidator = schema_default.generate({
  label: schema_default.string({ required: true, allow: "" }),
  longitude: schema_default.number({ required: true }),
  latitude: schema_default.number({ required: true })
});
var QrUpdatePayloadValidator = schema_default.generate({
  status: schema_default.string({ required: true }).valid(...Object.values(QrStatus)),
  content: QrContentValidator.allow(null).default(null),
  location: QrLocationValidator.allow(null).default(null)
});
var QrDeleteBulkPayloadValidator = schema_default.generate({
  ids: schema_default.array(Joi3.string(), { required: true })
});
var QrValidator = {
  QrListParamsValidator,
  QrGeneratePayloadValidator,
  QrUpdatePayloadValidator,
  QrDeleteBulkPayloadValidator
};
var QrValidator_default = QrValidator;
export {
  QrDeleteBulkPayloadValidator,
  QrGeneratePayloadValidator,
  QrListParamsValidator,
  QrUpdatePayloadValidator,
  QrValidator_default as default
};
