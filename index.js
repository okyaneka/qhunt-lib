"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// _src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  helpers: () => helpers_default,
  models: () => models_default,
  mongoose: () => import_mongoose12.default,
  services: () => services_default,
  validators: () => validators_default
});
module.exports = __toCommonJS(index_exports);

// _src/helpers/db/index.ts
var import_mongoose = require("mongoose");
var transaction = (operation) => __async(void 0, null, function* () {
  const session = yield (0, import_mongoose.startSession)();
  session.startTransaction();
  return yield operation(session).then((res) => __async(void 0, null, function* () {
    yield session.commitTransaction();
    return res;
  })).catch((err) => __async(void 0, null, function* () {
    yield session.abortTransaction();
    throw err;
  })).finally(() => {
    session.endSession();
  });
});
var db = { transaction };
var db_default = db;

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
  const validation = error2 == null ? void 0 : error2.details.reduce((car, cur) => {
    var _a;
    return __spreadProps(__spreadValues({}, car), { [(_a = cur.context) == null ? void 0 : _a.key]: cur.message });
  }, {});
  return response.error({ validation }, "validation error");
};
var response = { success, error, errorValidation };
var response_default = response;

// _src/helpers/schema/index.ts
var import_joi = __toESM(require("joi"));
var import_mongoose2 = require("mongoose");
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
var list = (_0, _1, _2, ..._3) => __async(void 0, [_0, _1, _2, ..._3], function* (model10, page, limit, filters = {}) {
  const skip = (page - 1) * limit;
  const filter = __spreadProps(__spreadValues({}, filters), {
    deletedAt: null
  });
  const items = yield model10.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
  const totalItems = yield model10.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);
  return {
    list: items.map((item) => item.toObject ? item.toObject() : item),
    page,
    totalItems,
    totalPages
  };
});
var service = { list };
var service_default = service;

// _src/helpers/index.ts
var helpers = { db: db_default, response: response_default, schema: schema_default, service: service_default };
var helpers_default = helpers;

// _src/models/ChallengeModel/index.ts
var import_mongoose3 = require("mongoose");

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

// _src/models/ChallengeModel/index.ts
var ChallengeFeedbackSchema = new import_mongoose3.Schema(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsSchema = new import_mongoose3.Schema(
  {
    type: { type: String, enum: Object.values(ChallengeType), required: true },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: ChallengeFeedbackSchema }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsForeignSchema = new import_mongoose3.Schema(
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
var ChallengeForeignSchema = new import_mongoose3.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: ChallengeSettingsSchema, required: true }
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
      enum: Object.values(ChallengeStatus),
      default: "draft" /* Draft */
    },
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

// _src/models/QrModel/index.ts
var import_mongoose4 = require("mongoose");

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
var QrContentSchema = new import_mongoose4.Schema(
  {
    type: { type: String, enum: Object.values(QrContentType), required: true },
    refId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrLocationSchema = new import_mongoose4.Schema(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new import_mongoose4.Schema(
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
var QrModel = import_mongoose4.models.Qr || (0, import_mongoose4.model)("Qr", QrSchema);
var QrModel_default = QrModel;

// _src/models/StageModel/types.ts
var StageStatus = /* @__PURE__ */ ((StageStatus2) => {
  StageStatus2["Draft"] = "draft";
  StageStatus2["Publish"] = "publish";
  return StageStatus2;
})(StageStatus || {});

// _src/models/StageModel/index.ts
var import_mongoose5 = require("mongoose");
var StageSettingsSchema = new import_mongoose5.Schema(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new import_mongoose5.Schema(
  {
    periode: { type: PeriodSchema, required: true }
  },
  { _id: false }
);
var StageForeignSchema = new import_mongoose5.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true }
  },
  { _id: false }
);
var StageSchema = new import_mongoose5.Schema(
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
var StageModel = import_mongoose5.models.Stage || (0, import_mongoose5.model)("Stage", StageSchema);
var StageModel_default = StageModel;

// _src/models/TriviaModel/index.ts
var import_mongoose6 = require("mongoose");
var TriviaOptionSchema = new import_mongoose6.Schema(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 }
  },
  { _id: false, versionKey: false }
);
var TriviaForeignOptionSchema = new import_mongoose6.Schema(
  {
    text: { type: String, required: true }
  },
  { _id: false }
);
var TriviaForeignSchema = new import_mongoose6.Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    allowMultiple: { type: Boolean, required: true },
    options: { type: [TriviaForeignOptionSchema], required: true }
  },
  { _id: false }
);
var TriviaSchema = new import_mongoose6.Schema(
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
var TriviaModel = import_mongoose6.models.Trivia || (0, import_mongoose6.model)("Trivia", TriviaSchema);
var TriviaModel_default = TriviaModel;

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
    const _a = ret, { _id, __v, password } = _a, rest = __objRest(_a, ["_id", "__v", "password"]);
    return __spreadValues({ id: _id }, rest);
  }
};
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

// _src/models/UserChallengeModel/index.ts
var import_mongoose10 = require("mongoose");

// _src/models/UserChallengeModel/types.ts
var UserChallengeStatus = /* @__PURE__ */ ((UserChallengeStatus2) => {
  UserChallengeStatus2["Undiscovered"] = "undiscovered";
  UserChallengeStatus2["OnGoing"] = "ongoing";
  UserChallengeStatus2["Completed"] = "completed";
  UserChallengeStatus2["Failed"] = "failed";
  return UserChallengeStatus2;
})(UserChallengeStatus || {});

// _src/models/UserPublicModel/index.ts
var import_mongoose8 = require("mongoose");

// _src/models/UserPublicModel/types.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

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
var UserPublicModel = import_mongoose8.models.UserPublic || (0, import_mongoose8.model)("UserPublic", UserPublicSchema, "usersPublic");
var UserPublicModel_default = UserPublicModel;

// _src/models/UserStageModel/index.ts
var import_mongoose9 = require("mongoose");

// _src/models/UserStageModel/types.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/UserStageModel/index.ts
var UserStageForeignSchema = new import_mongoose9.Schema(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true }
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
    score: { type: Number, default: null },
    contents: { type: [String], default: [] }
  },
  { timestamps: true }
);
UserStageSchema.set("toJSON", ToObject);
UserStageSchema.set("toObject", ToObject);
var UserStageModel = import_mongoose9.models.UserStage || (0, import_mongoose9.model)("UserStage", UserStageSchema, "usersStage");
var UserStageModel_default = UserStageModel;

// _src/models/UserChallengeModel/index.ts
var UserChallengeForeignSchema = new import_mongoose10.Schema(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserChallengeSchema = new import_mongoose10.Schema(
  {
    userStage: { type: UserStageForeignSchema, default: null },
    challenge: { type: ChallengeForeignSchema, required: true },
    userPublic: { type: UserPublicForeignSchema, required: true },
    status: {
      type: String,
      enum: Object.values(UserChallengeStatus),
      default: "undiscovered" /* Undiscovered */
    },
    contents: { type: [String], default: [] },
    score: { type: Number, default: null },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
UserChallengeSchema.set("toJSON", ToObject);
UserChallengeSchema.set("toObject", ToObject);
var UserChallengeModel = import_mongoose10.models.UserChallenge || (0, import_mongoose10.model)("UserChallenge", UserChallengeSchema, "usersChallenge");
var UserChallengeModel_default = UserChallengeModel;

// _src/models/UserTriviaModel/index.ts
var import_mongoose11 = require("mongoose");
var UserTriviaResultSchema = new import_mongoose11.Schema(
  {
    answer: { type: String, required: true },
    feedback: { type: String, default: "" },
    isCorrect: { type: Boolean, required: true },
    score: { type: Number, required: true }
  },
  { _id: false }
);
var UserTriviaSchema = new import_mongoose11.Schema(
  {
    userPublic: { type: UserPublicForeignSchema, required: true },
    userChallenge: { type: UserChallengeForeignSchema, required: true },
    trivia: { type: TriviaForeignSchema, required: true },
    results: { type: UserTriviaResultSchema, default: null }
  },
  { timestamps: true }
);
UserTriviaSchema.set("toJSON", ToObject);
UserTriviaSchema.set("toObject", ToObject);
var UserTriviaModel = import_mongoose11.models.UserTrivia || (0, import_mongoose11.model)("UserTrivia", UserTriviaSchema, "usersTrivia");
var UserTriviaModel_default = UserTriviaModel;

// _src/models/index.ts
var models10 = {
  ChallengeModel: ChallengeModel_default,
  QrModel: QrModel_default,
  StageModel: StageModel_default,
  TriviaModel: TriviaModel_default,
  UserModel: UserModel_default,
  UserChallengeModel: UserChallengeModel_default,
  UserPublicModel: UserPublicModel_default,
  UserStageModel: UserStageModel_default,
  UserTriviaModel: UserTriviaModel_default
};
var models_default = models10;

// _src/services/StageService/index.ts
var isUsed = (ids, id) => __async(void 0, null, function* () {
  const filter = {
    _id: { $in: ids },
    deletedAt: null,
    stage: { $ne: null }
  };
  if (id) filter["stage.id"] = { $ne: id };
  const used = (yield ChallengeModel_default.find(filter)).map((item) => item.id);
  if (used.length)
    throw new Error(
      `challenge${used.length > 1 ? "s" : ""} ${used.join(", ")} ${used.length > 1 ? "are" : "is"} used`
    );
});
var list2 = (params) => __async(void 0, null, function* () {
  const skip = (params.page - 1) * params.limit;
  const filter = {
    deletedAt: null,
    name: { $regex: params.search, $options: "i" }
  };
  const items = yield StageModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = yield StageModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages
  };
});
var create = (payload) => __async(void 0, null, function* () {
  yield isUsed(payload.contents);
  const contents = yield ChallengeModel_default.find({ _id: { $in: payload.contents } });
  const stage = yield StageModel_default.create(__spreadProps(__spreadValues({}, payload), {
    contents: contents.map((item) => item.id)
  }));
  const sync3 = contents.map((item) => {
    item.stage = { id: stage.id, name: stage.name };
    return item.save();
  });
  yield Promise.all(sync3);
  return stage.toObject();
});
var detail = (id) => __async(void 0, null, function* () {
  const item = yield StageModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  return item.toObject();
});
var update = (id, payload) => __async(void 0, null, function* () {
  return yield db_default.transaction((session) => __async(void 0, null, function* () {
    yield isUsed(payload.contents, id);
    const stage = yield StageModel_default.findOne({ _id: id, deletedAt: null });
    if (!stage) throw new Error("stage not found");
    const contents = (yield ChallengeModel_default.find({ _id: { $in: payload.contents }, deletedAt: null })).map((item) => item.id);
    yield ChallengeModel_default.updateMany(
      { "stage.id": stage.id },
      { $set: { stage: null } },
      { session }
    );
    yield ChallengeModel_default.updateMany(
      { _id: { $in: contents } },
      { $set: { stage: { id: stage.id, name: stage.name } } },
      { session }
    );
    Object.assign(stage, __spreadProps(__spreadValues({}, payload), { contents }));
    yield stage.save({ session });
    return stage.toObject();
  }));
});
var _delete = (id) => __async(void 0, null, function* () {
  const item = yield StageModel_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } }
  );
  if (!item) throw new Error("stage not found");
  return item;
});
var verify = (id) => __async(void 0, null, function* () {
  const item = yield StageModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  if (item.status !== "publish" /* Publish */)
    throw new Error("stage not published yet");
  return item.toObject();
});
var StageService = { list: list2, create, detail, update, delete: _delete, verify };
var StageService_default = StageService;

// _src/services/ChallengeService/index.ts
var list3 = (params) => __async(void 0, null, function* () {
  const skip = (params.page - 1) * params.limit;
  const filter = { deletedAt: null };
  if (params.stageId == "null") filter.stage = null;
  else if (params.stageId) filter["stage.id"] = params.stageId;
  const list8 = yield ChallengeModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = yield ChallengeModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: list8.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages
  };
});
var create2 = (payload) => __async(void 0, null, function* () {
  const _a = payload, { stageId } = _a, value = __objRest(_a, ["stageId"]);
  const stage = yield StageService_default.detail(stageId).catch(() => null);
  value.stage = stage ? { id: stage.id, name: stage.name } : null;
  const item = yield ChallengeModel_default.create(value);
  if (stage) {
    const contents = stage.contents || [];
    contents.push(item.id);
    yield StageModel_default.findOneAndUpdate({ _id: stageId }, { $set: { contents } });
  }
  return item.toObject();
});
var detail2 = (id) => __async(void 0, null, function* () {
  const item = yield ChallengeModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
});
var update2 = (id, payload) => __async(void 0, null, function* () {
  return yield db_default.transaction((session) => __async(void 0, null, function* () {
    var _b;
    const _a = payload, { stageId } = _a, value = __objRest(_a, ["stageId"]);
    const item = yield ChallengeModel_default.findOne({ _id: id, deletedAt: null });
    if (!item) throw new Error("challenge not found");
    const newStage = yield StageService_default.detail(stageId).catch(() => null);
    const oldStage = ((_b = item == null ? void 0 : item.stage) == null ? void 0 : _b.id) && item.stage.id != stageId ? yield StageService_default.detail(item.stage.id).catch(() => null) : null;
    const newContent = (newStage == null ? void 0 : newStage.contents) || [];
    const oldContent = (oldStage == null ? void 0 : oldStage.contents) || [];
    value.stage = newStage ? { id: newStage.id, name: newStage.name } : null;
    if (!newContent.includes(id)) newContent.push(id);
    if (oldContent.includes(id)) oldContent.splice(oldContent.indexOf(id), 1);
    yield StageModel_default.findOneAndUpdate(
      { _id: newStage == null ? void 0 : newStage.id },
      { $set: { contents: newContent } },
      { session }
    );
    yield StageModel_default.findOneAndUpdate(
      { _id: oldStage == null ? void 0 : oldStage.id },
      { $set: { contents: oldContent } },
      { session }
    );
    Object.assign(item, value);
    yield item.save({ session });
    return item.toObject();
  }));
});
var updateContent = (id, contents) => __async(void 0, null, function* () {
  const item = yield ChallengeModel_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { contents } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");
  return item.toObject();
});
var _delete2 = (id) => __async(void 0, null, function* () {
  const item = yield ChallengeModel_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");
  return item.toObject();
});
var verify2 = (id) => __async(void 0, null, function* () {
  const item = yield ChallengeModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  if (item.status !== "publish" /* Publish */)
    throw new Error("challenge not published yet");
  return item.toObject();
});
var ChallengeService = {
  list: list3,
  create: create2,
  detail: detail2,
  update: update2,
  updateContent,
  delete: _delete2,
  verify: verify2
};
var ChallengeService_default = ChallengeService;

// _src/services/QrService/index.ts
var import_crypto_js = __toESM(require("crypto-js"));

// _src/services/UserPublicService/index.ts
var sync = (TID) => __async(void 0, null, function* () {
  const exists = yield UserPublicModel_default.findOne({ code: TID, deletedAt: null });
  if (exists) return exists.toObject();
  return (yield UserPublicModel_default.create({ code: TID, deletedAt: null })).toObject();
});
var verify3 = (code) => __async(void 0, null, function* () {
  const user = yield UserPublicModel_default.findOne({ code, deletedAt: null });
  if (!user) throw new Error("code invalid");
  return user.toObject();
});
var UserPublicService = { sync, verify: verify3 };
var UserPublicService_default = UserPublicService;

// _src/validators/ChallengeValidator/index.ts
var import_joi6 = __toESM(require("joi"));

// _src/validators/index.ts
var import_joi5 = __toESM(require("joi"));

// _src/validators/QrValidator/index.ts
var import_joi2 = __toESM(require("joi"));
var QrListQueryValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListParamsFields), {
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
  ids: schema_default.array(import_joi2.default.string(), { required: true })
});
var QrValidator = {
  QrListQueryValidator,
  QrGeneratePayloadValidator,
  QrUpdatePayloadValidator,
  QrDeleteBulkPayloadValidator
};
var QrValidator_default = QrValidator;

// _src/validators/StageValidator/index.ts
var import_joi4 = __toESM(require("joi"));

// _src/helpers/validator/index.ts
var import_joi3 = __toESM(require("joi"));
var PeriodeValidator = schema_default.generate({
  startDate: import_joi3.default.date().required().greater("now"),
  endDate: import_joi3.default.date().required().greater(import_joi3.default.ref("startDate"))
});

// _src/validators/StageValidator/index.ts
var StageSettingsValidator = schema_default.generate(
  {
    canDoRandomChallenges: schema_default.boolean({ defaultValue: false }),
    canStartFromChallenges: schema_default.boolean({ defaultValue: false }),
    periode: PeriodeValidator.allow(null)
  }
);
var StageListParamsValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListQueryFields), {
  status: schema_default.string({ allow: null }).valid(...Object.values(StageStatus))
}));
var StagePayloadValidator = schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(import_joi4.default.string()).default([]),
  contents: schema_default.array(import_joi4.default.string()).default([]),
  status: schema_default.string({ required: true }).valid(...Object.values(StageStatus)),
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
var StageValidator = {
  StageSettingsValidator,
  StageListParamsValidator,
  StagePayloadValidator,
  StageForeignValidator
};
var StageValidator_default = StageValidator;

// _src/validators/UserChallengeValidator/index.ts
var UserChallengeForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  challengeId: schema_default.string({ required: true }),
  name: schema_default.string({ required: true })
});
var UserChallengeParamsValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListParamsFields), {
  userStageId: schema_default.string({ allow: "" }),
  status: schema_default.string({ allow: "" }).valid(...Object.values(UserChallengeStatus))
}));
var UserChallengeValidator = {
  UserChallengeForeignValidator,
  UserChallengeParamsValidator
};
var UserChallengeValidator_default = UserChallengeValidator;

// _src/validators/UserPublicValidator/index.ts
var UserPublicForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  code: schema_default.string({ required: true }),
  name: schema_default.string({ required: true, allow: "" })
});
var UserPublicValidator = { UserPublicForeignValidator };
var UserPublicValidator_default = UserPublicValidator;

// _src/validators/UserStageValidator/index.ts
var UserStageForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  stageId: schema_default.string({ required: true }),
  name: schema_default.string({ required: true })
});
var UserStageListParamsValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListParamsFields), {
  status: schema_default.string({ allow: "" }).valid(...Object.values(UserStageStatus))
}));
var UserStageValidator = {
  UserStageForeignValidator,
  UserStageListParamsValidator
};
var UserStageValidator_default = UserStageValidator;

// _src/validators/UserValidator/index.ts
var UserPayloadValidator = schema_default.generate({
  email: schema_default.string({ required: true }).email(),
  password: schema_default.string({ required: true })
});
var UserListQueryValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListQueryFields), {
  role: schema_default.string({ defaultValue: null }).valid(...Object.values(UserRole))
}));
var UserValidator = {
  UserPayloadValidator,
  UserListQueryValidator
};
var UserValidator_default = UserValidator;

// _src/validators/index.ts
var validators = {
  ChallengeValidator: ChallengeValidator_default,
  QrValidator: QrValidator_default,
  StageValidator: StageValidator_default,
  TriviaValidator: TriviaValidator_default,
  UserChallengeValidator: UserChallengeValidator_default,
  UserPublicValidator: UserPublicValidator_default,
  UserStageValidator: UserStageValidator_default,
  UserValidator: UserValidator_default
};
var DefaultListParamsFields = {
  page: import_joi5.default.number().default(1),
  limit: import_joi5.default.number().default(10),
  search: import_joi5.default.string().allow("").default("")
};
var DefaultListQueryFields = {
  page: schema_default.number({ defaultValue: 1 }),
  limit: schema_default.number({ defaultValue: 1 }),
  search: schema_default.string({ defaultValue: "", allow: "" })
};
var validators_default = validators;

// _src/validators/ChallengeValidator/index.ts
var ChallengeListParamsValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListParamsFields), {
  stageId: schema_default.string().allow("").default("")
}));
var ChallengeFeedbackValidator = schema_default.generate({
  positive: schema_default.string({ allow: "", defaultValue: "" }),
  negative: schema_default.string({ allow: "", defaultValue: "" })
}).default({ positive: "", negative: "" });
var ChallengeSettingsSchema2 = schema_default.generate({
  clue: schema_default.string({ defaultValue: "" }),
  duration: schema_default.number({ defaultValue: 0 }),
  type: schema_default.string({ required: true }).valid(...Object.values(ChallengeType)),
  feedback: ChallengeFeedbackValidator
});
var ChallengeForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(import_joi6.default.string(), { defaultValue: [] }),
  settings: schema_default.generate({
    duration: schema_default.number({ allow: 0 }),
    type: schema_default.string({ required: true }).valid(...Object.values(ChallengeType))
  })
});
var ChallengePayloadValidator = schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(schema_default.string()).default([]),
  stageId: schema_default.string({ required: true }),
  status: schema_default.string({ required: true }).valid(...Object.values(ChallengeStatus)),
  settings: ChallengeSettingsSchema2.required()
});
var ChallengeValidator = {
  ChallengeListParamsValidator,
  ChallengeFeedbackValidator,
  ChallengeSettingsSchema: ChallengeSettingsSchema2,
  ChallengeForeignValidator,
  ChallengePayloadValidator
};
var ChallengeValidator_default = ChallengeValidator;

// _src/validators/TriviaValidator/index.ts
var TriviaOptionValidator = schema_default.generate({
  isCorrect: schema_default.boolean({ defaultValue: false }),
  point: schema_default.number({ defaultValue: 0 }),
  text: schema_default.string({ required: true })
});
var TriviaOptionsValidator = schema_default.array(TriviaOptionValidator, {
  required: true
}).custom((value, helpers2) => {
  const hasCorrect = value.some((option) => option.isCorrect === true);
  return hasCorrect ? value : helpers2.error("array.hasCorrect");
}).messages({
  "array.hasCorrect": "{#label} at least one option must have `isCorrect` set to true."
});
var TriviaPayloadValidator = schema_default.generate({
  id: schema_default.string(),
  question: schema_default.string({ required: true }),
  feedback: ChallengeFeedbackValidator,
  allowMultiple: schema_default.boolean({ defaultValue: false }),
  options: TriviaOptionsValidator
});
var TriviaItemsPayloadValidator = schema_default.generate({
  items: schema_default.array(TriviaPayloadValidator, {
    required: true
  })
});
var TriviaForeignOptionValidator = schema_default.generate({
  text: schema_default.string({ required: true })
});
var TriviaForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  question: schema_default.string({ required: true }),
  allowMultiple: schema_default.boolean({ required: true }),
  options: schema_default.array(TriviaForeignOptionValidator, { required: true })
});
var TriviaValidator = {
  TriviaOptionValidator,
  TriviaOptionsValidator,
  TriviaPayloadValidator,
  TriviaItemsPayloadValidator,
  TriviaForeignValidator
};
var TriviaValidator_default = TriviaValidator;

// _src/services/UserTriviaService/index.ts
var verify4 = (triviaId, TID) => __async(void 0, null, function* () {
  const item = yield UserTriviaModel_default.findOne({
    "userPublic.code": TID,
    "trivia.id": triviaId,
    deletedAt: null
  });
  if (!item) throw new Error("user challenge is undiscovered");
  return item;
});
var setup = (userPublic, userChallenge, content2) => __async(void 0, null, function* () {
  const trivias = yield TriviaModel_default.find({ _id: { $in: content2 } });
  const payload = trivias.map((item) => item.toObject()).map((item) => __async(void 0, null, function* () {
    const trivia = yield TriviaForeignValidator.validateAsync(item, {
      stripUnknown: true
    });
    const userTrivia = yield verify4(trivia.id, userPublic.code).catch(
      () => null
    );
    if (userTrivia) return userTrivia;
    return yield UserTriviaModel_default.create({
      userPublic,
      userChallenge,
      trivia
    });
  }));
  const items = yield Promise.all(payload);
  return items.map((item) => item.toObject().id);
});
var details = (ids, TID) => __async(void 0, null, function* () {
  const data = yield UserTriviaModel_default.find({
    _id: { $in: ids },
    "userPublic.code": TID
  });
  return data.map(
    (item) => item.toObject({
      transform: (doc, ret) => {
        const _a = ret, { _id, __v, userPublic } = _a, rest = __objRest(_a, ["_id", "__v", "userPublic"]);
        return __spreadValues({ id: _id }, rest);
      }
    })
  );
});
var UserTriviaService = { setup, details };
var UserTriviaService_default = UserTriviaService;

// _src/services/UserChallengeService/index.ts
var verify5 = (code, challengeId, isDiscover) => __async(void 0, null, function* () {
  const item = yield UserChallengeModel_default.findOne({
    "userPublic.code": code,
    "challenge.id": challengeId,
    deletedAt: null
  });
  if (!item) throw new Error("user challenge is undiscovered");
  if (isDiscover) {
    item.status = "ongoing" /* OnGoing */;
    yield item.save();
  }
  return item.toObject();
});
var discover = (id) => __async(void 0, null, function* () {
  const item = yield UserChallengeModel_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set: { status: "ongoing" /* OnGoing */ }
    },
    { new: true }
  );
  if (!item) throw new Error("user challenge is undiscovered");
  return item.toObject();
});
var setup2 = (code, challengeId, isDiscover) => __async(void 0, null, function* () {
  var _a;
  const exist = yield verify5(code, challengeId).catch(() => null);
  if (exist) return yield discover(exist.id);
  const userPublicData = yield UserPublicService_default.verify(code);
  const challengeData = yield ChallengeService_default.detail(challengeId);
  const stageId = (_a = challengeData.stage) == null ? void 0 : _a.id;
  const userStageData = stageId ? yield UserStageService_default.verify(code, stageId).catch(() => null) : null;
  if (stageId && !userStageData) {
    const stageData = yield StageService_default.detail(stageId);
    if (!stageData.settings.canStartFromChallenges)
      throw new Error("user stage not discovered yet");
    yield UserStageService_default.setup(code, stageId);
    return yield verify5(code, challengeId, isDiscover);
  }
  const userStage = userStageData ? {
    id: userStageData.id,
    stageId: userStageData.stage.id,
    name: userStageData.stage.name
  } : null;
  const userPublic = yield UserPublicForeignValidator.validateAsync(
    userPublicData,
    {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    }
  );
  const challenge = yield ChallengeForeignValidator.validateAsync(
    challengeData,
    {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    }
  );
  const userChallengeData = yield UserChallengeModel_default.create({
    userStage,
    challenge,
    userPublic,
    status: isDiscover ? "ongoing" /* OnGoing */ : "undiscovered" /* Undiscovered */
  });
  const userChallenge = {
    id: userChallengeData.id,
    challengeId: userChallengeData.challenge.id,
    name: userChallengeData.challenge.name
  };
  switch (challenge.settings.type) {
    case "trivia" /* Trivia */:
      const triviaContent = yield UserTriviaService_default.setup(
        userPublic,
        userChallenge,
        challengeData.contents
      );
      userChallengeData.contents = triviaContent;
      yield userChallengeData.save();
      break;
    default:
      break;
  }
  return userChallengeData.toObject();
});
var list4 = (params, TID) => __async(void 0, null, function* () {
  const { search, status, userStageId } = params;
  const filters = { "userPublic.code": TID };
  if (search) filters["challenge.name"] = { $regex: search, $options: "i" };
  if (status) filters.status = status;
  if (userStageId) filters["userStage.id"] = userStageId;
  const _a = yield service_default.list(
    UserChallengeModel_default,
    params.page,
    params.limit,
    filters
  ), { list: list8 } = _a, rest = __objRest(_a, ["list"]);
  return __spreadValues({
    list: list8.map((_b) => {
      var _c = _b, { userPublic } = _c, item = __objRest(_c, ["userPublic"]);
      return item;
    })
  }, rest);
});
var detail3 = (id, TID) => __async(void 0, null, function* () {
  const data = yield UserChallengeModel_default.findOne({
    _id: id,
    deletedAt: null,
    "userPublic.code": TID
  });
  if (!data) throw new Error("user challenge not found");
  return data.toObject({
    transform: (doc, ret) => {
      const _a = ret, { _id, __v, userPublic } = _a, rest = __objRest(_a, ["_id", "__v", "userPublic"]);
      return __spreadValues({ id: _id }, rest);
    }
  });
});
var detailContent = (id, TID) => __async(void 0, null, function* () {
  const data = yield UserChallengeModel_default.findOne({
    _id: id,
    deletedAt: null,
    "userPublic.code": TID
  });
  if (!data) throw new Error("user challenge not found");
  const {
    status,
    challenge: {
      settings: { type: challengeType }
    },
    contents
  } = data;
  if (status === "undiscovered" /* Undiscovered */)
    throw new Error("user challenge is undiscovered");
  const services2 = {
    ["trivia" /* Trivia */]: UserTriviaService_default
  };
  return yield services2[challengeType].details(contents, TID);
});
var submit = (id, payload, TID) => __async(void 0, null, function* () {
});
var UserChallengeService = {
  verify: verify5,
  setup: setup2,
  list: list4,
  detail: detail3,
  detailContent,
  submit
};
var UserChallengeService_default = UserChallengeService;

// _src/services/UserStageService/index.ts
var verify6 = (code, stageId) => __async(void 0, null, function* () {
  const item = yield UserStageModel_default.findOne({
    "userPublic.code": code,
    "stage.id": stageId,
    deletedAt: null
  });
  if (!item) throw new Error("user stage not found");
  return item.toObject();
});
var setup3 = (code, stageId) => __async(void 0, null, function* () {
  const exist = yield verify6(code, stageId).catch(() => null);
  if (exist) return exist;
  const userPublicData = yield UserPublicService_default.verify(code);
  const stageData = yield StageService_default.detail(stageId);
  const userPublic = yield UserPublicForeignValidator.validateAsync(
    userPublicData,
    { convert: true, abortEarly: false, stripUnknown: true }
  );
  const stage = yield StageForeignValidator.validateAsync(stageData, {
    convert: true,
    abortEarly: false,
    stripUnknown: true
  });
  const userStageData = yield UserStageModel_default.create({ userPublic, stage });
  const contents = stageData.contents.map(
    (challengeId) => UserChallengeService_default.setup(code, challengeId)
  );
  const contentsData = yield Promise.all(contents);
  userStageData.contents = contentsData.map((item) => item.id);
  yield userStageData.save();
  return userStageData.toObject();
});
var list5 = (params, TID) => __async(void 0, null, function* () {
  const skip = (params.page - 1) * params.limit;
  const filter = {
    deletedAt: null,
    "stage.name": { $regex: params.search, $options: "i" },
    "userPublic.code": TID
  };
  if (params.status) filter.status = params.status;
  const items = yield UserStageModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = yield UserStageModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: items.map(
      (item) => item.toObject({
        transform: (doc, ret) => {
          const _a = ret, { _id, __v, userPublic } = _a, rest = __objRest(_a, ["_id", "__v", "userPublic"]);
          return __spreadValues({ id: _id }, rest);
        }
      })
    ),
    page: params.page,
    totalItems,
    totalPages
  };
});
var detail4 = (id, TID) => __async(void 0, null, function* () {
  const item = yield UserStageModel_default.findOne({
    _id: id,
    deletedAt: null,
    "userPublic.code": TID
  });
  if (!item) throw new Error("stage not found");
  return item.toObject({
    transform: (doc, ret) => {
      const _a = ret, { _id, __v, userPublic } = _a, rest = __objRest(_a, ["_id", "__v", "userPublic"]);
      return __spreadValues({ id: _id }, rest);
    }
  });
});
var UserStageService = { verify: verify6, setup: setup3, list: list5, detail: detail4 };
var UserStageService_default = UserStageService;

// _src/services/TriviaService/index.ts
var sync2 = (challenge, items) => __async(void 0, null, function* () {
  const idName = { id: challenge.id, name: challenge.name };
  const create4 = items.filter((item) => !item.id).map((item) => __spreadProps(__spreadValues({}, item), { challenge: idName }));
  const update5 = items.filter((item) => item.id);
  yield TriviaModel_default.updateMany(
    { "challenge.id": challenge.id },
    { $set: { challenge: null } }
  );
  const actCreate = TriviaModel_default.insertMany(create4);
  const actUpdate = update5.map(
    (item) => TriviaModel_default.findOneAndUpdate({ _id: item.id }, { $set: item }, { new: true })
  );
  const [resCreate, ...resUpdate] = yield Promise.all([
    actCreate,
    ...actUpdate
  ]);
  const content2 = resUpdate.map((item) => item == null ? void 0 : item._id.toString()).concat(...resCreate.map((item) => item._id.toString())).filter((v) => v != void 0);
  yield ChallengeService_default.updateContent(challenge.id, content2);
  return content2;
});
var content = (challenge) => __async(void 0, null, function* () {
  const items = yield TriviaModel_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
});
var detail5 = (id) => __async(void 0, null, function* () {
});
var verify7 = (id) => __async(void 0, null, function* () {
});
var TriviaService = { sync: sync2, content, detail: detail5, verify: verify7 };
var TriviaService_default = TriviaService;

// _src/services/QrService/index.ts
var list6 = (params) => __async(void 0, null, function* () {
  const skip = (params.page - 1) * params.limit;
  const filter = { deletedAt: null };
  if (params.status) filter.status = params.status;
  if (params.code) filter.code = params.code;
  const items = yield QrModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = yield QrModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages
  };
});
var generate2 = (count) => __async(void 0, null, function* () {
  const items = new Array(count).fill({}).map(() => {
    const salt = Math.floor(Math.random() * Math.pow(16, 8)).toString(16).padStart(8, "0");
    return {
      code: import_crypto_js.default.SHA256(`${Date.now()}${salt}`).toString(import_crypto_js.default.enc.Hex),
      status: "draft" /* Draft */
    };
  });
  return QrModel_default.insertMany(items);
});
var detail6 = (id) => __async(void 0, null, function* () {
  const item = yield QrModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");
  return item.toObject();
});
var update3 = (id, payload) => __async(void 0, null, function* () {
  const { content: content2 } = payload;
  const item = yield QrModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");
  if (content2) {
    const serviceMap = {
      ["challenge" /* Challenge */]: ChallengeService_default,
      ["stage" /* Stage */]: StageService_default,
      ["trivia" /* Trivia */]: TriviaService_default
    };
    const service2 = serviceMap[content2.type];
    const action = payload.status === "draft" /* Draft */ ? "detail" : "verify";
    yield service2[action](content2.refId);
  }
  Object.assign(item, payload);
  yield item.save();
  return item.toObject();
});
var _delete3 = (id) => __async(void 0, null, function* () {
  const item = yield QrModel_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: /* @__PURE__ */ new Date() }
  );
  if (!item) throw new Error("item not found");
  return item;
});
var deleteMany = (ids) => __async(void 0, null, function* () {
  const changed = yield QrModel_default.updateMany(
    {
      _id: { $in: ids },
      deletedAt: null,
      status: "draft" /* Draft */
    },
    { $set: { deletedAt: /* @__PURE__ */ new Date() } }
  );
  if (changed.modifiedCount == 0) throw new Error("item not found");
  return changed;
});
var verify8 = (code, TID) => __async(void 0, null, function* () {
  const qrData = yield QrModel_default.findOne({
    code,
    deletedAt: null,
    status: "publish" /* Publish */
  });
  if (!qrData) throw new Error("qr code invalid");
  const { content: content2 } = qrData;
  if (!content2) throw new Error("invalid qr content");
  const services2 = {
    ["stage" /* Stage */]: UserStageService_default,
    ["challenge" /* Challenge */]: UserChallengeService_default,
    ["trivia" /* Trivia */]: null
  };
  const service2 = services2[content2.type];
  const data = yield service2 == null ? void 0 : service2.setup(TID, content2.refId, true);
  if (data) content2.refId = data.id;
  return content2;
});
var QrService = {
  generate: generate2,
  list: list6,
  detail: detail6,
  update: update3,
  delete: _delete3,
  deleteMany,
  verify: verify8
};
var QrService_default = QrService;

// _src/services/UserService/index.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var register = (payload, code) => __async(void 0, null, function* () {
  return yield db_default.transaction((session) => __async(void 0, null, function* () {
    const email = payload.email;
    const userExists = yield UserModel_default.findOne({ email }).session(session);
    if (userExists) throw new Error("email taken");
    const password = yield (0, import_bcryptjs.hash)(payload.password, 10);
    const [user] = yield UserModel_default.create(
      [
        {
          email,
          password,
          role: "public" /* Public */
        }
      ],
      { session }
    );
    yield UserPublicModel_default.findOneAndUpdate(
      { code },
      { $set: { user: { id: user._id, name: user.name } } },
      { new: true, session }
    );
    return user;
  }));
});
var login = (payload, secret) => __async(void 0, null, function* () {
  const email = payload.email;
  const user = yield UserModel_default.findOne({ email });
  if (!user) throw new Error("user not found");
  const isPasswordValid = yield (0, import_bcryptjs.compare)(payload.password, user.password);
  if (!isPasswordValid) throw new Error("invalid password");
  const userPublic = yield UserPublicModel_default.findOne({ "user.id": user._id });
  if (!userPublic) throw new Error("invalid user");
  const token = (0, import_jsonwebtoken.sign)({ id: user._id }, secret, {
    expiresIn: 30 * 24 * 60 * 60
  });
  const { _id: id, name } = user;
  return { id, name, email, TID: userPublic == null ? void 0 : userPublic.code, token };
});
var profile = (bearer) => __async(void 0, null, function* () {
});
var list7 = (params) => __async(void 0, null, function* () {
});
var create3 = (payload) => __async(void 0, null, function* () {
});
var detail7 = (id) => __async(void 0, null, function* () {
  const user = yield UserModel_default.findOne({ _id: id, deletedAt: null }).catch(() => {
  });
  if (!user) throw new Error("user not found");
  const meta = yield UserPublicModel_default.findOne({ "user.id": user._id }).catch(
    () => null
  );
  return __spreadProps(__spreadValues({}, user.toObject()), {
    meta: meta == null ? void 0 : meta.toObject({
      transform: (doc, ret) => {
        const _a = ret, { _id, user: user2, __v } = _a, data = __objRest(_a, ["_id", "user", "__v"]);
        return __spreadValues({ id: _id }, data);
      }
    })
  });
});
var update4 = (id, payload) => __async(void 0, null, function* () {
});
var _delete4 = (id) => __async(void 0, null, function* () {
});
var UserService = {
  register,
  login,
  profile,
  list: list7,
  create: create3,
  detail: detail7,
  update: update4,
  delete: _delete4
};
var UserService_default = UserService;

// _src/services/index.ts
var services = {
  ChallengeService: ChallengeService_default,
  QrService: QrService_default,
  StageService: StageService_default,
  TriviaService: TriviaService_default,
  UserChallengeService: UserChallengeService_default,
  UserPublicService: UserPublicService_default,
  UserService: UserService_default,
  UserStageService: UserStageService_default,
  UserTriviaService: UserTriviaService_default
};
var services_default = services;

// _src/index.ts
var import_mongoose12 = __toESM(require("mongoose"));
var index_default = { helpers: helpers_default, models: models_default, services: services_default, validators: validators_default, mongoose: import_mongoose12.default };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  helpers,
  models,
  mongoose,
  services,
  validators
});
