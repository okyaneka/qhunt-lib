"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// _src/helpers/validator/index.ts
var validator_exports = {};
__export(validator_exports, {
  DefaultListParamsFields: () => DefaultListParamsFields,
  PeriodeValidator: () => PeriodeValidator,
  default: () => validator_default
});
module.exports = __toCommonJS(validator_exports);
var import_joi2 = __toESM(require("joi"));

// _src/helpers/schema/index.ts
var import_joi = __toESM(require("joi"));
var import_mongoose = require("mongoose");
var createValidator = (base, option) => {
  let v = base;
  if (option == null ? void 0 : option.required) v = v.required();
  if ((option == null ? void 0 : option.allow) !== void 0) v = v.allow(option.allow);
  if ((option == null ? void 0 : option.defaultValue) !== void 0) v = v.default(option.defaultValue);
  return v;
};
var string = (option) => createValidator(import_joi.default.string().trim(), option);
var number = (option) => createValidator(import_joi.default.number(), option);
var boolean = (option) => createValidator(import_joi.default.boolean(), option);
var array = (item, options) => {
  let v = createValidator(
    import_joi.default.array().items(item),
    options
  );
  if (options == null ? void 0 : options.required) v = v.min(1);
  return v;
};
var generate = (fields) => import_joi.default.object(fields);
var ToObject = {
  transform: (doc, ret) => {
    const _a = ret, { _id, deletedAt, __v } = _a, rest = __objRest(_a, ["_id", "deletedAt", "__v"]);
    return __spreadValues({ id: _id.toString() }, rest);
  }
};
var IdNameSchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var PeriodSchema = new import_mongoose.Schema(
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

// _src/helpers/validator/index.ts
var PeriodeValidator = schema_default.generate({
  startDate: import_joi2.default.date().required().greater("now"),
  endDate: import_joi2.default.date().required().greater(import_joi2.default.ref("startDate"))
});
var DefaultListParamsFields = {
  page: schema_default.number({ defaultValue: 1 }),
  limit: schema_default.number({ defaultValue: 10 }),
  search: schema_default.string({ allow: "", defaultValue: "" })
};
var validator = { PeriodeValidator, DefaultListParamsFields };
var validator_default = validator;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultListParamsFields,
  PeriodeValidator
});
