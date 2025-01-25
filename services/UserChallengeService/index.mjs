// _src/helpers/db/index.ts
import { startSession } from "mongoose";
var transaction = async (operation) => {
  const session = await startSession();
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

// _src/helpers/schema/index.ts
import Joi from "joi";
import { Schema } from "mongoose";
var createValidator = (base, option) => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== void 0) v = v.allow(option.allow);
  if (option?.defaultValue !== void 0) v = v.default(option.defaultValue);
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
  if (options?.required) v = v.min(1);
  return v;
};
var generate = (fields) => Joi.object(fields);
var ToObject = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id.toString(), ...rest };
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

// _src/helpers/service/index.ts
var list = async (model10, page, limit, filters = {}, sort) => {
  const skip = (page - 1) * limit;
  const filter = {
    ...filters,
    deletedAt: null
  };
  const items = await model10.find(filter).skip(skip).limit(limit).sort(sort ?? { createdAt: -1 });
  const totalItems = await model10.countDocuments(filter);
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
    order: { type: Number, default: null }
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
    order: { type: Number, default: null },
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

// _src/models/StageModel/types.ts
var StageStatus = /* @__PURE__ */ ((StageStatus2) => {
  StageStatus2["Draft"] = "draft";
  StageStatus2["Publish"] = "publish";
  return StageStatus2;
})(StageStatus || {});

// _src/models/StageModel/index.ts
import { model as model2, models as models2, Schema as Schema3 } from "mongoose";
var StageSettingsSchema = new Schema3(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new Schema3(
  {
    periode: { type: PeriodSchema, required: true }
  },
  { _id: false }
);
var StageForeignSchema = new Schema3(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true }
  },
  { _id: false }
);
var StageSchema = new Schema3(
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
var StageModel = models2.Stage || model2("Stage", StageSchema);
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
  const sync2 = contents.map((item) => {
    item.stage = { id: stage.id, name: stage.name };
    return item.save();
  });
  await Promise.all(sync2);
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
  if (item.status !== "publish" /* Publish */)
    throw new Error("stage not published yet");
  return item.toObject();
};
var StageService = { list: list2, create, detail, update, delete: _delete, verify };
var StageService_default = StageService;

// _src/models/TriviaModel/index.ts
import { model as model3, models as models3, Schema as Schema4 } from "mongoose";
var TriviaOptionSchema = new Schema4(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 }
  },
  { _id: false, versionKey: false }
);
var TriviaForeignOptionSchema = new Schema4(
  {
    text: { type: String, required: true }
  },
  { _id: false }
);
var TriviaForeignSchema = new Schema4(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    allowMultiple: { type: Boolean, required: true },
    options: { type: [TriviaForeignOptionSchema], required: true }
  },
  { _id: false }
);
var TriviaSchema = new Schema4(
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
var TriviaModel = models3.Trivia || model3("Trivia", TriviaSchema);
var TriviaModel_default = TriviaModel;

// _src/services/TriviaService/index.ts
var sync = async (challenge, items) => {
  const idName = { id: challenge.id, name: challenge.name };
  const create3 = items.filter((item) => !item.id).map((item) => ({ ...item, challenge: idName }));
  const update3 = items.filter((item) => item.id);
  await TriviaModel_default.updateMany(
    { "challenge.id": challenge.id },
    { $set: { challenge: null } }
  );
  const actCreate = TriviaModel_default.insertMany(create3);
  const actUpdate = update3.map(
    (item) => TriviaModel_default.findOneAndUpdate({ _id: item.id }, { $set: item }, { new: true })
  );
  const [resCreate, ...resUpdate] = await Promise.all([
    actCreate,
    ...actUpdate
  ]);
  const content2 = resUpdate.map((item) => item?._id.toString()).concat(...resCreate.map((item) => item._id.toString())).filter((v) => v != void 0);
  await ChallengeService_default.updateContent(challenge.id, content2);
  return content2;
};
var content = async (challenge) => {
  const items = await TriviaModel_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};
var detail2 = async (id) => {
};
var verify2 = async (id) => {
};
var TriviaService = { sync, content, detail: detail2, verify: verify2 };
var TriviaService_default = TriviaService;

// _src/services/ChallengeService/index.ts
var list3 = async (params) => {
  const skip = (params.page - 1) * params.limit;
  const filter = { deletedAt: null };
  if (params.stageId == "null") filter.stage = null;
  else if (params.stageId) filter["stage.id"] = params.stageId;
  const list6 = await ChallengeModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await ChallengeModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: list6.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages
  };
};
var create2 = async (payload) => {
  const { stageId, ...value } = payload;
  const stage = await StageService_default.detail(stageId).catch(() => null);
  value.stage = stage ? { id: stage.id, name: stage.name } : null;
  const item = await ChallengeModel_default.create(value);
  if (stage) {
    const contents = stage.contents || [];
    contents.push(item.id);
    item.order = contents.length;
    await Promise.all([
      StageModel_default.findOneAndUpdate({ _id: stageId }, { $set: { contents } }),
      item.save()
    ]);
  }
  return item.toObject();
};
var detail3 = async (id) => {
  const item = await ChallengeModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var detailContent = async (id) => {
  const item = await ChallengeModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  const services = {
    ["trivia" /* Trivia */]: TriviaService_default
  };
  return await services[item.settings.type].content(item);
};
var update2 = async (id, payload) => {
  return await db_default.transaction(async (session) => {
    const { stageId, ...value } = payload;
    const item = await ChallengeModel_default.findOne({ _id: id, deletedAt: null });
    if (!item) throw new Error("challenge not found");
    const newStage = await StageService_default.detail(stageId).catch(() => null);
    const oldStage = item?.stage?.id && item.stage.id != stageId ? await StageService_default.detail(item.stage.id).catch(() => null) : null;
    const newContent = newStage?.contents || [];
    const oldContent = oldStage?.contents || [];
    value.stage = newStage ? { id: newStage.id, name: newStage.name } : null;
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
    Object.assign(item, value);
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
var verify3 = async (id) => {
  const item = await ChallengeModel_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  if (item.status !== "publish" /* Publish */)
    throw new Error("challenge not published yet");
  return item.toObject();
};
var ChallengeService = {
  list: list3,
  create: create2,
  detail: detail3,
  detailContent,
  update: update2,
  updateContent,
  delete: _delete2,
  verify: verify3
};
var ChallengeService_default = ChallengeService;

// _src/models/UserChallengeModel/index.ts
import { model as model7, models as models7, Schema as Schema8 } from "mongoose";

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
import { model as model5, models as models5, Schema as Schema6 } from "mongoose";

// _src/models/UserPublicModel/types.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

// _src/models/UserModel/index.ts
import { model as model4, models as models4, Schema as Schema5 } from "mongoose";

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
var UserForeignSchema = new Schema5(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" }
  },
  { _id: false }
);
var UserSchema = new Schema5(
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
var UserModel = models4.User || model4("User", UserSchema);
var UserModel_default = UserModel;

// _src/models/UserPublicModel/index.ts
var UserPublicForeignSchema = new Schema6(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new Schema6(
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
var UserPublicModel = models5.UserPublic || model5("UserPublic", UserPublicSchema, "usersPublic");
var UserPublicModel_default = UserPublicModel;

// _src/models/UserStageModel/index.ts
import { model as model6, models as models6, Schema as Schema7 } from "mongoose";

// _src/models/UserStageModel/types.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/UserStageModel/index.ts
var UserStageForeignSchema = new Schema7(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserStageSchema = new Schema7(
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
var UserStageModel = models6.UserStage || model6("UserStage", UserStageSchema, "usersStage");
var UserStageModel_default = UserStageModel;

// _src/models/UserChallengeModel/index.ts
var UserChallengeForeignSchema = new Schema8(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserChallengeResultSchema = new Schema8(
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
var UserChallengeSchema = new Schema8(
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
var UserChallengeModel = models7.UserChallenge || model7("UserChallenge", UserChallengeSchema, "usersChallenge");
var UserChallengeModel_default = UserChallengeModel;

// _src/services/UserPublicService/index.ts
import { enc, lib, SHA256 } from "crypto-js";

// _src/models/QrModel/index.ts
import { model as model8, models as models8, Schema as Schema9 } from "mongoose";

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
var QrContentSchema = new Schema9(
  {
    type: { type: String, enum: Object.values(QrContentType), required: true },
    refId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrLocationSchema = new Schema9(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new Schema9(
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
var QrModel = models8.Qr || model8("Qr", QrSchema);

// _src/models/UserTriviaModel/index.ts
import { model as model9, models as models9, Schema as Schema10 } from "mongoose";
var ToObject3 = {
  transform: (doc, ret) => {
    const { _id, __v, userPublic, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};
var UserTriviaResultSchema = new Schema10(
  {
    answer: { type: String, required: true },
    feedback: { type: String, default: "" },
    isCorrect: { type: Boolean, required: true },
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true }
  },
  { _id: false }
);
var UserTriviaSchema = new Schema10(
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
var UserTriviaModel = models9.UserTrivia || model9("UserTrivia", UserTriviaSchema, "usersTrivia");
var UserTriviaModel_default = UserTriviaModel;

// _src/services/UserPublicService/index.ts
var verify4 = async (value) => {
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
  const salt = lib.WordArray.random(4).toString(enc.Hex);
  const code = SHA256(`${timestamp}${salt}`).toString(enc.Hex);
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
var UserPublicService = { verify: verify4, setup };
var UserPublicService_default = UserPublicService;

// _src/validators/StageValidator/index.ts
import Joi3 from "joi";

// _src/helpers/validator/index.ts
import Joi2 from "joi";
var PeriodeValidator = schema_default.generate({
  startDate: Joi2.date().required(),
  endDate: Joi2.date().required().greater(Joi2.ref("startDate"))
});
var DefaultListParamsFields = {
  page: schema_default.number({ defaultValue: 1 }),
  limit: schema_default.number({ defaultValue: 10 }),
  search: schema_default.string({ allow: "", defaultValue: "" })
};

// _src/validators/StageValidator/index.ts
var StageSettingsValidator = schema_default.generate(
  {
    canDoRandomChallenges: schema_default.boolean({ defaultValue: false }),
    canStartFromChallenges: schema_default.boolean({ defaultValue: false }),
    periode: PeriodeValidator.allow(null)
  }
);
var StageListParamsValidator = schema_default.generate({
  ...DefaultListParamsFields,
  status: schema_default.string({ allow: null }).valid(...Object.values(StageStatus))
});
var StagePayloadValidator = schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(Joi3.string()).default([]),
  contents: schema_default.array(Joi3.string()).default([]),
  status: schema_default.string({ required: true }).valid(...Object.values(StageStatus)),
  settings: StageSettingsValidator.required()
});
var StageForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(Joi3.string(), { defaultValue: [] }),
  settings: schema_default.generate({
    periode: PeriodeValidator.allow(null)
  })
});

// _src/validators/UserPublicValidator/index.ts
var UserPublicForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  code: schema_default.string({ required: true }),
  name: schema_default.string({ required: true, allow: "" })
});

// _src/services/UserStageService/index.ts
var verify5 = async (code, stageId) => {
  const item = await UserStageModel_default.findOne({
    "userPublic.code": code,
    "stage.id": stageId,
    deletedAt: null
  });
  if (!item) throw new Error("user stage not found");
  return item.toObject();
};
var setup2 = async (code, stageId) => {
  const exist = await verify5(code, stageId).catch(() => null);
  if (exist) return exist;
  const userPublicData = await UserPublicService_default.verify(code);
  const stageData = await StageService_default.verify(stageId);
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
    (challengeId) => UserChallengeService_default.setup(code, challengeId)
  );
  const contentsData = await Promise.all(contents).catch(async (err) => {
    await userStageData.deleteOne();
    throw err;
  });
  userStageData.contents = contentsData.map((item) => item.id);
  await userStageData.save();
  return userStageData.toObject();
};
var list4 = async (params, TID) => {
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
var detail4 = async (id, TID) => {
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
var UserStageService = { verify: verify5, setup: setup2, list: list4, detail: detail4 };
var UserStageService_default = UserStageService;

// _src/validators/ChallengeValidator/index.ts
import Joi4 from "joi";
var ChallengeListParamsValidator = schema_default.generate({
  ...DefaultListParamsFields,
  stageId: schema_default.string().allow("").default("")
});
var ChallengeFeedbackValidator = schema_default.generate({
  positive: schema_default.string({ allow: "", defaultValue: "" }),
  negative: schema_default.string({ allow: "", defaultValue: "" })
}).default({ positive: "", negative: "" });
var ChallengeSettingsValidator = schema_default.generate({
  clue: schema_default.string({ defaultValue: "" }),
  duration: schema_default.number({ defaultValue: 0 }),
  type: schema_default.string({ required: true }).valid(...Object.values(ChallengeType)),
  feedback: ChallengeFeedbackValidator
});
var ChallengeForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  order: schema_default.number({ defaultValue: null }),
  storyline: schema_default.array(Joi4.string(), { defaultValue: [] })
});
var ChallengeSettingsForeignValidator = schema_default.generate({
  duration: schema_default.number({ allow: 0 }),
  type: schema_default.string({ required: true }).valid(...Object.values(ChallengeType))
});
var ChallengePayloadValidator = schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(schema_default.string()).default([]),
  stageId: schema_default.string({ required: true }),
  status: schema_default.string({ required: true }).valid(...Object.values(ChallengeStatus)),
  settings: ChallengeSettingsValidator.required()
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
var verify6 = async (triviaId, TID) => {
  const item = await UserTriviaModel_default.findOne({
    "userPublic.code": TID,
    "trivia.id": triviaId,
    deletedAt: null
  });
  if (!item) throw new Error("user challenge is undiscovered");
  return item;
};
var setup3 = async (userPublic, userChallenge, content2) => {
  const trivias = await TriviaModel_default.find({ _id: { $in: content2 } });
  const payload = trivias.map((item) => item.toObject()).map(async (item) => {
    const trivia = await TriviaForeignValidator.validateAsync(item, {
      stripUnknown: true
    });
    const userTrivia = await verify6(trivia.id, userPublic.code).catch(
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
var details = async (ids, TID, hasResult) => {
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
var UserTriviaService = { setup: setup3, details };
var UserTriviaService_default = UserTriviaService;

// _src/services/UserChallengeService/index.ts
var verify7 = async (code, challengeId, isDiscover) => {
  const item = await UserChallengeModel_default.findOne({
    "userPublic.code": code,
    "challenge.id": challengeId,
    deletedAt: null
  });
  if (!item) throw new Error("user challenge is undiscovered");
  if (isDiscover) {
    item.status = "discovered" /* Discovered */;
    await item.save();
  }
  return item.toObject();
};
var discover = async (id) => {
  const item = await UserChallengeModel_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set: { status: "discovered" /* Discovered */ }
    },
    { new: true }
  );
  if (!item) throw new Error("user challenge is undiscovered");
  return item.toObject();
};
var setup4 = async (code, challengeId, isDiscover) => {
  const exist = await verify7(code, challengeId).catch(() => null);
  if (exist) return await discover(exist.id);
  const userPublicData = await UserPublicService_default.verify(code);
  const challengeData = await ChallengeService_default.verify(challengeId);
  const stageId = challengeData.stage?.id;
  const userStageData = stageId ? await UserStageService_default.verify(code, stageId).catch(() => null) : null;
  if (stageId && !userStageData) {
    const stageData = await StageService_default.detail(stageId);
    if (!stageData.settings.canStartFromChallenges)
      throw new Error("user stage not discovered yet");
    await UserStageService_default.setup(code, stageId);
    return await verify7(code, challengeId, isDiscover);
  }
  const userStage = userStageData ? {
    id: userStageData.id,
    stageId: userStageData.stage.id,
    name: userStageData.stage.name
  } : null;
  const userPublic = await UserPublicForeignValidator.validateAsync(
    userPublicData,
    {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    }
  );
  const challenge = await ChallengeForeignValidator.validateAsync(
    challengeData,
    {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    }
  );
  const settings = await ChallengeSettingsForeignValidator.validateAsync(
    challengeData.settings,
    {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    }
  );
  const userChallengeData = await UserChallengeModel_default.create({
    userStage,
    challenge,
    userPublic,
    settings,
    status: isDiscover ? "discovered" /* Discovered */ : "undiscovered" /* Undiscovered */
  });
  const userChallenge = {
    id: userChallengeData.id,
    challengeId: userChallengeData.challenge.id,
    name: userChallengeData.challenge.name
  };
  const services = {
    ["trivia" /* Trivia */]: UserTriviaService_default
  };
  const contents = await services[settings.type].setup(
    userPublic,
    userChallenge,
    challengeData.contents
  );
  userChallengeData.contents = contents;
  await userChallengeData.save();
  return userChallengeData.toObject();
};
var list5 = async (params, TID) => {
  const { search, status, userStageId } = params;
  const filters = { "userPublic.code": TID };
  if (search) filters["challenge.name"] = { $regex: search, $options: "i" };
  if (status) filters.status = status;
  if (userStageId) filters["userStage.id"] = userStageId;
  const { list: list6, ...rest } = await service_default.list(
    UserChallengeModel_default,
    params.page,
    params.limit,
    filters,
    "challenge.order"
  );
  return {
    list: list6.map(({ userPublic, ...item }) => item),
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
var detailContent2 = async (id, TID, hasResult) => {
  const data = await UserChallengeModel_default.findOne({
    _id: id,
    deletedAt: null,
    "userPublic.code": TID
  });
  if (!data) throw new Error("user challenge not found");
  const {
    status,
    settings: { type: challengeType },
    contents
  } = data;
  if (status === "undiscovered" /* Undiscovered */)
    throw new Error("user challenge is undiscovered");
  const services = {
    ["trivia" /* Trivia */]: UserTriviaService_default
  };
  return await services[challengeType].details(contents, TID, hasResult);
};
var submit = async (id, payload, TID) => {
};
var UserChallengeService = {
  verify: verify7,
  setup: setup4,
  list: list5,
  detail: detail5,
  detailContent: detailContent2,
  submit
};
var UserChallengeService_default = UserChallengeService;
export {
  UserChallengeService_default as default,
  detail5 as detail,
  detailContent2 as detailContent,
  discover,
  list5 as list,
  setup4 as setup,
  submit,
  verify7 as verify
};
