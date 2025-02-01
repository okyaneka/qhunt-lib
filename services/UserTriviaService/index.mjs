// _src/models/UserTriviaModel/index.ts
import { model as model8, models as models8, Schema as Schema9 } from "mongoose";

// _src/models/UserPublicModel/index.ts
import { model as model2, models as models2, Schema as Schema3 } from "mongoose";

// _src/models/UserPublicModel/types.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

// _src/helpers/model/index.ts
import { Schema } from "mongoose";
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
var FeedbackSchema = new Schema(
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

// _src/models/UserModel/index.ts
import { model, models, Schema as Schema2 } from "mongoose";

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
var UserForeignSchema = new Schema2(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" }
  },
  { _id: false }
);
var UserSchema = new Schema2(
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
var UserModel = models.User || model("User", UserSchema);

// _src/models/UserPublicModel/index.ts
var UserPublicForeignSchema = new Schema3(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new Schema3(
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
var UserPublicModel = models2.UserPublic || model2("UserPublic", UserPublicSchema, "usersPublic");

// _src/models/UserChallengeModel/index.ts
import { model as model6, models as models6, Schema as Schema7 } from "mongoose";

// _src/models/UserChallengeModel/types.ts
var UserChallengeStatusValues = {
  Undiscovered: "undiscovered",
  Discovered: "discovered",
  OnGoing: "ongoing",
  Completed: "completed",
  Failed: "failed"
};

// _src/models/ChallengeModel/index.ts
import { model as model3, models as models3, Schema as Schema4 } from "mongoose";

// _src/helpers/common/index.ts
import deepmerge from "deepmerge";

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

// _src/helpers/qrcode/index.ts
import { BrowserQRCodeReader } from "@zxing/browser";

// _src/helpers/schema/index.ts
import Joi from "joi";
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
    Joi.array().items(item)
  );
  if (options?.required) v = v.min(1);
  if (options?.defaultValue) v.default(options.defaultValue);
  if (options?.allow) v.allow(options.allow);
  return v;
};
var generate = (fields) => Joi.object(fields);
var schema = {
  createValidator,
  string,
  number,
  boolean,
  array,
  generate
};
var schema_default = schema;

// _src/helpers/types/index.ts
var PublishingStatusValues = {
  Draft: "draft",
  Publish: "publish"
};

// _src/models/ChallengeModel/types.ts
var ChallengeStatusValues = PublishingStatusValues;
var ChallengeTypeValues = {
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};

// _src/models/ChallengeModel/index.ts
var ChallengeSettingsSchema = new Schema4(
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
var ChallengeSettingsForeignSchema = new Schema4(
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
var ChallengeForeignSchema = new Schema4(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    order: { type: Number, default: null }
  },
  { _id: false }
);
var ChallengeSchema = new Schema4(
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
var ChallengeModel = models3.Challenge || model3("Challenge", ChallengeSchema);
var ChallengeModel_default = ChallengeModel;

// _src/models/UserStageModel/index.ts
import { model as model5, models as models5, Schema as Schema6 } from "mongoose";

// _src/models/UserStageModel/types.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/StageModel/types.ts
var StageStatusValues = PublishingStatusValues;

// _src/models/StageModel/index.ts
import { model as model4, models as models4, Schema as Schema5 } from "mongoose";
var StageSettingsSchema = new Schema5(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new Schema5(
  {
    periode: { type: PeriodSchema, required: true }
  },
  { _id: false }
);
var StageForeignSchema = new Schema5(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true }
  },
  { _id: false }
);
var StageSchema = new Schema5(
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
var StageModel = models4.Stage || model4("Stage", StageSchema);
var StageModel_default = StageModel;

// _src/models/UserStageModel/index.ts
var UserStageForeignSchema = new Schema6(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserStageResultSchema = new Schema6(
  {
    baseScore: { type: Number, required: true },
    challengeBonus: { type: Number, required: true },
    bonus: { type: Number, required: true },
    totalScore: { type: Number, required: true }
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
    results: { type: UserStageResultSchema, default: null },
    contents: { type: [String], default: [] }
  },
  { timestamps: true }
);
UserStageSchema.set("toJSON", ToObject);
UserStageSchema.set("toObject", ToObject);
var UserStageModel = models5.UserStage || model5("UserStage", UserStageSchema, "usersStage");

// _src/models/UserChallengeModel/index.ts
var UserChallengeForeignSchema = new Schema7(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserChallengeResultSchema = new Schema7(
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
var UserChallengeSchema = new Schema7(
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
var UserChallengeModel = models6.UserChallenge || model6("UserChallenge", UserChallengeSchema, "usersChallenge");

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
    feedback: { type: FeedbackSchema, default: {} },
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
var ToObject3 = {
  transform: (doc, ret) => {
    const { _id, __v, userPublic, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};
var UserTriviaResultSchema = new Schema9(
  {
    answer: { type: String, default: null },
    feedback: { type: String, default: null },
    isCorrect: { type: Boolean, required: true },
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true }
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
UserTriviaSchema.set("toJSON", ToObject3);
UserTriviaSchema.set("toObject", ToObject3);
var UserTriviaModel = models8.UserTrivia || model8("UserTrivia", UserTriviaSchema, "usersTrivia");
var UserTriviaModel_default = UserTriviaModel;

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
var FeedbackValidator = schema_default.generate({
  positive: schema_default.string({ allow: "", defaultValue: "" }),
  negative: schema_default.string({ allow: "", defaultValue: "" })
}).default({ positive: "", negative: "" });

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
var list = async (params) => {
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
  const sync = contents.map((item) => {
    item.stage = { id: stage.id, name: stage.name };
    return item.save();
  });
  await Promise.all(sync);
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
var StageService = { list, create, detail, update, delete: _delete, verify };
var StageService_default = StageService;

// _src/services/ChallengeService/index.ts
var list2 = async (params) => {
  const skip = (params.page - 1) * params.limit;
  const filter = { deletedAt: null };
  if (params.stageId === "null") filter["stage"] = null;
  else if (params.stageId) filter["stage.id"] = params.stageId;
  if (params.type) filter["settings.type"] = params.type;
  const list3 = await ChallengeModel_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await ChallengeModel_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: list3.map((item) => item.toObject()),
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
  list: list2,
  create: create2,
  detail: detail2,
  // detailContent,
  update: update2,
  updateContent,
  delete: _delete2,
  verify: verify2
};
var ChallengeService_default = ChallengeService;

// _src/services/TriviaService/index.ts
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

// _src/services/UserTriviaService/index.ts
var verify3 = async (triviaId, TID) => {
  const item = await UserTriviaModel_default.findOne({
    "userPublic.code": TID,
    "trivia.id": triviaId,
    deletedAt: null
  });
  if (!item) throw new Error("user trivia not found");
  return item;
};
var setup = async (userPublic, userChallenge) => {
  const trivias = await details(userChallenge.challengeId);
  const payload = trivias.map(async (item) => {
    const trivia = await TriviaForeignValidator.validateAsync(item, {
      stripUnknown: true
    });
    const userTrivia = await verify3(trivia.id, userPublic.code).catch(
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
  const [summary2] = await UserTriviaModel_default.aggregate().match({
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
  return summary2;
};
var UserTriviaService = {
  setup,
  details: details2,
  submit,
  submitEmpties,
  summary
};
var UserTriviaService_default = UserTriviaService;
export {
  UserTriviaService_default as default,
  details2 as details,
  setup,
  submit,
  submitEmpties,
  summary,
  verify3 as verify
};
