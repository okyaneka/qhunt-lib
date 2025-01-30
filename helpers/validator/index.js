"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  FeedbackValidator: () => FeedbackValidator,
  PeriodeValidator: () => PeriodeValidator,
  default: () => validator_default
});
module.exports = __toCommonJS(validator_exports);
var import_joi2 = __toESM(require("joi"));

// _src/helpers/schema/index.ts
var import_joi = __toESM(require("joi"));
var createValidator = (base, option) => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== void 0) v = v.allow(option.allow);
  if (option?.defaultValue !== void 0) v = v.default(option.defaultValue);
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
  if (options?.required) v = v.min(1);
  return v;
};
var generate = (fields) => import_joi.default.object(fields);
var schema = {
  createValidator,
  string,
  number,
  boolean,
  array,
  generate
};
var schema_default = schema;

// _src/helpers/validator/index.ts
var PeriodeValidator = schema_default.generate({
  startDate: import_joi2.default.date().required(),
  endDate: import_joi2.default.date().required().greater(import_joi2.default.ref("startDate"))
});
var DefaultListParamsFields = {
  page: schema_default.number({ defaultValue: 1 }),
  limit: schema_default.number({ defaultValue: 10 }),
  search: schema_default.string({ allow: "", defaultValue: "" })
};
var FeedbackValidator = schema_default.generate({
  positive: schema_default.string({ allow: "", defaultValue: "" }),
  negative: schema_default.string({ allow: "", defaultValue: "" })
}).default({ positive: "", negative: "" });
var validator = {
  PeriodeValidator,
  DefaultListParamsFields,
  FeedbackValidator
};
var validator_default = validator;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultListParamsFields,
  FeedbackValidator,
  PeriodeValidator
});
