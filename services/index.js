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

// _src/services/index.ts
var services_exports = {};
__export(services_exports, {
  ChallengeService: () => ChallengeService_default,
  PhotoHuntService: () => PhotoHuntService_default,
  QrService: () => QrService_default,
  StageService: () => StageService_default,
  TriviaService: () => TriviaService_default,
  UserChallengeService: () => UserChallengeService_default,
  UserPhotoHuntService: () => UserPhotoHuntService_default,
  UserPublicService: () => UserPublicService_default,
  UserService: () => UserService_default,
  UserStageService: () => UserStageService_default,
  UserTriviaService: () => UserTriviaService_default,
  default: () => services_default
});
module.exports = __toCommonJS(services_exports);

// _src/helpers/common/index.ts
var import_deepmerge = __toESM(require("deepmerge"));

// _src/helpers/db/index.ts
var import_mongoose = require("mongoose");
var transaction = async (operation) => {
  const session = await (0, import_mongoose.startSession)();
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

// _src/helpers/model/index.ts
var import_mongoose2 = require("mongoose");
var IdNameSchema = new import_mongoose2.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var PeriodSchema = new import_mongoose2.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);
var FeedbackSchema = new import_mongoose2.Schema(
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

// _src/helpers/qrcode/index.ts
var import_browser = require("@zxing/browser");

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
    import_joi.default.array().items(item)
  );
  if (options?.required) v = v.min(1);
  if (options?.defaultValue) v.default(options.defaultValue);
  if (options?.allow) v.allow(options.allow);
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

// _src/helpers/service/index.ts
var list = async (model12, page, limit, filters = {}, sort) => {
  const skip = (page - 1) * limit;
  const filter = {
    ...filters,
    deletedAt: null
  };
  const items = await model12.find(filter).skip(skip).limit(limit).sort(sort ?? { createdAt: -1 });
  const totalItems = await model12.countDocuments(filter);
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

// _src/helpers/types/index.ts
var PublishingStatusValues = {
  Draft: "draft",
  Publish: "publish"
};

// _src/models/ChallengeModel/index.ts
var import_mongoose3 = require("mongoose");

// _src/models/ChallengeModel/types.ts
var ChallengeStatusValues = PublishingStatusValues;
var ChallengeTypeValues = {
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};

// _src/models/ChallengeModel/index.ts
var ChallengeSettingsSchema = new import_mongoose3.Schema(
  {
    type: {
      type: String,
      enum: Object.values(ChallengeTypeValues),
      required: true
    },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: FeedbackSchema }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsForeignSchema = new import_mongoose3.Schema(
  {
    type: {
      type: String,
      enum: Object.values(ChallengeTypeValues),
      required: true
    },
    duration: { type: Number }
  },
  { _id: false }
);
var ChallengeForeignSchema = new import_mongoose3.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    order: { type: Number, default: null }
  },
  { _id: false }
);
var ChallengeSchema = new import_mongoose3.Schema(
  {
    name: { type: String, required: true },
    stage: { type: IdNameSchema, default: null },
    storyline: { type: [String] },
    status: {
      type: String,
      enum: Object.values(ChallengeStatusValues),
      default: ChallengeStatusValues.Draft
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
var ChallengeModel = import_mongoose3.models.Challenge || (0, import_mongoose3.model)("Challenge", ChallengeSchema);
var ChallengeModel_default = ChallengeModel;

// _src/models/StageModel/types.ts
var StageStatusValues = PublishingStatusValues;

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
      enum: Object.values(StageStatusValues),
      default: StageStatusValues.Draft
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
var StageModel_default = StageModel;

// _src/services/StageService/index.ts
var isUsed = async (ids, id) => {
  const filter = {
    _id: { $in: ids },
    deletedAt: null,
    stage: { $ne: null }
  };
  if (id) filter["stage.id"] = { $ne: id };
  const used = (await ChallengeModel_default.find(filter)).map((item) => item.id);
  if (used.length)
    throw new Error(
      `challenge${used.length > 1 ? "s" : ""} ${used.join(", ")} ${used.length > 1 ? "are" : "is"} used`
    );
};
var list2 = async (params) => {
  const skip = (params.page - 1) * params.limit;
  const filter = {
    deletedAt: null,
    name: { $regex: params.search, $options: "i" }
  };
  const items = await StageModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await StageModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages
  };
};
var create = async (payload) => {
  await isUsed(payload.contents);
  const contents = await ChallengeModel_default.find({ _id: { $in: payload.contents } });
  const stage = await StageModel_default.create({
    ...payload,
    contents: contents.map((item) => item.id)
  });
  const sync3 = contents.map((item) => {
    item.stage = { id: stage.id, name: stage.name };
    return item.save();
  });
  await Promise.all(sync3);
  return stage.toObject();
};
var detail = async (id) => {
  const item = await StageModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  return item.toObject();
};
var update = async (id, payload) => {
  return await db_default.transaction(async (session) => {
    await isUsed(payload.contents, id);
    const stage = await StageModel_default.findOne({ _id: id, deletedAt: null });
    if (!stage) throw new Error("stage not found");
    const contents = (await ChallengeModel_default.find({ _id: { $in: payload.contents }, deletedAt: null })).map((item) => item.id);
    await ChallengeModel_default.updateMany(
      { "stage.id": stage.id },
      { $set: { stage: null } },
      { session }
    );
    await ChallengeModel_default.updateMany(
      { _id: { $in: contents } },
      { $set: { stage: { id: stage.id, name: stage.name } } },
      { session }
    );
    Object.assign(stage, { ...payload, contents });
    await stage.save({ session });
    return stage.toObject();
  });
};
var _delete = async (id) => {
  const item = await StageModel_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } }
  );
  if (!item) throw new Error("stage not found");
  return item;
};
var verify = async (id) => {
  const item = await StageModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  if (item.status !== StageStatusValues.Publish)
    throw new Error("stage not published yet");
  return item.toObject();
};
var StageService = { list: list2, create, detail, update, delete: _delete, verify };
var StageService_default = StageService;

// _src/services/ChallengeService/index.ts
var list3 = async (params) => {
  const skip = (params.page - 1) * params.limit;
  const filter = { deletedAt: null };
  if (params.stageId === "null") filter["stage"] = null;
  else if (params.stageId) filter["stage.id"] = params.stageId;
  if (params.type) filter["settings.type"] = params.type;
  const list8 = await ChallengeModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await ChallengeModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: list8.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages
  };
};
var create2 = async (payload) => {
  return db_default.transaction(async (session) => {
    const { stageId, ...value } = payload;
    const stageData = stageId ? await StageService_default.detail(stageId) : null;
    const stage = stageData ? { id: stageData.id, name: stageData.name } : null;
    const [item] = await ChallengeModel_default.create([value], { session });
    if (stage) {
      const contents = stageData?.contents || [];
      contents.push(item.id);
      item.order = contents.length;
      await Promise.all([
        StageModel_default.findOneAndUpdate(
          { _id: stageId },
          { $set: { contents } },
          { session }
        ),
        item.save({ session })
      ]);
    }
    return item.toObject();
  });
};
var detail2 = async (id) => {
  const item = await ChallengeModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var update2 = async (id, payload) => {
  return await db_default.transaction(async (session) => {
    const { stageId, ...value } = payload;
    const item = await ChallengeModel_default.findOne({ _id: id, deletedAt: null });
    if (!item) throw new Error("challenge not found");
    const newStage = stageId ? await StageService_default.detail(stageId) : null;
    const oldStage = item.stage?.id ? await StageService_default.detail(item.stage.id) : null;
    const newContent = newStage?.contents || [];
    const oldContent = oldStage?.contents || [];
    if (!newContent.includes(id)) newContent.push(id);
    if (oldContent.includes(id)) oldContent.splice(oldContent.indexOf(id), 1);
    await StageModel_default.findOneAndUpdate(
      { _id: newStage?.id },
      { $set: { contents: newContent } },
      { session }
    );
    await StageModel_default.findOneAndUpdate(
      { _id: oldStage?.id },
      { $set: { contents: oldContent } },
      { session }
    );
    const stage = newStage ? { id: newStage.id, name: newStage.name } : null;
    Object.assign(item, value, { stage });
    await item.save({ session });
    return item.toObject();
  });
};
var updateContent = async (id, contents) => {
  const item = await ChallengeModel_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { contents } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var _delete2 = async (id) => {
  const item = await ChallengeModel_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var verify2 = async (id) => {
  const item = await ChallengeModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  if (item.status !== ChallengeStatusValues.Publish)
    throw new Error("challenge not published yet");
  return item.toObject();
};
var ChallengeService = {
  list: list3,
  create: create2,
  detail: detail2,
  // detailContent,
  update: update2,
  updateContent,
  delete: _delete2,
  verify: verify2
};
var ChallengeService_default = ChallengeService;

// _src/models/PhotoHuntModel/index.ts
var import_mongoose6 = require("mongoose");

// _src/models/PhotoHuntModel/types.ts
var PhotoHuntStatusValues = PublishingStatusValues;

// _src/models/QrModel/index.ts
var import_mongoose5 = require("mongoose");

// _src/models/QrModel/types.ts
var QrStatusValues = PublishingStatusValues;
var QrContentTypeValues = {
  Stage: "stage",
  Challenge: "challenge",
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};

// _src/models/QrModel/index.ts
var QrForeignSchema = new import_mongoose5.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrContentSchema = new import_mongoose5.Schema(
  {
    type: {
      type: String,
      enum: Object.values(QrContentTypeValues),
      required: true
    },
    refId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrLocationSchema = new import_mongoose5.Schema(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new import_mongoose5.Schema(
  {
    code: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: Object.values(QrStatusValues),
      required: true
    },
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
var QrModel = import_mongoose5.models.Qr || (0, import_mongoose5.model)("Qr", QrSchema);
var QrModel_default = QrModel;

// _src/models/PhotoHuntModel/index.ts
var PhotoHuntForeignSchema = new import_mongoose6.Schema(
  {
    id: { type: String, required: true },
    hint: { type: String, required: true }
  },
  { _id: false }
);
var PhotoHuntSchema = new import_mongoose6.Schema(
  {
    hint: { type: String, default: "" },
    score: { type: Number, default: 0 },
    feedback: { type: String, default: "" },
    challenge: { type: IdNameSchema, default: null },
    status: {
      type: String,
      enum: Object.values(PhotoHuntStatusValues),
      default: PhotoHuntStatusValues.Draft
    },
    qr: { type: QrForeignSchema, default: null }
  },
  { timestamps: true }
);
PhotoHuntSchema.set("toObject", ToObject);
PhotoHuntSchema.set("toJSON", ToObject);
var PhotoHuntModel = import_mongoose6.models.PhotoHunt || (0, import_mongoose6.model)("PhotoHunt", PhotoHuntSchema, "photoHunts");
var PhotoHuntModel_default = PhotoHuntModel;

// _src/services/QrService/index.ts
var import_crypto_js2 = __toESM(require("crypto-js"));

// _src/models/UserStageModel/index.ts
var import_mongoose9 = require("mongoose");

// _src/models/UserStageModel/types.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/UserPublicModel/index.ts
var import_mongoose8 = require("mongoose");

// _src/models/UserPublicModel/types.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

// _src/models/UserModel/index.ts
var import_mongoose7 = require("mongoose");

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
var UserForeignSchema = new import_mongoose7.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" }
  },
  { _id: false }
);
var UserSchema = new import_mongoose7.Schema(
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
var UserModel = import_mongoose7.models.User || (0, import_mongoose7.model)("User", UserSchema);
var UserModel_default = UserModel;

// _src/models/UserPublicModel/index.ts
var UserPublicForeignSchema = new import_mongoose8.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new import_mongoose8.Schema(
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
var UserPublicModel = import_mongoose8.models.UserPublic || (0, import_mongoose8.model)("UserPublic", UserPublicSchema, "usersPublic");
var UserPublicModel_default = UserPublicModel;

// _src/models/UserStageModel/index.ts
var UserStageForeignSchema = new import_mongoose9.Schema(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserStageResultSchema = new import_mongoose9.Schema(
  {
    baseScore: { type: Number, required: true },
    challengeBonus: { type: Number, required: true },
    bonus: { type: Number, required: true },
    totalScore: { type: Number, required: true }
  },
  { _id: false }
);
var UserStageSchema = new import_mongoose9.Schema(
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
var UserStageModel = import_mongoose9.models.UserStage || (0, import_mongoose9.model)("UserStage", UserStageSchema, "usersStage");
var UserStageModel_default = UserStageModel;

// _src/services/UserChallengeService/index.ts
var import_dayjs = __toESM(require("dayjs"));

// _src/models/UserChallengeModel/index.ts
var import_mongoose10 = require("mongoose");

// _src/models/UserChallengeModel/types.ts
var UserChallengeStatusValues = {
  Undiscovered: "undiscovered",
  Discovered: "discovered",
  OnGoing: "ongoing",
  Completed: "completed",
  Failed: "failed"
};

// _src/models/UserChallengeModel/index.ts
var UserChallengeForeignSchema = new import_mongoose10.Schema(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserChallengeResultSchema = new import_mongoose10.Schema(
  {
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true },
    contentBonus: { type: Number, required: true },
    totalCorrect: { type: Number, required: true },
    totalScore: { type: Number, required: true },
    startAt: { type: Date, default: Date.now() },
    endAt: { type: Date, default: null },
    timeUsed: { type: Number, required: true }
  },
  { _id: false }
);
var UserChallengeSchema = new import_mongoose10.Schema(
  {
    userStage: { type: UserStageForeignSchema, default: null },
    challenge: { type: ChallengeForeignSchema, required: true },
    settings: { type: ChallengeSettingsForeignSchema, required: true },
    userPublic: { type: UserPublicForeignSchema, required: true },
    status: {
      type: String,
      enum: Object.values(UserChallengeStatusValues),
      default: UserChallengeStatusValues.Undiscovered
    },
    contents: { type: [String], default: [] },
    results: { type: UserChallengeResultSchema, default: null },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
UserChallengeSchema.set("toJSON", ToObject);
UserChallengeSchema.set("toObject", ToObject);
var UserChallengeModel = import_mongoose10.models.UserChallenge || (0, import_mongoose10.model)("UserChallenge", UserChallengeSchema, "usersChallenge");
var UserChallengeModel_default = UserChallengeModel;

// _src/services/UserPublicService/index.ts
var import_crypto_js = require("crypto-js");

// _src/models/TriviaModel/index.ts
var import_mongoose11 = require("mongoose");
var TriviaOptionSchema = new import_mongoose11.Schema(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 }
  },
  { _id: false, versionKey: false }
);
var TriviaForeignOptionSchema = new import_mongoose11.Schema(
  {
    text: { type: String, required: true }
  },
  { _id: false }
);
var TriviaForeignSchema = new import_mongoose11.Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    allowMultiple: { type: Boolean, required: true },
    options: { type: [TriviaForeignOptionSchema], required: true }
  },
  { _id: false }
);
var TriviaSchema = new import_mongoose11.Schema(
  {
    challenge: { type: IdNameSchema, default: null },
    question: { type: String, required: true },
    feedback: { type: FeedbackSchema, default: {} },
    allowMultiple: { type: Boolean, default: false },
    options: { type: [TriviaOptionSchema], required: true },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
TriviaSchema.set("toObject", ToObject);
TriviaSchema.set("toJSON", ToObject);
var TriviaModel = import_mongoose11.models.Trivia || (0, import_mongoose11.model)("Trivia", TriviaSchema);
var TriviaModel_default = TriviaModel;

// _src/models/UserTriviaModel/index.ts
var import_mongoose12 = require("mongoose");
var ToObject3 = {
  transform: (doc, ret) => {
    const { _id, __v, userPublic, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};
var UserTriviaResultSchema = new import_mongoose12.Schema(
  {
    answer: { type: String, default: null },
    feedback: { type: String, default: null },
    isCorrect: { type: Boolean, required: true },
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true }
  },
  { _id: false }
);
var UserTriviaSchema = new import_mongoose12.Schema(
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
var UserTriviaModel = import_mongoose12.models.UserTrivia || (0, import_mongoose12.model)("UserTrivia", UserTriviaSchema, "usersTrivia");
var UserTriviaModel_default = UserTriviaModel;

// _src/services/UserPublicService/index.ts
var verify3 = async (value) => {
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
var UserPublicService = { verify: verify3, setup };
var UserPublicService_default = UserPublicService;

// _src/validators/ChallengeValidator/index.ts
var import_joi3 = __toESM(require("joi"));

// _src/helpers/validator/index.ts
var import_joi2 = __toESM(require("joi"));
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

// _src/validators/ChallengeValidator/index.ts
var ChallengeListParamsValidator = schema_default.generate({
  ...DefaultListParamsFields,
  type: schema_default.string().valid(...Object.values(ChallengeTypeValues)),
  stageId: schema_default.string().allow(null, "")
});
var ChallengeSettingsValidator = schema_default.generate({
  clue: schema_default.string({ defaultValue: "" }),
  duration: schema_default.number({ defaultValue: 0 }),
  type: schema_default.string({ required: true }).valid(...Object.values(ChallengeTypeValues)),
  feedback: FeedbackValidator
});
var ChallengeForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  order: schema_default.number({ defaultValue: null }),
  storyline: schema_default.array(import_joi3.default.string(), { defaultValue: [] })
});
var ChallengeSettingsForeignValidator = schema_default.generate({
  duration: schema_default.number({ allow: 0 }),
  type: schema_default.string({ required: true }).valid(...Object.values(ChallengeTypeValues))
});
var ChallengePayloadValidator = schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(schema_default.string()).default([]),
  stageId: schema_default.string().allow(null, ""),
  status: schema_default.string({ required: true, defaultValue: ChallengeStatusValues.Draft }).valid(...Object.values(ChallengeStatusValues)),
  settings: ChallengeSettingsValidator.required()
});

// _src/validators/UserPublicValidator/index.ts
var UserPublicForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  code: schema_default.string({ required: true }),
  name: schema_default.string({ required: true, allow: "" })
});

// _src/validators/TriviaValidator/index.ts
var TriviaOptionValidator = schema_default.generate({
  isCorrect: schema_default.boolean({ defaultValue: false }),
  point: schema_default.number({ defaultValue: 0 }),
  text: schema_default.string({ required: true })
});
var TriviaOptionsValidator = schema_default.array(TriviaOptionValidator, {
  required: true
}).custom((value, helpers) => {
  const hasCorrect = value.some((option) => option.isCorrect === true);
  return hasCorrect ? value : helpers.error("array.hasCorrect");
}).messages({
  "array.hasCorrect": "{#label} at least one option must have `isCorrect` set to true."
});
var TriviaPayloadValidator = schema_default.generate({
  id: schema_default.string(),
  question: schema_default.string({ required: true }),
  feedback: FeedbackValidator,
  allowMultiple: schema_default.boolean({ defaultValue: false }),
  options: TriviaOptionsValidator
});
var TriviaItemsPayloadValidator = schema_default.array(
  TriviaPayloadValidator,
  {
    required: true
  }
);
var TriviaForeignOptionValidator = schema_default.generate({
  text: schema_default.string({ required: true })
});
var TriviaForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  question: schema_default.string({ required: true }),
  allowMultiple: schema_default.boolean({ required: true }),
  options: schema_default.array(TriviaForeignOptionValidator, { required: true })
});

// _src/services/TriviaService/index.ts
var createMany = async (challenge, payload, session) => {
  if (payload.length === 0) return [];
  const items = payload.map((item, i) => ({
    ...item,
    challenge
  }));
  return await TriviaModel_default.insertMany(items, { session });
};
var updateMany = async (challenge, payload, session) => {
  if (payload.length === 0) return [];
  const ids = payload.map(({ id }) => id);
  const res = await TriviaModel_default.bulkWrite(
    payload.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.id },
          update: {
            $set: {
              ...item,
              challenge
            }
          }
        }
      };
    }),
    { session }
  );
  if (res.modifiedCount !== payload.length)
    throw new Error("trivia.sync.update_error");
  return await TriviaModel_default.find({ _id: { $in: ids } });
};
var detail3 = async (id) => {
  const item = await TriviaModel_default.findOne({ _id: id });
  if (!item) throw new Error("trivia not found");
  return item;
};
var details = async (challengeId) => {
  const challenge = await ChallengeService_default.detail(challengeId);
  if (challenge.settings.type !== ChallengeTypeValues.Trivia)
    throw new Error("challenge.not_trivia_type_error");
  const items = await TriviaModel_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};
var sync = async (challengeId, payload) => {
  return await db_default.transaction(async (session) => {
    await TriviaModel_default.updateMany(
      { "challenge.id": challengeId },
      { $set: { challenge: null } },
      { session }
    );
    if (payload.length === 0) return [];
    const challenge = await ChallengeService_default.detail(challengeId);
    if (challenge.settings.type !== ChallengeTypeValues.Trivia)
      throw new Error("challenge.not_trivia_type_error");
    const challengeForeign = { id: challenge.id, name: challenge.name };
    const { create: itemsCreate, update: itemsUpdate } = payload.reduce(
      (acc, cur) => {
        acc[cur.id ? "update" : "create"].push(cur);
        return acc;
      },
      { create: [], update: [] }
    );
    const itemsCreated = await createMany(
      challengeForeign,
      itemsCreate,
      session
    );
    const itemsUpdated = await updateMany(
      challengeForeign,
      itemsUpdate,
      session
    );
    const items = [...itemsCreated, ...itemsUpdated].map(
      (item) => item.toObject()
    );
    await ChallengeService_default.updateContent(
      challengeId,
      items.map(({ id }) => id)
    );
    return items;
  });
};
var verify4 = async (id) => {
};
var TriviaService = { detail: detail3, details, sync, verify: verify4 };
var TriviaService_default = TriviaService;

// _src/services/UserTriviaService/index.ts
var verify5 = async (triviaId, TID) => {
  const item = await UserTriviaModel_default.findOne({
    "userPublic.code": TID,
    "trivia.id": triviaId,
    deletedAt: null
  });
  if (!item) throw new Error("user trivia not found");
  return item;
};
var setup2 = async (userPublic, userChallenge) => {
  const trivias = await details(userChallenge.challengeId);
  const payload = trivias.map(async (item) => {
    const trivia = await TriviaForeignValidator.validateAsync(item, {
      stripUnknown: true
    });
    const userTrivia = await verify5(trivia.id, userPublic.code).catch(
      () => null
    );
    if (userTrivia) return userTrivia;
    return await UserTriviaModel_default.create({
      userPublic,
      userChallenge,
      trivia
    });
  });
  const items = await Promise.all(payload);
  return items.map((item) => item.toObject().id);
};
var details2 = async (ids, TID, hasResult) => {
  const filter = {};
  if (hasResult !== void 0)
    filter.results = hasResult ? { $ne: null } : null;
  const data = await UserTriviaModel_default.find({
    ...filter,
    _id: { $in: ids },
    "userPublic.code": TID
  });
  return data.map((item) => item.toObject());
};
var submit = async (id, TID, answer = null, bonus) => {
  const userTrivia = await UserTriviaModel_default.findOne({
    _id: id,
    "userPublic.code": TID
  });
  if (!userTrivia) throw new Error("user trivia not found");
  if (userTrivia.results) return userTrivia.toObject();
  const trivia = await detail3(userTrivia.trivia.id);
  const selectedAnswer = trivia.options.find((v) => v.text == answer);
  const isCorrect = Boolean(selectedAnswer?.isCorrect);
  const baseScore = selectedAnswer?.point || 0;
  const results = {
    answer,
    feedback: trivia.feedback[isCorrect ? "positive" : "negative"],
    isCorrect,
    baseScore,
    bonus: bonus || 0,
    totalScore: baseScore + (bonus || 0)
  };
  userTrivia.results = results;
  await userTrivia.save();
  return userTrivia.toObject();
};
var submitEmpties = async (userChallengeId, TID) => {
  const results = {
    answer: null,
    feedback: null,
    isCorrect: false,
    baseScore: 0,
    bonus: 0,
    totalScore: 0
  };
  return await UserTriviaModel_default.updateMany(
    {
      "userChallenge.id": userChallengeId,
      "userPublic.code": TID,
      results: null
    },
    { $set: { results } }
  );
};
var summary = async (userChallengeId, TID) => {
  const [summary4] = await UserTriviaModel_default.aggregate().match({
    "userChallenge.id": userChallengeId,
    "userPublic.code": TID
  }).group({
    _id: {
      userChallenge: "$userChallenge.id",
      userPublic: "$userPublic.code"
    },
    userPublic: { $first: "$userPublic" },
    userChallenge: { $first: "$userChallenge" },
    totalCorrect: {
      $sum: {
        $cond: {
          if: { $eq: ["$results.isCorrect", true] },
          then: 1,
          else: 0
        }
      }
    },
    totalBaseScore: { $sum: "$results.baseScore" },
    totalBonus: { $sum: "$results.bonus" },
    totalScore: { $sum: "$results.totalScore" }
  }).addFields({ type: ChallengeTypeValues.Trivia });
  return summary4;
};
var UserTriviaService = {
  setup: setup2,
  details: details2,
  submit,
  submitEmpties,
  summary
};
var UserTriviaService_default = UserTriviaService;

// _src/models/UserPhotoHuntModel/index.ts
var import_mongoose13 = require("mongoose");
var UserPhotoHuntResultSchema = new import_mongoose13.Schema(
  {
    feedback: { type: String, default: null },
    foundAt: { type: Date, default: Date.now() },
    score: { type: Number, default: 0 }
  },
  { _id: false }
);
var UserPhotoHuntSchema = new import_mongoose13.Schema({
  photoHunt: { type: PhotoHuntForeignSchema, required: true },
  results: { type: UserPhotoHuntResultSchema, default: null },
  userChallenge: { type: UserChallengeForeignSchema, required: true },
  userPublic: { type: UserPublicForeignSchema, required: true }
});
UserPhotoHuntSchema.set("toObject", ToObject);
UserPhotoHuntSchema.set("toJSON", ToObject);
var UserPhotoHuntModel = import_mongoose13.models.UserPhotoHunt || (0, import_mongoose13.model)("UserPhotoHunt", UserPhotoHuntSchema, "usersPhotoHunt");
var UserPhotoHuntModel_default = UserPhotoHuntModel;

// _src/services/UserPhotoHuntService/index.ts
var setup3 = async (userPublic, userChallenge) => {
  const items = await details3(userChallenge.challengeId);
  const payload = items.map(({ id, hint }) => {
    return {
      userPublic,
      userChallenge,
      photoHunt: { id, hint }
    };
  });
  const created = await UserPhotoHuntModel_default.insertMany(payload);
  return created.map((item) => item._id.toString());
};
var details4 = async (ids, TID, hasResult) => {
  const filter = {};
  if (hasResult !== void 0)
    filter.results = hasResult ? { $ne: null } : null;
  const data = await UserPhotoHuntModel_default.find({
    ...filter,
    _id: { $in: ids },
    "userPublic.code": TID
  });
  return data.map((item) => item.toObject());
};
var submit2 = async (id, TID, isFound, bonus) => {
  const userPhotoHunt = await UserPhotoHuntModel_default.findOne({
    _id: id,
    "userPublic.code": TID
  });
  if (!userPhotoHunt) throw new Error("user photo hunt not found");
  if (userPhotoHunt.results) return userPhotoHunt.toObject();
  const photoHunt = await detail4(userPhotoHunt.photoHunt.id);
  const results = {
    score: isFound ? photoHunt.score : 0,
    foundAt: /* @__PURE__ */ new Date(),
    feedback: isFound ? photoHunt.feedback : null
  };
  userPhotoHunt.results = results;
  await userPhotoHunt.save();
  return userPhotoHunt.toObject();
};
var submitEmpties2 = async (userChallengeId, TID) => {
  const results = {
    feedback: null,
    foundAt: null,
    score: 0
  };
  return await UserPhotoHuntModel_default.updateMany(
    {
      "userChallenge.id": userChallengeId,
      "userPublic.code": TID,
      results: null
    },
    { $set: { results } }
  );
};
var summary2 = async (userChallengeId, TID) => {
  const [summary4] = await UserPhotoHuntModel_default.aggregate().match({
    "userChallenge.id": userChallengeId,
    "userPublic.code": TID
  }).group({
    _id: {
      userChallenge: "$userChallenge.id",
      userPublic: "$userPublic.code"
    },
    userPublic: { $first: "$userPublic" },
    userChallenge: { $first: "$userChallenge" },
    totalFound: {
      $sum: {
        $cond: {
          if: { $eq: ["$results.isCorrect", true] },
          then: 1,
          else: 0
        }
      }
    },
    totalScore: { $sum: "$results.score" }
  }).addFields({ type: ChallengeTypeValues.PhotoHunt });
  return summary4;
};
var UserPhotoHuntService = {
  setup: setup3,
  details: details4,
  submit: submit2,
  submitEmpties: submitEmpties2,
  summary: summary2
};
var UserPhotoHuntService_default = UserPhotoHuntService;

// _src/services/UserChallengeService/index.ts
var services = {
  [ChallengeTypeValues.PhotoHunt]: {
    setup: setup2,
    details: details2,
    submitEmpties,
    summary
  },
  [ChallengeTypeValues.Trivia]: {
    setup: setup3,
    details: details4,
    submitEmpties: submitEmpties2,
    summary: summary2
  }
};
var initResult = () => {
  return {
    baseScore: 0,
    bonus: 0,
    timeUsed: 0,
    totalScore: 0,
    contentBonus: 0,
    totalCorrect: 0,
    startAt: /* @__PURE__ */ new Date(),
    endAt: null
  };
};
var verify6 = async (challengeId, TID, setDiscover) => {
  const item = await UserChallengeModel_default.findOne({
    "userPublic.code": TID,
    "challenge.id": challengeId,
    deletedAt: null
  });
  if (!item) return null;
  if (setDiscover)
    await UserChallengeModel_default.updateOne(
      { _id: item.id },
      { $set: { status: UserChallengeStatusValues.Discovered } }
    );
  return item.toObject();
};
var setup4 = async (challengeId, TID, setDiscover) => {
  const exist = await verify6(challengeId, TID, setDiscover);
  if (exist) return exist;
  const userPublicData = await UserPublicService_default.verify(TID);
  const challengeData = await ChallengeService_default.verify(challengeId);
  const stageId = challengeData.stage?.id;
  const userStageData = stageId && await UserStageService_default.verify(stageId, TID);
  if (stageId && !userStageData) {
    const stageData = await StageService_default.detail(stageId);
    if (!stageData.settings.canStartFromChallenges)
      throw new Error("user stage has not been found yet");
    await UserStageService_default.setup(stageId, TID);
    const result = await verify6(challengeId, TID, setDiscover);
    if (result) return result;
    throw new Error("challenge setup error");
  }
  const userStage = userStageData && {
    id: userStageData.id,
    stageId: userStageData.stage.id,
    name: userStageData.stage.name
  };
  const userPublic = await UserPublicForeignValidator.validateAsync(
    userPublicData,
    { abortEarly: false, stripUnknown: true, convert: true }
  );
  const challenge = await ChallengeForeignValidator.validateAsync(
    challengeData,
    { abortEarly: false, stripUnknown: true, convert: true }
  );
  const settings = await ChallengeSettingsForeignValidator.validateAsync(
    challengeData.settings,
    { abortEarly: false, stripUnknown: true, convert: true }
  );
  const userChallengeData = await UserChallengeModel_default.create({
    userStage,
    challenge,
    userPublic,
    settings,
    status: UserChallengeStatusValues[setDiscover ? "Discovered" : "Undiscovered"]
  });
  const userChallenge = {
    id: userChallengeData.id,
    challengeId: userChallengeData.challenge.id,
    name: userChallengeData.challenge.name
  };
  const contents = await services[settings.type].setup(
    userPublic,
    userChallenge
  );
  userChallengeData.contents = contents;
  await userChallengeData.save();
  return userChallengeData.toObject();
};
var list4 = async (params, TID) => {
  const { search, status, userStageId } = params;
  const filters = { "userPublic.code": TID };
  if (search) filters["challenge.name"] = { $regex: search, $options: "i" };
  if (status) filters.status = status;
  if (userStageId) filters["userStage.id"] = userStageId;
  const { list: list8, ...rest } = await service_default.list(
    UserChallengeModel_default,
    params.page,
    params.limit,
    filters,
    "challenge.order"
  );
  return {
    list: list8.map(({ userPublic, ...item }) => item),
    ...rest
  };
};
var detail5 = async (id, TID) => {
  const data = await UserChallengeModel_default.findOne({
    _id: id,
    deletedAt: null,
    "userPublic.code": TID
  });
  if (!data) throw new Error("user challenge not found");
  return data.toObject({
    transform: (doc, ret) => {
      const { _id, __v, userPublic, ...rest } = ret;
      return { id: _id, ...rest };
    }
  });
};
var submit3 = async (id, TID, bonus = 0) => {
  const userChallenge = await detail5(id, TID);
  if (!userChallenge) throw new Error("user challenge not found");
  const {
    settings: { type: challengeType }
  } = userChallenge;
  await services[challengeType].submitEmpties(id, TID);
  const summary4 = await services[challengeType].summary(id, TID);
  const results = userChallenge.results || initResult();
  const timeUsed = (0, import_dayjs.default)().diff((0, import_dayjs.default)(results.startAt), "seconds");
  if (summary4.type === ChallengeTypeValues.Trivia)
    results.totalCorrect = summary4.totalCorrect;
  else results.totalCorrect = summary4.totalFound;
  results.contentBonus = summary4.totalBonus || 0;
  results.baseScore = summary4.totalBaseScore;
  results.bonus = bonus;
  results.totalScore = summary4.totalBaseScore + summary4.totalBonus + bonus;
  results.endAt = /* @__PURE__ */ new Date();
  results.timeUsed = timeUsed;
  userChallenge.results = results;
  userChallenge.status = UserChallengeStatusValues.Completed;
  const newUserChallenge = await UserChallengeModel_default.findOneAndUpdate(
    { _id: userChallenge.id },
    { $set: { results, status: UserChallengeStatusValues.Completed } }
  );
  if (!newUserChallenge) throw new Error("");
  if (userChallenge.userStage)
    await UserStageService_default.submitState(userChallenge.userStage.id, TID);
  return newUserChallenge.toObject();
};
var submitState = async (id, TID) => {
  const userChallenge = await UserChallengeModel_default.findOne({ _id: id });
  if (!userChallenge) throw new Error("user challenge not found");
  if (userChallenge.status === UserChallengeStatusValues.Completed)
    return userChallenge.toObject();
  const results = userChallenge.results || initResult();
  const {
    settings: { type: challengeType }
  } = userChallenge;
  const summary4 = await services[challengeType].summary(id, TID);
  results.baseScore = summary4.totalBaseScore;
  results.contentBonus = summary4.totalBonus;
  results.totalScore = summary4.totalBaseScore + summary4.totalBonus;
  userChallenge.results = results;
  userChallenge.status = UserChallengeStatusValues.OnGoing;
  await userChallenge.save();
  return userChallenge.toObject();
};
var summary3 = async (userStageId, TID) => {
  return UserChallengeModel_default.aggregate().match({
    "userStage.id": userStageId,
    "userPublic.code": TID
  }).group({
    _id: "$userPublic.code",
    userPublic: { $first: "$userPublic" },
    userStage: { $first: "$userStage" },
    totalBaseScore: { $sum: "$results.baseScore" },
    totalBonus: {
      $sum: { $add: ["$results.bonus", "$results.correctBonus"] }
    },
    totalScore: { $sum: "$results.totalScore" }
  });
};
var UserChallengeService = {
  verify: verify6,
  setup: setup4,
  list: list4,
  detail: detail5,
  // detailContent,
  submit: submit3,
  submitState,
  summary: summary3
};
var UserChallengeService_default = UserChallengeService;

// _src/validators/StageValidator/index.ts
var import_joi4 = __toESM(require("joi"));
var StageSettingsValidator = schema_default.generate(
  {
    canDoRandomChallenges: schema_default.boolean({ defaultValue: false }),
    canStartFromChallenges: schema_default.boolean({ defaultValue: false }),
    periode: PeriodeValidator.allow(null)
  }
);
var StageListParamsValidator = schema_default.generate({
  ...DefaultListParamsFields,
  status: schema_default.string({ allow: null }).valid(...Object.values(StageStatusValues))
});
var StagePayloadValidator = schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(import_joi4.default.string()).default([]),
  contents: schema_default.array(import_joi4.default.string()).default([]),
  status: schema_default.string({ required: true }).valid(...Object.values(StageStatusValues)),
  settings: StageSettingsValidator.required()
});
var StageForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(import_joi4.default.string(), { defaultValue: [] }),
  settings: schema_default.generate({
    periode: PeriodeValidator.allow(null)
  })
});

// _src/services/UserStageService/index.ts
var initResults = () => ({
  baseScore: 0,
  challengeBonus: 0,
  bonus: 0,
  totalScore: 0
});
var verify7 = async (stageId, TID) => {
  return await UserStageModel_default.findOne({
    "userPublic.code": TID,
    "stage.id": stageId
  });
};
var setup5 = async (stageId, TID) => {
  const exist = await verify7(stageId, TID);
  if (exist) return exist;
  const userPublicData = await verify3(TID);
  const stageData = await verify(stageId);
  const userPublic = await UserPublicForeignValidator.validateAsync(
    userPublicData,
    { convert: true, abortEarly: false, stripUnknown: true }
  );
  const stage = await StageForeignValidator.validateAsync(stageData, {
    convert: true,
    abortEarly: false,
    stripUnknown: true
  });
  const userStageData = await UserStageModel_default.create({ userPublic, stage });
  const contents = stageData.contents.map(
    (challengeId) => setup4(challengeId, TID)
  );
  const contentsData = await Promise.all(contents).catch(async (err) => {
    await userStageData.deleteOne();
    throw err;
  });
  userStageData.contents = contentsData.map((item) => item?.id);
  await userStageData.save();
  return userStageData.toObject();
};
var list5 = async (params, TID) => {
  const skip = (params.page - 1) * params.limit;
  const filter = {
    deletedAt: null,
    "stage.name": { $regex: params.search, $options: "i" },
    "userPublic.code": TID
  };
  if (params.status) filter.status = params.status;
  const items = await UserStageModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await UserStageModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: items.map(
      (item) => item.toObject({
        transform: (doc, ret) => {
          const { _id, __v, userPublic, ...rest } = ret;
          return { id: _id, ...rest };
        }
      })
    ),
    page: params.page,
    totalItems,
    totalPages
  };
};
var detail6 = async (id, TID) => {
  const item = await UserStageModel_default.findOne({
    _id: id,
    deletedAt: null,
    "userPublic.code": TID
  });
  if (!item) throw new Error("user stage not found");
  return item.toObject({
    transform: (doc, ret) => {
      const { _id, __v, userPublic, ...rest } = ret;
      return { id: _id, ...rest };
    }
  });
};
var submitState2 = async (id, TID) => {
  const item = await UserStageModel_default.findOne({
    _id: id,
    "userPublic.code": TID
  });
  if (!item) throw new Error("user stage not found");
  const results = item?.results || initResults();
  const [summary4] = await summary3(id, TID);
  console.log(summary4);
  results.baseScore = summary4.totalBaseScore;
  results.bonus = 0;
  results.challengeBonus = summary4.totalBonus;
  results.totalScore = summary4.totalScore;
  item.results = results;
  await item.save();
  return item;
};
var UserStageService = { list: list5, detail: detail6, setup: setup5, verify: verify7, submitState: submitState2 };
var UserStageService_default = UserStageService;

// _src/services/QrService/index.ts
var list6 = async (params) => {
  const skip = (params.page - 1) * params.limit;
  const filter = { deletedAt: null };
  if (params.status) filter.status = params.status;
  if (params.code) filter.code = params.code;
  if (params.hasContent != null)
    filter.content = params.hasContent ? { $ne: null } : null;
  const items = await QrModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await QrModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages
  };
};
var generate2 = async (count) => {
  const items = new Array(count).fill({}).map(() => {
    const salt = Math.floor(Math.random() * Math.pow(16, 8)).toString(16).padStart(8, "0");
    return {
      code: import_crypto_js2.default.SHA256(`${Date.now()}${salt}`).toString(import_crypto_js2.default.enc.Hex),
      status: QrStatusValues.Draft
    };
  });
  return QrModel_default.insertMany(items);
};
var detail7 = async (id) => {
  const item = await QrModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");
  return item.toObject();
};
var details5 = async (ids) => {
  const items = await QrModel_default.find({ _id: { $in: ids } });
  return items.map((item) => item.toObject());
};
var update3 = async (id, payload) => {
  const { content } = payload;
  const item = await QrModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");
  if (content) {
    const serviceMap = {
      [QrContentTypeValues.Challenge]: ChallengeService_default,
      [QrContentTypeValues.Stage]: StageService_default,
      [QrContentTypeValues.Trivia]: TriviaService_default,
      [QrContentTypeValues.PhotoHunt]: PhotoHuntService_default
    };
    const service2 = serviceMap[content.type];
    const action = payload.status === QrStatusValues.Draft ? "detail" : "verify";
    await service2[action](content.refId);
  }
  Object.assign(item, payload);
  await item.save();
  return item.toObject();
};
var _delete3 = async (id) => {
  const item = await QrModel_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: /* @__PURE__ */ new Date() }
  );
  if (!item) throw new Error("item not found");
  return item;
};
var deleteMany = async (ids) => {
  const changed = await QrModel_default.updateMany(
    {
      _id: { $in: ids },
      deletedAt: null,
      status: QrStatusValues.Draft
    },
    { $set: { deletedAt: /* @__PURE__ */ new Date() } }
  );
  if (changed.modifiedCount == 0) throw new Error("item not found");
  return changed;
};
var verify8 = async (code, TID) => {
  const qrData = await QrModel_default.findOne({
    code,
    deletedAt: null,
    status: QrStatusValues.Publish
  });
  if (!qrData) throw new Error("qr code invalid");
  const { content } = qrData;
  if (!content) throw new Error("invalid qr content");
  const services3 = {
    [QrContentTypeValues.Stage]: UserStageService_default,
    [QrContentTypeValues.Challenge]: UserChallengeService_default,
    [QrContentTypeValues.Trivia]: null,
    [QrContentTypeValues.PhotoHunt]: null
  };
  const service2 = services3[content.type];
  const data = await service2?.setup(TID, content.refId, true);
  if (data) content.refId = data.id;
  await QrModel_default.updateOne(
    { _id: qrData.id },
    { accessCount: (qrData.accessCount || 0) + 1 }
  );
  return content;
};
var QrService = {
  generate: generate2,
  list: list6,
  detail: detail7,
  details: details5,
  update: update3,
  delete: _delete3,
  deleteMany,
  verify: verify8
};
var QrService_default = QrService;

// _src/validators/QrValidator/index.ts
var import_joi5 = __toESM(require("joi"));
var QrListParamsValidator = schema_default.generate({
  ...DefaultListParamsFields,
  code: schema_default.string({ allow: "" }),
  status: schema_default.string({ allow: "" }).valid(...Object.values(QrStatusValues)),
  hasContent: schema_default.boolean({ defaultValue: null })
});
var QrGeneratePayloadValidator = schema_default.generate({
  amount: schema_default.number({ required: true })
});
var QrContentValidator = schema_default.generate({
  refId: schema_default.string({ required: true }),
  type: schema_default.string({ required: true }).valid(...Object.values(QrContentTypeValues))
});
var QrLocationValidator = schema_default.generate({
  label: schema_default.string({ required: true, allow: "" }),
  longitude: schema_default.number({ required: true }),
  latitude: schema_default.number({ required: true })
});
var QrUpdatePayloadValidator = schema_default.generate({
  status: schema_default.string({ required: true }).valid(...Object.values(QrStatusValues)),
  content: QrContentValidator.allow(null).default(null),
  location: QrLocationValidator.allow(null).default(null)
});
var QrDeleteBulkPayloadValidator = schema_default.generate({
  ids: schema_default.array(import_joi5.default.string(), { required: true })
});

// _src/services/PhotoHuntService/index.ts
var createMany2 = async (challenge, payload, session) => {
  if (payload.length === 0) return [];
  const qrParams = await QrListParamsValidator.validateAsync({
    hasContent: false,
    limit: payload.length
  });
  const qrs = (await list6(qrParams)).list.map(({ id, code }) => ({
    id,
    code
  }));
  if (qrs.length !== payload.length)
    throw new Error("photohunt.sync.qr_not_enough_error");
  const items = await PhotoHuntModel_default.insertMany(
    payload.map((item, i) => ({
      ...item,
      challenge,
      qr: qrs[i]
    })),
    { session }
  );
  const res = await QrModel_default.bulkWrite(
    items.map((item) => {
      const content = {
        type: "photohunt",
        refId: item.id
      };
      return {
        updateOne: {
          filter: { _id: item.qr?.id },
          update: { $set: { content } }
        }
      };
    }),
    { session }
  );
  if (res.modifiedCount !== items.length)
    throw new Error("photohunt.sync.qr_updating_error");
  return items;
};
var updateMany2 = async (challenge, payload, session) => {
  if (payload.length === 0) return [];
  const ids = payload.map(({ id }) => id);
  const res = await PhotoHuntModel_default.bulkWrite(
    payload.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.id },
          update: { $set: { ...item, challenge } }
        }
      };
    }),
    { session }
  );
  if (res.modifiedCount !== payload.length)
    throw new Error("photohunt.sync.update_error");
  return await PhotoHuntModel_default.find({ _id: { $in: ids } });
};
var detail4 = async (id) => {
  const item = await PhotoHuntModel_default.findOne({ _id: id });
  if (!item) throw new Error("photo hunt not found");
  return item.toObject();
};
var details3 = async (challengeId) => {
  const challenge = await ChallengeService_default.detail(challengeId);
  if (challenge.settings.type !== ChallengeTypeValues.PhotoHunt)
    throw new Error("challenge.not_photohunt_type_error");
  const items = await PhotoHuntModel_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};
var sync2 = async (challengeId, payload) => {
  return db_default.transaction(async (session) => {
    await PhotoHuntModel_default.updateMany(
      { "challenge.id": challengeId },
      { $set: { challenge: null } },
      { session }
    );
    if (payload.length === 0) return [];
    const challenge = await ChallengeService_default.detail(challengeId);
    if (challenge.settings.type !== ChallengeTypeValues.PhotoHunt)
      throw new Error("challenge.not_photohunt_type_error");
    const challengeForeign = { id: challenge.id, name: challenge.name };
    const { create: itemsCreate, update: itemsUpdate } = payload.reduce(
      (acc, cur) => {
        acc[cur.id ? "update" : "create"].push(cur);
        return acc;
      },
      { create: [], update: [] }
    );
    const itemsCreated = await createMany2(
      challengeForeign,
      itemsCreate,
      session
    );
    const itemsUpdated = await updateMany2(
      challengeForeign,
      itemsUpdate,
      session
    );
    const items = [...itemsCreated, ...itemsUpdated].map(
      (item) => item.toObject()
    );
    await ChallengeService_default.updateContent(
      challengeId,
      items.map(({ id }) => id)
    );
    return items;
  });
};
var verify9 = async (id) => {
};
var PhotoHuntService = { detail: detail4, details: details3, sync: sync2, verify: verify9 };
var PhotoHuntService_default = PhotoHuntService;

// _src/services/UserService/index.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var register = async (payload, code) => {
  return await db_default.transaction(async (session) => {
    const email = payload.email;
    const userExists = await UserModel_default.findOne({ email }).session(session);
    if (userExists) throw new Error("email taken");
    const password = await (0, import_bcryptjs.hash)(payload.password, 10);
    const [user] = await UserModel_default.create(
      [
        {
          email,
          password,
          role: "public" /* Public */
        }
      ],
      { session }
    );
    await UserPublicModel_default.findOneAndUpdate(
      { code },
      { $set: { user: { id: user._id, name: user.name } } },
      { new: true, session }
    );
    return user;
  });
};
var login = async (payload, secret) => {
  const email = payload.email;
  const user = await UserModel_default.findOne({ email });
  if (!user) throw new Error("user not found");
  const isPasswordValid = await (0, import_bcryptjs.compare)(payload.password, user.password);
  if (!isPasswordValid) throw new Error("invalid password");
  const userPublic = await UserPublicModel_default.findOne({ "user.id": user._id }).catch(() => null) || await UserPublicService_default.setup(user.id);
  const token = (0, import_jsonwebtoken.sign)({ id: user._id }, secret, {
    expiresIn: 30 * 24 * 60 * 60
  });
  const { _id: id, name } = user;
  return { id, name, email, TID: userPublic.code, token };
};
var profile = async (bearer) => {
};
var list7 = async (params) => {
};
var create3 = async (payload) => {
};
var detail8 = async (id) => {
  const user = await UserModel_default.findOne({ _id: id, deletedAt: null }).catch(() => {
  });
  if (!user) throw new Error("user not found");
  const meta = await UserPublicService_default.verify(user.id);
  return {
    ...user.toObject(),
    meta
  };
};
var update4 = async (id, payload) => {
};
var _delete4 = async (id) => {
};
var UserService = {
  register,
  login,
  profile,
  list: list7,
  create: create3,
  detail: detail8,
  update: update4,
  delete: _delete4
};
var UserService_default = UserService;

// _src/services/index.ts
var services2 = {
  ChallengeService: ChallengeService_default,
  PhotoHuntService: PhotoHuntService_default,
  QrService: QrService_default,
  StageService: StageService_default,
  TriviaService: TriviaService_default,
  UserChallengeService: UserChallengeService_default,
  UserPublicService: UserPublicService_default,
  UserService: UserService_default,
  UserStageService: UserStageService_default,
  UserTriviaService: UserTriviaService_default,
  UserPhotoHuntService: UserPhotoHuntService_default
};
var services_default = services2;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChallengeService,
  PhotoHuntService,
  QrService,
  StageService,
  TriviaService,
  UserChallengeService,
  UserPhotoHuntService,
  UserPublicService,
  UserService,
  UserStageService,
  UserTriviaService
});
