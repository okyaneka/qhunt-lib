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

// _src/services/QrService/index.ts
import CryptoJS from "crypto-js";

// _src/models/QrModel/index.ts
import { model, models, Schema as Schema2 } from "mongoose";

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
var QrModel_default = QrModel;

// _src/helpers/db/index.ts
import { startSession } from "mongoose";
var transaction = (operation) => __async(void 0, null, function* () {
  const session = yield startSession();
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

// _src/models/ChallengeModel/index.ts
import { model as model2, models as models2, Schema as Schema3 } from "mongoose";

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
var ChallengeFeedbackSchema = new Schema3(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsSchema = new Schema3(
  {
    type: { type: String, enum: Object.values(ChallengeType), required: true },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: ChallengeFeedbackSchema }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsForeignSchema = new Schema3(
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
var ChallengeForeignSchema = new Schema3(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: ChallengeSettingsSchema, required: true }
  },
  { _id: false }
);
var ChallengeSchema = new Schema3(
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
var ChallengeModel = models2.Challenge || model2("Challenge", ChallengeSchema);
var ChallengeModel_default = ChallengeModel;

// _src/models/StageModel/types.ts
var StageStatus = /* @__PURE__ */ ((StageStatus2) => {
  StageStatus2["Draft"] = "draft";
  StageStatus2["Publish"] = "publish";
  return StageStatus2;
})(StageStatus || {});

// _src/models/StageModel/index.ts
import { model as model3, models as models3, Schema as Schema4 } from "mongoose";
var StageSettingsSchema = new Schema4(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new Schema4(
  {
    periode: { type: PeriodSchema, required: true }
  },
  { _id: false }
);
var StageForeignSchema = new Schema4(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true }
  },
  { _id: false }
);
var StageSchema = new Schema4(
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
var StageModel = models3.Stage || model3("Stage", StageSchema);
var StageModel_default = StageModel;

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
  const list7 = yield ChallengeModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = yield ChallengeModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: list7.map((item) => item.toObject()),
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

// _src/models/UserChallengeModel/index.ts
import { model as model6, models as models6, Schema as Schema7 } from "mongoose";

// _src/models/UserChallengeModel/types.ts
var UserChallengeStatus = /* @__PURE__ */ ((UserChallengeStatus2) => {
  UserChallengeStatus2["Undiscovered"] = "undiscovered";
  UserChallengeStatus2["OnGoing"] = "ongoing";
  UserChallengeStatus2["Completed"] = "completed";
  UserChallengeStatus2["Failed"] = "failed";
  return UserChallengeStatus2;
})(UserChallengeStatus || {});

// _src/models/UserPublicModel/index.ts
import { model as model4, models as models4, Schema as Schema5 } from "mongoose";

// _src/models/UserPublicModel/types.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

// _src/models/UserPublicModel/index.ts
var UserPublicForeignSchema = new Schema5(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new Schema5(
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
var UserPublicModel = models4.UserPublic || model4("UserPublic", UserPublicSchema, "usersPublic");
var UserPublicModel_default = UserPublicModel;

// _src/models/UserStageModel/index.ts
import { model as model5, models as models5, Schema as Schema6 } from "mongoose";

// _src/models/UserStageModel/types.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/UserStageModel/index.ts
var UserStageForeignSchema = new Schema6(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserStageSchema = new Schema6(
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
var UserStageModel = models5.UserStage || model5("UserStage", UserStageSchema, "usersStage");
var UserStageModel_default = UserStageModel;

// _src/models/UserChallengeModel/index.ts
var UserChallengeForeignSchema = new Schema7(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserChallengeSchema = new Schema7(
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
var UserChallengeModel = models6.UserChallenge || model6("UserChallenge", UserChallengeSchema, "usersChallenge");
var UserChallengeModel_default = UserChallengeModel;

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

// _src/models/TriviaModel/index.ts
import { model as model7, models as models7, Schema as Schema8 } from "mongoose";
var TriviaOptionSchema = new Schema8(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 }
  },
  { _id: false, versionKey: false }
);
var TriviaForeignOptionSchema = new Schema8(
  {
    text: { type: String, required: true }
  },
  { _id: false }
);
var TriviaForeignSchema = new Schema8(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    allowMultiple: { type: Boolean, required: true },
    options: { type: [TriviaForeignOptionSchema], required: true }
  },
  { _id: false }
);
var TriviaSchema = new Schema8(
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
var TriviaModel = models7.Trivia || model7("Trivia", TriviaSchema);
var TriviaModel_default = TriviaModel;

// _src/models/UserTriviaModel/index.ts
import { model as model8, models as models8, Schema as Schema9 } from "mongoose";
var UserTriviaResultSchema = new Schema9(
  {
    answer: { type: String, required: true },
    feedback: { type: String, default: "" },
    isCorrect: { type: Boolean, required: true },
    score: { type: Number, required: true }
  },
  { _id: false }
);
var UserTriviaSchema = new Schema9(
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
var UserTriviaModel = models8.UserTrivia || model8("UserTrivia", UserTriviaSchema, "usersTrivia");
var UserTriviaModel_default = UserTriviaModel;

// _src/validators/ChallengeValidator/index.ts
import Joi6 from "joi";

// _src/validators/index.ts
import Joi5 from "joi";

// _src/validators/QrValidator/index.ts
import Joi2 from "joi";
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
  ids: schema_default.array(Joi2.string(), { required: true })
});

// _src/validators/StageValidator/index.ts
import Joi4 from "joi";

// _src/helpers/validator/index.ts
import Joi3 from "joi";
var PeriodeValidator = schema_default.generate({
  startDate: Joi3.date().required().greater("now"),
  endDate: Joi3.date().required().greater(Joi3.ref("startDate"))
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
  storyline: schema_default.array(Joi4.string()).default([]),
  contents: schema_default.array(Joi4.string()).default([]),
  status: schema_default.string({ required: true }).valid(...Object.values(StageStatus)),
  settings: StageSettingsValidator.required()
});
var StageForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(Joi4.string(), { defaultValue: [] }),
  settings: schema_default.generate({
    periode: PeriodeValidator.allow(null)
  })
});

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

// _src/validators/UserPublicValidator/index.ts
var UserPublicForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  code: schema_default.string({ required: true }),
  name: schema_default.string({ required: true, allow: "" })
});

// _src/validators/UserStageValidator/index.ts
var UserStageForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  stageId: schema_default.string({ required: true }),
  name: schema_default.string({ required: true })
});
var UserStageListParamsValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListParamsFields), {
  status: schema_default.string({ allow: "" }).valid(...Object.values(UserStageStatus))
}));

// _src/models/UserModel/index.ts
import { model as model9, models as models9, Schema as Schema10 } from "mongoose";

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
var UserSchema = new Schema10(
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
var UserModel = models9.User || model9("User", UserSchema);

// _src/validators/UserValidator/index.ts
var UserPayloadValidator = schema_default.generate({
  email: schema_default.string({ required: true }).email(),
  password: schema_default.string({ required: true })
});
var UserListQueryValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListQueryFields), {
  role: schema_default.string({ defaultValue: null }).valid(...Object.values(UserRole))
}));

// _src/validators/index.ts
var DefaultListParamsFields = {
  page: Joi5.number().default(1),
  limit: Joi5.number().default(10),
  search: Joi5.string().allow("").default("")
};
var DefaultListQueryFields = {
  page: schema_default.number({ defaultValue: 1 }),
  limit: schema_default.number({ defaultValue: 1 }),
  search: schema_default.string({ defaultValue: "", allow: "" })
};

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
  storyline: schema_default.array(Joi6.string(), { defaultValue: [] }),
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
  ), { list: list7 } = _a, rest = __objRest(_a, ["list"]);
  return __spreadValues({
    list: list7.map((_b) => {
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
  const services = {
    ["trivia" /* Trivia */]: UserTriviaService_default
  };
  return yield services[challengeType].details(contents, TID);
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
  const create3 = items.filter((item) => !item.id).map((item) => __spreadProps(__spreadValues({}, item), { challenge: idName }));
  const update4 = items.filter((item) => item.id);
  yield TriviaModel_default.updateMany(
    { "challenge.id": challenge.id },
    { $set: { challenge: null } }
  );
  const actCreate = TriviaModel_default.insertMany(create3);
  const actUpdate = update4.map(
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
      code: CryptoJS.SHA256(`${Date.now()}${salt}`).toString(CryptoJS.enc.Hex),
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
  const services = {
    ["stage" /* Stage */]: UserStageService_default,
    ["challenge" /* Challenge */]: UserChallengeService_default,
    ["trivia" /* Trivia */]: null
  };
  const service2 = services[content2.type];
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
export {
  _delete3 as _delete,
  QrService_default as default,
  deleteMany,
  detail6 as detail,
  generate2 as generate,
  list6 as list,
  update3 as update,
  verify8 as verify
};
