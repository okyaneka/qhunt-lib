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

// _src/models/QrModel/index.ts
var QrModel_exports = {};
__export(QrModel_exports, {
  QrContentType: () => QrContentType,
  QrStatus: () => QrStatus,
  default: () => QrModel_default
});
module.exports = __toCommonJS(QrModel_exports);
var import_mongoose2 = require("mongoose");

// _src/helpers/schema/index.ts
var import_joi = __toESM(require("joi"));
var import_mongoose = require("mongoose");
var ToObject = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id.toString(), ...rest };
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
var QrContentSchema = new import_mongoose2.Schema(
  {
    type: { type: String, enum: Object.values(QrContentType), required: true },
    refId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrLocationSchema = new import_mongoose2.Schema(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new import_mongoose2.Schema(
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
var QrModel = import_mongoose2.models.Qr || (0, import_mongoose2.model)("Qr", QrSchema);
var QrModel_default = QrModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QrContentType,
  QrStatus
});
