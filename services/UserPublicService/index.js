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

// _src/services/UserPublicService/index.ts
var UserPublicService_exports = {};
__export(UserPublicService_exports, {
  default: () => UserPublicService_default,
  setup: () => setup,
  verify: () => verify
});
module.exports = __toCommonJS(UserPublicService_exports);
var import_crypto_js = require("crypto-js");

// _src/models/UserPublicModel/index.ts
var import_mongoose2 = require("mongoose");

// _src/models/UserPublicModel/types.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

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

// _src/models/UserPublicModel/index.ts
var UserPublicForeignSchema = new import_mongoose2.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new import_mongoose2.Schema(
  {
    user: { type: IdNameSchema, default: null },
    code: { type: String, required: true },
    name: { type: String, default: "" },
    dob: { type: Date, default: null },
    gender: {
      type: String,
      enum: Object.values(UserPublicGender),
      default: null
    },
    phone: { type: String, default: "" },
    lastAccessedAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
UserPublicSchema.set("toJSON", ToObject);
UserPublicSchema.set("toObject", ToObject);
var UserPublicModel = import_mongoose2.models.UserPublic || (0, import_mongoose2.model)("UserPublic", UserPublicSchema, "usersPublic");
var UserPublicModel_default = UserPublicModel;

// _src/services/UserPublicService/index.ts
var verify = async (code) => {
  const user = await UserPublicModel_default.findOne({ code, deletedAt: null });
  if (!user) throw new Error("code invalid");
  user.lastAccessedAt = /* @__PURE__ */ new Date();
  await user.save();
  return user.toObject();
};
var setup = async () => {
  const timestamp = Date.now();
  const salt = import_crypto_js.lib.WordArray.random(4).toString(import_crypto_js.enc.Hex);
  const code = (0, import_crypto_js.SHA256)(`${timestamp}${salt}`).toString(import_crypto_js.enc.Hex);
  return await UserPublicModel_default.create({ code });
};
var UserPublicService = { verify, setup };
var UserPublicService_default = UserPublicService;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setup,
  verify
});
