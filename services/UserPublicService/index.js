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

// _src/models/ChallengeModel/index.ts
var import_mongoose2 = require("mongoose");

// _src/models/ChallengeModel/types.ts
var ChallengeStatus = /* @__PURE__ */ ((ChallengeStatus2) => {
  ChallengeStatus2["Draft"] = "draft";
  ChallengeStatus2["Publish"] = "publish";
  return ChallengeStatus2;
})(ChallengeStatus || {});
var ChallengeType = /* @__PURE__ */ ((ChallengeType2) => {
  ChallengeType2["Trivia"] = "trivia";
  return ChallengeType2;
})(ChallengeType || {});

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

// _src/models/ChallengeModel/index.ts
var ChallengeFeedbackSchema = new import_mongoose2.Schema(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsSchema = new import_mongoose2.Schema(
  {
    type: { type: String, enum: Object.values(ChallengeType), required: true },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: ChallengeFeedbackSchema }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsForeignSchema = new import_mongoose2.Schema(
  {
    type: {
      type: String,
      enum: Object.values(ChallengeType),
      required: true
    },
    duration: { type: Number }
  },
  { _id: false }
);
var ChallengeForeignSchema = new import_mongoose2.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    order: { type: Number, default: null }
  },
  { _id: false }
);
var ChallengeSchema = new import_mongoose2.Schema(
  {
    name: { type: String, required: true },
    stage: { type: IdNameSchema, default: null },
    storyline: { type: [String] },
    status: {
      type: String,
      enum: Object.values(ChallengeStatus),
      default: "draft" /* Draft */
    },
    order: { type: Number, default: null },
    settings: { type: ChallengeSettingsSchema, default: null },
    contents: { type: [String] },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
ChallengeSchema.set("toJSON", ToObject);
ChallengeSchema.set("toObject", ToObject);
var ChallengeModel = import_mongoose2.models.Challenge || (0, import_mongoose2.model)("Challenge", ChallengeSchema);

// _src/models/QrModel/index.ts
var import_mongoose3 = require("mongoose");

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
var QrContentSchema = new import_mongoose3.Schema(
  {
    type: { type: String, enum: Object.values(QrContentType), required: true },
    refId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrLocationSchema = new import_mongoose3.Schema(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new import_mongoose3.Schema(
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
var QrModel = import_mongoose3.models.Qr || (0, import_mongoose3.model)("Qr", QrSchema);

// _src/models/StageModel/types.ts
var StageStatus = /* @__PURE__ */ ((StageStatus2) => {
  StageStatus2["Draft"] = "draft";
  StageStatus2["Publish"] = "publish";
  return StageStatus2;
})(StageStatus || {});

// _src/models/StageModel/index.ts
var import_mongoose4 = require("mongoose");
var StageSettingsSchema = new import_mongoose4.Schema(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new import_mongoose4.Schema(
  {
    periode: { type: PeriodSchema, required: true }
  },
  { _id: false }
);
var StageForeignSchema = new import_mongoose4.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true }
  },
  { _id: false }
);
var StageSchema = new import_mongoose4.Schema(
  {
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    status: {
      type: String,
      enum: Object.values(StageStatus),
      default: "draft" /* Draft */
    },
    settings: { type: StageSettingsSchema, required: true },
    contents: { type: [String], default: [] },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
StageSchema.set("toObject", ToObject);
StageSchema.set("toJSON", ToObject);
var StageModel = import_mongoose4.models.Stage || (0, import_mongoose4.model)("Stage", StageSchema);

// _src/models/TriviaModel/index.ts
var import_mongoose5 = require("mongoose");
var TriviaOptionSchema = new import_mongoose5.Schema(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 }
  },
  { _id: false, versionKey: false }
);
var TriviaForeignOptionSchema = new import_mongoose5.Schema(
  {
    text: { type: String, required: true }
  },
  { _id: false }
);
var TriviaForeignSchema = new import_mongoose5.Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    allowMultiple: { type: Boolean, required: true },
    options: { type: [TriviaForeignOptionSchema], required: true }
  },
  { _id: false }
);
var TriviaSchema = new import_mongoose5.Schema(
  {
    challenge: { type: IdNameSchema, default: null },
    question: { type: String, required: true },
    feedback: { type: ChallengeFeedbackSchema, default: {} },
    allowMultiple: { type: Boolean, default: false },
    options: { type: [TriviaOptionSchema], required: true },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
TriviaSchema.set("toObject", ToObject);
TriviaSchema.set("toJSON", ToObject);
var TriviaModel = import_mongoose5.models.Trivia || (0, import_mongoose5.model)("Trivia", TriviaSchema);

// _src/models/UserModel/index.ts
var import_mongoose6 = require("mongoose");

// _src/models/UserModel/types.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Admin"] = "admin";
  UserRole2["Private"] = "private";
  UserRole2["Public"] = "public";
  return UserRole2;
})(UserRole || {});

// _src/models/UserModel/index.ts
var ToObject2 = {
  transform: (doc, ret) => {
    const { _id, __v, password, ...rest } = ret;
    return { id: _id, ...rest };
  }
};
var UserForeignSchema = new import_mongoose6.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" }
  },
  { _id: false }
);
var UserSchema = new import_mongoose6.Schema(
  {
    name: { type: String, default: "" },
    role: { type: String, enum: Object.values(UserRole) },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);
UserSchema.set("toJSON", ToObject2);
UserSchema.set("toObject", ToObject2);
var UserModel = import_mongoose6.models.User || (0, import_mongoose6.model)("User", UserSchema);
var UserModel_default = UserModel;

// _src/models/UserChallengeModel/index.ts
var import_mongoose9 = require("mongoose");

// _src/models/UserChallengeModel/types.ts
var UserChallengeStatus = /* @__PURE__ */ ((UserChallengeStatus2) => {
  UserChallengeStatus2["Undiscovered"] = "undiscovered";
  UserChallengeStatus2["Discovered"] = "discovered";
  UserChallengeStatus2["OnGoing"] = "ongoing";
  UserChallengeStatus2["Completed"] = "completed";
  UserChallengeStatus2["Failed"] = "failed";
  return UserChallengeStatus2;
})(UserChallengeStatus || {});

// _src/models/UserPublicModel/index.ts
var import_mongoose7 = require("mongoose");

// _src/models/UserPublicModel/types.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

// _src/models/UserPublicModel/index.ts
var UserPublicForeignSchema = new import_mongoose7.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new import_mongoose7.Schema(
  {
    user: { type: UserForeignSchema, default: null },
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
var UserPublicModel = import_mongoose7.models.UserPublic || (0, import_mongoose7.model)("UserPublic", UserPublicSchema, "usersPublic");
var UserPublicModel_default = UserPublicModel;

// _src/models/UserStageModel/index.ts
var import_mongoose8 = require("mongoose");

// _src/models/UserStageModel/types.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/UserStageModel/index.ts
var UserStageForeignSchema = new import_mongoose8.Schema(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserStageResultSchema = new import_mongoose8.Schema(
  {
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true },
    totalScore: { type: Number, required: true }
  },
  { _id: false }
);
var UserStageSchema = new import_mongoose8.Schema(
  {
    stage: { type: StageForeignSchema, required: true },
    userPublic: { type: UserPublicForeignSchema, required: true },
    status: {
      type: String,
      enum: Object.values(UserStageStatus),
      default: "ongoing" /* OnGoing */
    },
    results: { type: UserStageResultSchema, default: null },
    contents: { type: [String], default: [] }
  },
  { timestamps: true }
);
UserStageSchema.set("toJSON", ToObject);
UserStageSchema.set("toObject", ToObject);
var UserStageModel = import_mongoose8.models.UserStage || (0, import_mongoose8.model)("UserStage", UserStageSchema, "usersStage");

// _src/models/UserChallengeModel/index.ts
var UserChallengeForeignSchema = new import_mongoose9.Schema(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserChallengeResultSchema = new import_mongoose9.Schema(
  {
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true },
    correctBonus: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    totalScore: { type: Number, required: true },
    startAt: { type: Date, default: Date.now() },
    endAt: { type: Date, default: null },
    timeUsed: { type: Number, required: true }
  },
  { _id: false }
);
var UserChallengeSchema = new import_mongoose9.Schema(
  {
    userStage: { type: UserStageForeignSchema, default: null },
    challenge: { type: ChallengeForeignSchema, required: true },
    settings: { type: ChallengeSettingsForeignSchema, required: true },
    userPublic: { type: UserPublicForeignSchema, required: true },
    status: {
      type: String,
      enum: Object.values(UserChallengeStatus),
      default: "undiscovered" /* Undiscovered */
    },
    contents: { type: [String], default: [] },
    results: { type: UserChallengeResultSchema, default: null },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
UserChallengeSchema.set("toJSON", ToObject);
UserChallengeSchema.set("toObject", ToObject);
var UserChallengeModel = import_mongoose9.models.UserChallenge || (0, import_mongoose9.model)("UserChallenge", UserChallengeSchema, "usersChallenge");

// _src/models/UserTriviaModel/index.ts
var import_mongoose10 = require("mongoose");
var ToObject3 = {
  transform: (doc, ret) => {
    const { _id, __v, userPublic, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};
var UserTriviaResultSchema = new import_mongoose10.Schema(
  {
    answer: { type: String, default: null },
    feedback: { type: String, default: "" },
    isCorrect: { type: Boolean, required: true },
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true }
  },
  { _id: false }
);
var UserTriviaSchema = new import_mongoose10.Schema(
  {
    userPublic: { type: UserPublicForeignSchema, required: true },
    userChallenge: { type: UserChallengeForeignSchema, required: true },
    trivia: { type: TriviaForeignSchema, required: true },
    results: { type: UserTriviaResultSchema, default: null }
  },
  { timestamps: true }
);
UserTriviaSchema.set("toJSON", ToObject3);
UserTriviaSchema.set("toObject", ToObject3);
var UserTriviaModel = import_mongoose10.models.UserTrivia || (0, import_mongoose10.model)("UserTrivia", UserTriviaSchema, "usersTrivia");

// _src/services/UserPublicService/index.ts
var verify = async (value) => {
  const userPublic = await UserPublicModel_default.findOneAndUpdate(
    {
      $or: [{ "user.id": value }, { code: value }],
      deletedAt: null
    },
    { lastAccessedAt: /* @__PURE__ */ new Date() }
  );
  if (!userPublic) throw new Error("invalid user");
  return userPublic.toObject();
};
var setup = async (userId) => {
  const timestamp = Date.now();
  const salt = import_crypto_js.lib.WordArray.random(4).toString(import_crypto_js.enc.Hex);
  const code = (0, import_crypto_js.SHA256)(`${timestamp}${salt}`).toString(import_crypto_js.enc.Hex);
  const payload = { code };
  if (userId) {
    const userPublic = await UserPublicModel_default.findOne({
      "user.id": userId,
      deletedAt: null
    });
    if (userPublic) return userPublic.toObject();
    const user2 = await UserModel_default.findOne({ _id: userId, deletedAt: null });
    if (user2) payload.user = { id: user2.id, name: user2.name };
  }
  const user = await UserPublicModel_default.create(payload);
  return user.toObject();
};
var UserPublicService = { verify, setup };
var UserPublicService_default = UserPublicService;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setup,
  verify
});
