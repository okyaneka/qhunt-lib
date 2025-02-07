'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dayjs = require('dayjs');
require('deepmerge');
var mongoose = require('mongoose');
require('@zxing/browser');
var Joi = require('joi');
require('crypto-js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var dayjs__default = /*#__PURE__*/_interopDefault(dayjs);
var Joi__default = /*#__PURE__*/_interopDefault(Joi);

// _src/services/user-challenge/index.ts
var transaction = async (operation) => {
  const session = await mongoose.startSession();
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
var IdNameSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var PeriodSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);
var FeedbackSchema = new mongoose.Schema(
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
var createValidator = (base, option) => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== undefined) v = v.allow(option.allow);
  if (option?.defaultValue !== undefined) v = v.default(option.defaultValue);
  return v;
};
var string = (option) => createValidator(Joi__default.default.string().trim(), option);
var number = (option) => createValidator(Joi__default.default.number(), option);
var boolean = (option) => createValidator(Joi__default.default.boolean(), option);
var array = (item, options) => {
  let v = createValidator(
    Joi__default.default.array().items(item)
  );
  if (options?.required) v = v.min(1);
  if (options?.defaultValue) v.default(options.defaultValue);
  if (options?.allow) v.allow(options.allow);
  return v;
};
var generate = (fields) => Joi__default.default.object(fields);
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
var PUBLISHING_STATUS = {
  Draft: "draft",
  Publish: "publish"
};

// _src/types/challenge/index.ts
var CHALLENGE_STATUS = PUBLISHING_STATUS;
var CHALLENGE_TYPES = {
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};

// _src/types/photo-hunt/index.ts
var PHOTO_HUNT_STATUS = PUBLISHING_STATUS;

// _src/types/qr/index.ts
var QR_STATUS = PUBLISHING_STATUS;
var QR_CONTENT_TYPES = {
  Stage: "stage",
  Challenge: "challenge",
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};

// _src/types/stage/index.ts
var STAGE_STATUS = PUBLISHING_STATUS;

// _src/types/user/index.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Admin"] = "admin";
  UserRole2["Private"] = "private";
  UserRole2["Public"] = "public";
  return UserRole2;
})(UserRole || {});

// _src/types/user-challenge/index.ts
var USER_CHALLENGE_STATUS = {
  Undiscovered: "undiscovered",
  Discovered: "discovered",
  OnGoing: "ongoing",
  Completed: "completed",
  Failed: "failed"
};

// _src/types/user-public/index.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

// _src/types/user-stage/index.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/challenge/index.ts
var ChallengeSettingsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(CHALLENGE_TYPES),
      required: true
    },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: FeedbackSchema }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsForeignSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(CHALLENGE_TYPES),
      required: true
    },
    duration: { type: Number }
  },
  { _id: false }
);
var ChallengeForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    order: { type: Number, default: null }
  },
  { _id: false }
);
var ChallengeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stage: { type: IdNameSchema, default: null },
    storyline: { type: [String] },
    status: {
      type: String,
      enum: Object.values(CHALLENGE_STATUS),
      default: CHALLENGE_STATUS.Draft
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
var ChallengeModel = mongoose.models.Challenge || mongoose.model("Challenge", ChallengeSchema);
var challenge_default = ChallengeModel;
var QrForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrContentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(QR_CONTENT_TYPES),
      required: true
    },
    refId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrLocationSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: Object.values(QR_STATUS),
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
mongoose.models.Qr || mongoose.model("Qr", QrSchema);
var StageSettingsSchema = new mongoose.Schema(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new mongoose.Schema(
  {
    periode: { type: PeriodSchema, required: true }
  },
  { _id: false }
);
var StageForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true }
  },
  { _id: false }
);
var StageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    status: {
      type: String,
      enum: Object.values(STAGE_STATUS),
      default: STAGE_STATUS.Draft
    },
    settings: { type: StageSettingsSchema, required: true },
    contents: { type: [String], default: [] },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
StageSchema.set("toObject", ToObject);
StageSchema.set("toJSON", ToObject);
var StageModel = mongoose.models.Stage || mongoose.model("Stage", StageSchema);
var stage_default = StageModel;
var TriviaOptionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 }
  },
  { _id: false, versionKey: false }
);
var TriviaForeignOptionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true }
  },
  { _id: false }
);
var TriviaForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    allowMultiple: { type: Boolean, required: true },
    options: { type: [TriviaForeignOptionSchema], required: true }
  },
  { _id: false }
);
var TriviaSchema = new mongoose.Schema(
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
var TriviaModel = mongoose.models.Trivia || mongoose.model("Trivia", TriviaSchema);
var trivia_default = TriviaModel;
var ToObject2 = {
  transform: (doc, ret) => {
    const { _id, __v, password, ...rest } = ret;
    return { id: _id, ...rest };
  }
};
var UserForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" }
  },
  { _id: false }
);
var UserSchema = new mongoose.Schema(
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
mongoose.models.User || mongoose.model("User", UserSchema);
var UserPublicForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new mongoose.Schema(
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
var UserPublicModel = mongoose.models.UserPublic || mongoose.model("UserPublic", UserPublicSchema, "usersPublic");
var user_public_default = UserPublicModel;
var UserStageForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserStageResultSchema = new mongoose.Schema(
  {
    baseScore: { type: Number, required: true },
    challengeBonus: { type: Number, required: true },
    bonus: { type: Number, required: true },
    totalScore: { type: Number, required: true }
  },
  { _id: false }
);
var UserStageSchema = new mongoose.Schema(
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
var UserStageModel = mongoose.models.UserStage || mongoose.model("UserStage", UserStageSchema, "usersStage");
var user_stage_default = UserStageModel;

// _src/models/user-challenge/index.ts
var UserChallengeForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserChallengeResultSchema = new mongoose.Schema(
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
var UserChallengeSchema = new mongoose.Schema(
  {
    userStage: { type: UserStageForeignSchema, default: null },
    challenge: { type: ChallengeForeignSchema, required: true },
    settings: { type: ChallengeSettingsForeignSchema, required: true },
    userPublic: { type: UserPublicForeignSchema, required: true },
    status: {
      type: String,
      enum: Object.values(USER_CHALLENGE_STATUS),
      default: USER_CHALLENGE_STATUS.Undiscovered
    },
    contents: { type: [String], default: [] },
    results: { type: UserChallengeResultSchema, default: null },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
UserChallengeSchema.set("toJSON", ToObject);
UserChallengeSchema.set("toObject", ToObject);
var UserChallengeModel = mongoose.models.UserChallenge || mongoose.model("UserChallenge", UserChallengeSchema, "usersChallenge");
var user_challenge_default = UserChallengeModel;
var ToObject3 = {
  transform: (doc, ret) => {
    const { _id, __v, userPublic, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};
var UserTriviaResultSchema = new mongoose.Schema(
  {
    answer: { type: String, default: null },
    feedback: { type: String, default: null },
    isCorrect: { type: Boolean, required: true },
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true }
  },
  { _id: false }
);
var UserTriviaSchema = new mongoose.Schema(
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
var UserTriviaModel = mongoose.models.UserTrivia || mongoose.model("UserTrivia", UserTriviaSchema, "usersTrivia");
var user_trivia_default = UserTriviaModel;
var PhotoHuntForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    hint: { type: String, required: true }
  },
  { _id: false }
);
var PhotoHuntSchema = new mongoose.Schema(
  {
    hint: { type: String, default: "" },
    score: { type: Number, default: 0 },
    feedback: { type: String, default: "" },
    challenge: { type: IdNameSchema, default: null },
    status: {
      type: String,
      enum: Object.values(PHOTO_HUNT_STATUS),
      default: PHOTO_HUNT_STATUS.Draft
    },
    qr: { type: QrForeignSchema, default: null }
  },
  { timestamps: true }
);
PhotoHuntSchema.set("toObject", ToObject);
PhotoHuntSchema.set("toJSON", ToObject);
var PhotoHuntModel = mongoose.models.PhotoHunt || mongoose.model("PhotoHunt", PhotoHuntSchema, "photoHunts");
var photo_hunt_default = PhotoHuntModel;

// _src/services/stage/index.ts
var isUsed = async (ids, id) => {
  const filter = {
    _id: { $in: ids },
    deletedAt: null,
    stage: { $ne: null }
  };
  if (id) filter["stage.id"] = { $ne: id };
  const used = (await challenge_default.find(filter)).map((item) => item.id);
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
  const items = await stage_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await stage_default.countDocuments(filter);
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
  const contents = await challenge_default.find({
    _id: { $in: payload.contents }
  });
  const stage = await stage_default.create({
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
  const item = await stage_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  return item.toObject();
};
var update = async (id, payload) => {
  return await transaction(async (session) => {
    await isUsed(payload.contents, id);
    const stage = await stage_default.findOne({ _id: id, deletedAt: null });
    if (!stage) throw new Error("stage not found");
    const contents = (await challenge_default.find({
      _id: { $in: payload.contents },
      deletedAt: null
    })).map((item) => item.id);
    await challenge_default.updateMany(
      { "stage.id": stage.id },
      { $set: { stage: null } },
      { session }
    );
    await challenge_default.updateMany(
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
  const item = await stage_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } }
  );
  if (!item) throw new Error("stage not found");
  return item;
};
var verify = async (id) => {
  const item = await stage_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  if (item.status !== STAGE_STATUS.Publish)
    throw new Error("stage not published yet");
  return item.toObject();
};
var StageService = { list: list2, create, detail, update, delete: _delete, verify };
var stage_default2 = StageService;

// _src/services/challenge/index.ts
var detail2 = async (id) => {
  const item = await challenge_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var verify2 = async (id) => {
  const item = await challenge_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  if (item.status !== CHALLENGE_STATUS.Publish)
    throw new Error("challenge not published yet");
  return item.toObject();
};
var verify3 = async (value) => {
  const userPublic = await user_public_default.findOneAndUpdate(
    {
      $or: [{ "user.id": value }, { code: value }],
      deletedAt: null
    },
    { lastAccessedAt: /* @__PURE__ */ new Date() }
  );
  if (!userPublic) throw new Error("invalid user");
  return userPublic.toObject();
};
var PeriodeValidator = schema_default.generate({
  startDate: Joi__default.default.date().required(),
  endDate: Joi__default.default.date().required().greater(Joi__default.default.ref("startDate"))
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

// _src/validators/stage/index.ts
var StageSettingsValidator = schema_default.generate(
  {
    canDoRandomChallenges: schema_default.boolean({ defaultValue: false }),
    canStartFromChallenges: schema_default.boolean({ defaultValue: false }),
    periode: PeriodeValidator.allow(null)
  }
);
schema_default.generate({
  ...DefaultListParamsFields,
  status: schema_default.string({ allow: null }).valid(...Object.values(STAGE_STATUS))
});
schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(Joi__default.default.string()).default([]),
  contents: schema_default.array(Joi__default.default.string()).default([]),
  status: schema_default.string({ required: true }).valid(...Object.values(STAGE_STATUS)),
  settings: StageSettingsValidator.required()
});
var StageForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(Joi__default.default.string(), { defaultValue: [] }),
  settings: schema_default.generate({
    periode: PeriodeValidator.allow(null)
  })
});

// _src/validators/user-public/index.ts
var UserPublicForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  code: schema_default.string({ required: true }),
  name: schema_default.string({ required: true, allow: "" })
});

// _src/services/user-stage/index.ts
var initResults = () => ({
  baseScore: 0,
  challengeBonus: 0,
  bonus: 0,
  totalScore: 0
});
var verify4 = async (stageId, TID) => {
  return await user_stage_default.findOne({
    "userPublic.code": TID,
    "stage.id": stageId
  });
};
var setup = async (stageId, TID) => {
  return transaction(async (session) => {
    console.time("queryTime");
    const exist = await verify4(stageId, TID);
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
    const [userStageData] = await user_stage_default.create(
      [{ userPublic, stage }],
      { session }
    );
    const contents = await init(stageData, userStageData, session);
    userStageData.contents = contents.map((item) => item.id);
    await userStageData.save({ session });
    return userStageData.toObject();
  }).finally(() => {
    console.timeEnd("queryTime");
  });
};
var list3 = async (params, TID) => {
  const skip = (params.page - 1) * params.limit;
  const filter = {
    deletedAt: null,
    "stage.name": { $regex: params.search, $options: "i" },
    "userPublic.code": TID
  };
  if (params.status) filter.status = params.status;
  const items = await user_stage_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await user_stage_default.countDocuments(filter);
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
var detail3 = async (id, TID) => {
  const item = await user_stage_default.findOne({
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
var submitState = async (id, TID) => {
  const item = await user_stage_default.findOne({
    _id: id,
    "userPublic.code": TID
  });
  if (!item) throw new Error("user stage not found");
  const results = item?.results || initResults();
  const [summary4] = await summary(id, TID);
  results.baseScore = summary4.totalBaseScore;
  results.bonus = 0;
  results.challengeBonus = summary4.totalBonus;
  results.totalScore = summary4.totalScore;
  item.results = results;
  await item.save();
  return item;
};
var UserStageService = { list: list3, detail: detail3, setup, verify: verify4, submitState };
var user_stage_default2 = UserStageService;
schema_default.generate({
  ...DefaultListParamsFields,
  type: schema_default.string().valid(...Object.values(CHALLENGE_TYPES)),
  stageId: schema_default.string().allow(null, "")
});
var ChallengeSettingsValidator = schema_default.generate({
  clue: schema_default.string({ defaultValue: "" }),
  duration: schema_default.number({ defaultValue: 0 }),
  type: schema_default.string({ required: true }).valid(...Object.values(CHALLENGE_TYPES)),
  feedback: FeedbackValidator
});
var ChallengeForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  order: schema_default.number({ defaultValue: null }),
  storyline: schema_default.array(Joi__default.default.string(), { defaultValue: [] })
});
var ChallengeSettingsForeignValidator = schema_default.generate({
  duration: schema_default.number({ allow: 0 }),
  type: schema_default.string({ required: true }).valid(...Object.values(CHALLENGE_TYPES))
});
schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(schema_default.string()).default([]),
  stageId: schema_default.string().allow(null, ""),
  status: schema_default.string({ required: true, defaultValue: CHALLENGE_STATUS.Draft }).valid(...Object.values(CHALLENGE_STATUS)),
  settings: ChallengeSettingsValidator.required()
});

// _src/services/trivia/index.ts
var details = async (challengeId) => {
  const challenge = await detail2(challengeId);
  if (challenge.settings.type !== CHALLENGE_TYPES.Trivia)
    throw new Error("challenge.not_trivia_type_error");
  const items = await trivia_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};

// _src/services/user-trivia/index.ts
var setup2 = async (userPublic, userChallenge, session) => {
  const trivias = await details(userChallenge.challengeId);
  const payload = trivias.map((item) => {
    const trivia = {
      id: item.id,
      allowMultiple: item.allowMultiple,
      options: item.options.map(({ text }) => ({ text })),
      question: item.question
    };
    return {
      userPublic,
      userChallenge,
      trivia
    };
  });
  return await user_trivia_default.insertMany(payload, { session });
};
var details2 = async (ids, TID, hasResult) => {
  const filter = {};
  if (hasResult !== undefined)
    filter.results = hasResult ? { $ne: null } : null;
  const data = await user_trivia_default.find({
    ...filter,
    _id: { $in: ids },
    "userPublic.code": TID
  });
  return data.map((item) => item.toObject());
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
  return await user_trivia_default.updateMany(
    {
      "userChallenge.id": userChallengeId,
      "userPublic.code": TID,
      results: null
    },
    { $set: { results } }
  );
};
var summary2 = async (userChallengeId, TID) => {
  const [summary4] = await user_trivia_default.aggregate().match({
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
  }).addFields({ type: CHALLENGE_TYPES.Trivia });
  return summary4;
};
var UserPhotoHuntResultSchema = new mongoose.Schema(
  {
    feedback: { type: String, default: null },
    foundAt: { type: Date, default: Date.now() },
    score: { type: Number, default: 0 }
  },
  { _id: false }
);
var UserPhotoHuntSchema = new mongoose.Schema({
  photoHunt: { type: PhotoHuntForeignSchema, required: true },
  results: { type: UserPhotoHuntResultSchema, default: null },
  userChallenge: { type: UserChallengeForeignSchema, required: true },
  userPublic: { type: UserPublicForeignSchema, required: true }
});
UserPhotoHuntSchema.set("toObject", ToObject);
UserPhotoHuntSchema.set("toJSON", ToObject);
var UserPhotoHuntModel = mongoose.models.UserPhotoHunt || mongoose.model("UserPhotoHunt", UserPhotoHuntSchema, "usersPhotoHunt");
var user_photo_hunt_default = UserPhotoHuntModel;
schema_default.generate({
  ...DefaultListParamsFields,
  code: schema_default.string({ allow: "" }),
  status: schema_default.string({ allow: "" }).valid(...Object.values(QR_STATUS)),
  hasContent: schema_default.boolean({ defaultValue: null })
});
schema_default.generate({
  amount: schema_default.number({ required: true })
});
var QrContentValidator = schema_default.generate({
  refId: schema_default.string({ required: true }),
  type: schema_default.string({ required: true }).valid(...Object.values(QR_CONTENT_TYPES))
});
var QrLocationValidator = schema_default.generate({
  label: schema_default.string({ required: true, allow: "" }),
  longitude: schema_default.number({ required: true }),
  latitude: schema_default.number({ required: true })
});
schema_default.generate({
  status: schema_default.string({ required: true }).valid(...Object.values(QR_STATUS)),
  content: QrContentValidator.allow(null).default(null),
  location: QrLocationValidator.allow(null).default(null)
});
schema_default.generate({
  ids: schema_default.array(Joi__default.default.string(), { required: true })
});

// _src/services/photo-hunt/index.ts
var details3 = async (challengeId) => {
  const challenge = await detail2(challengeId);
  if (challenge.settings.type !== CHALLENGE_TYPES.PhotoHunt)
    throw new Error("challenge.not_photohunt_type_error");
  const items = await photo_hunt_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};

// _src/services/user-photo-hunt/index.ts
var setup4 = async (userPublic, userChallenge, session) => {
  const items = await details3(userChallenge.challengeId);
  const payload = items.map(({ id, hint }) => {
    return {
      userPublic,
      userChallenge,
      photoHunt: { id, hint }
    };
  });
  return await user_photo_hunt_default.insertMany(payload, { session });
};
var details4 = async (ids, TID, hasResult) => {
  const filter = {};
  if (hasResult !== undefined)
    filter.results = hasResult ? { $ne: null } : null;
  const data = await user_photo_hunt_default.find({
    ...filter,
    _id: { $in: ids },
    "userPublic.code": TID
  });
  return data.map((item) => item.toObject());
};
var submitEmpties2 = async (userChallengeId, TID) => {
  const results = {
    feedback: null,
    foundAt: null,
    score: 0
  };
  return await user_photo_hunt_default.updateMany(
    {
      "userChallenge.id": userChallengeId,
      "userPublic.code": TID,
      results: null
    },
    { $set: { results } }
  );
};
var summary3 = async (userChallengeId, TID) => {
  const [summary4] = await user_photo_hunt_default.aggregate().match({
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
  }).addFields({ type: CHALLENGE_TYPES.PhotoHunt });
  return summary4;
};

// _src/services/user-challenge/index.ts
var services = {
  [CHALLENGE_TYPES.Trivia]: {
    setup: setup2,
    details: details2,
    submitEmpties,
    summary: summary2
  },
  [CHALLENGE_TYPES.PhotoHunt]: {
    setup: setup4,
    details: details4,
    submitEmpties: submitEmpties2,
    summary: summary3
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
var verify7 = async (challengeId, TID, setDiscover) => {
  const item = await user_challenge_default.findOne({
    "userPublic.code": TID,
    "challenge.id": challengeId,
    deletedAt: null
  });
  if (!item) return null;
  if (item.status == USER_CHALLENGE_STATUS.Undiscovered && setDiscover)
    await user_challenge_default.updateOne(
      { _id: item.id },
      { $set: { status: USER_CHALLENGE_STATUS.Discovered } }
    );
  return item.toObject();
};
var init = async (stage, userStage, session) => {
  const challenges = await challenge_default.find({
    _id: { $in: stage.contents }
  });
  const userPublic = userStage.userPublic;
  const payload = challenges.map((item) => {
    const {
      id,
      name,
      order,
      storyline,
      settings: { duration, type }
    } = item;
    return {
      userStage: {
        id: userStage.id,
        stageId: userStage.stage.id,
        name: userStage.stage.name
      },
      challenge: { id, name, order, storyline },
      userPublic,
      settings: { duration, type }
    };
  });
  const contents = await user_challenge_default.insertMany(payload, { session });
  await Promise.all(
    contents.map(async (item) => {
      const items = await services[item.settings.type].setup(
        userPublic,
        {
          id: item.id,
          challengeId: item.challenge.id,
          name: item.challenge.name
        },
        session
      );
      item.contents = items.map((i) => i.id);
      await item.save({ session });
      return item.toObject();
    })
  );
  return await user_challenge_default.find({
    _id: { $in: contents.map((item) => item._id) }
  });
};
var setup3 = async (challengeId, TID, setDiscover) => {
  const exist = await verify7(challengeId, TID, setDiscover);
  if (exist) return exist;
  const userPublicData = await verify3(TID);
  const challengeData = await verify2(challengeId);
  const stageId = challengeData.stage?.id;
  const userStageData = stageId && await user_stage_default2.verify(stageId, TID);
  if (stageId && !userStageData) {
    const stageData = await stage_default2.detail(stageId);
    if (!stageData.settings.canStartFromChallenges)
      throw new Error("user stage has not been found yet");
    await user_stage_default2.setup(stageId, TID);
    const result = await verify7(challengeId, TID, setDiscover);
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
  const userChallengeData = await user_challenge_default.create({
    userStage,
    challenge,
    userPublic,
    settings,
    status: USER_CHALLENGE_STATUS[setDiscover ? "Discovered" : "Undiscovered"]
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
  userChallengeData.contents = contents.map((item) => item.id);
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
    user_challenge_default,
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
var detail6 = async (id, TID) => {
  const data = await user_challenge_default.findOne({
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
var submit = async (id, TID, bonus = 0) => {
  const userChallenge = await detail6(id, TID);
  if (!userChallenge) throw new Error("user challenge not found");
  const {
    settings: { type: challengeType }
  } = userChallenge;
  await services[challengeType].submitEmpties(id, TID);
  const summary4 = await services[challengeType].summary(id, TID);
  const results = userChallenge.results || initResult();
  const timeUsed = dayjs__default.default().diff(dayjs__default.default(results.startAt), "seconds");
  if (summary4.type === CHALLENGE_TYPES.Trivia)
    results.totalCorrect = summary4.totalCorrect;
  else results.totalCorrect = summary4.totalFound;
  results.contentBonus = summary4.totalBonus || 0;
  results.baseScore = summary4.totalBaseScore;
  results.bonus = bonus;
  results.totalScore = summary4.totalBaseScore + summary4.totalBonus + bonus;
  results.endAt = /* @__PURE__ */ new Date();
  results.timeUsed = timeUsed;
  userChallenge.results = results;
  userChallenge.status = USER_CHALLENGE_STATUS.Completed;
  const newUserChallenge = await user_challenge_default.findOneAndUpdate(
    { _id: userChallenge.id },
    { $set: { results, status: USER_CHALLENGE_STATUS.Completed } },
    { new: true }
  );
  if (!newUserChallenge) throw new Error("");
  if (userChallenge.userStage)
    await user_stage_default2.submitState(userChallenge.userStage.id, TID);
  return newUserChallenge.toObject();
};
var submitState2 = async (id, TID) => {
  const userChallenge = await user_challenge_default.findOne({ _id: id });
  if (!userChallenge) throw new Error("user challenge not found");
  if (userChallenge.status === USER_CHALLENGE_STATUS.Completed)
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
  userChallenge.status = USER_CHALLENGE_STATUS.OnGoing;
  await userChallenge.save();
  return userChallenge.toObject();
};
var summary = async (userStageId, TID) => {
  return user_challenge_default.aggregate().match({
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
  verify: verify7,
  setup: setup3,
  list: list5,
  detail: detail6,
  // detailContent,
  submit,
  submitState: submitState2,
  summary,
  init
};
var user_challenge_default2 = UserChallengeService;

exports.default = user_challenge_default2;
exports.detail = detail6;
exports.init = init;
exports.list = list5;
exports.setup = setup3;
exports.submit = submit;
exports.submitState = submitState2;
exports.summary = summary;
