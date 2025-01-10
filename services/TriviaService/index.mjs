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

// _src/models/TriviaModel/index.ts
import { model as model2, models as models2, Schema as Schema3 } from "mongoose";

// _src/helpers/schema/index.ts
import Joi from "joi";
import { Schema } from "mongoose";
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

// _src/models/ChallengeModel/index.ts
import { model, models, Schema as Schema2 } from "mongoose";

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
var ChallengeFeedbackSchema = new Schema2(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsSchema = new Schema2(
  {
    type: { type: String, enum: Object.values(ChallengeType), required: true },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: ChallengeFeedbackSchema }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsForeignSchema = new Schema2(
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
var ChallengeForeignSchema = new Schema2(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: ChallengeSettingsSchema, required: true }
  },
  { _id: false }
);
var ChallengeSchema = new Schema2(
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
var ChallengeModel = models.Challenge || model("Challenge", ChallengeSchema);
var ChallengeModel_default = ChallengeModel;

// _src/models/TriviaModel/index.ts
var TriviaOptionSchema = new Schema3(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 }
  },
  { _id: false, versionKey: false }
);
var TriviaForeignOptionSchema = new Schema3(
  {
    text: { type: String, required: true }
  },
  { _id: false }
);
var TriviaForeignSchema = new Schema3(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    allowMultiple: { type: Boolean, required: true },
    options: { type: [TriviaForeignOptionSchema], required: true }
  },
  { _id: false }
);
var TriviaSchema = new Schema3(
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
var TriviaModel = models2.Trivia || model2("Trivia", TriviaSchema);
var TriviaModel_default = TriviaModel;

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
var list = (params) => __async(void 0, null, function* () {
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
  const sync2 = contents.map((item) => {
    item.stage = { id: stage.id, name: stage.name };
    return item.save();
  });
  yield Promise.all(sync2);
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
var StageService = { list, create, detail, update, delete: _delete, verify };
var StageService_default = StageService;

// _src/services/ChallengeService/index.ts
var list2 = (params) => __async(void 0, null, function* () {
  const skip = (params.page - 1) * params.limit;
  const filter = { deletedAt: null };
  if (params.stageId == "null") filter.stage = null;
  else if (params.stageId) filter["stage.id"] = params.stageId;
  const list3 = yield ChallengeModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = yield ChallengeModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: list3.map((item) => item.toObject()),
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
  list: list2,
  create: create2,
  detail: detail2,
  update: update2,
  updateContent,
  delete: _delete2,
  verify: verify2
};
var ChallengeService_default = ChallengeService;

// _src/services/TriviaService/index.ts
var sync = (challenge, items) => __async(void 0, null, function* () {
  const idName = { id: challenge.id, name: challenge.name };
  const create3 = items.filter((item) => !item.id).map((item) => __spreadProps(__spreadValues({}, item), { challenge: idName }));
  const update3 = items.filter((item) => item.id);
  yield TriviaModel_default.updateMany(
    { "challenge.id": challenge.id },
    { $set: { challenge: null } }
  );
  const actCreate = TriviaModel_default.insertMany(create3);
  const actUpdate = update3.map(
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
var detail3 = (id) => __async(void 0, null, function* () {
});
var verify3 = (id) => __async(void 0, null, function* () {
});
var TriviaService = { sync, content, detail: detail3, verify: verify3 };
var TriviaService_default = TriviaService;
export {
  content,
  TriviaService_default as default,
  detail3 as detail,
  sync,
  verify3 as verify
};
