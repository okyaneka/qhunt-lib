import { Schema, models, model, startSession } from 'mongoose';
import dayjs from 'dayjs';
import * as Redis from 'ioredis';
import Redis__default from 'ioredis';
import { randomUUID } from 'crypto';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget);
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

// _src/constants/index.ts
var PUBLISHING_STATUS = {
  Draft: "draft",
  Publish: "publish"
};
var CHALLENGE_STATUS = PUBLISHING_STATUS;
var CHALLENGE_TYPES = {
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};
var PHOTO_HUNT_STATUS = PUBLISHING_STATUS;
var QR_CONTENT_TYPES = {
  Stage: "stage",
  Challenge: "challenge",
  Trivia: "trivia",
  PhotoHunt: "photohunt"
};
var QR_STATUS = PUBLISHING_STATUS;
var STAGE_STATUS = PUBLISHING_STATUS;
var USER_CHALLENGE_STATUS = {
  Undiscovered: "undiscovered",
  Discovered: "discovered",
  OnGoing: "ongoing",
  Completed: "completed",
  Failed: "failed"
};
var USER_PUBLIC_GENDER = {
  Male: "male",
  Female: "female",
  Panda: "panda"
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

// _src/models/challenge-model/index.ts
var ChallengeSettingsSchema = new Schema(
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
var ChallengeSettingsForeignSchema = new Schema(
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
var ChallengeForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    order: { type: Number, default: null }
  },
  { _id: false }
);
var ChallengeSchema = new Schema(
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
var ChallengeModel = models.Challenge || model("Challenge", ChallengeSchema);
var challenge_model_default = ChallengeModel;
var StageSettingsSchema = new Schema(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new Schema(
  {
    periode: { type: PeriodSchema, required: true }
  },
  { _id: false }
);
var StageForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true }
  },
  { _id: false }
);
var StageSchema = new Schema(
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
var StageModel = models.Stage || model("Stage", StageSchema);
var stage_model_default = StageModel;

// _src/services/stage-service/index.ts
var verify = async (id) => {
  const item = await stage_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  if (item.status !== STAGE_STATUS.Publish)
    throw new Error("stage not published yet");
  return item.toObject();
};

// _src/services/challenge-service/index.ts
var detail2 = async (id) => {
  const item = await challenge_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var TriviaOptionSchema = new Schema(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 }
  },
  { _id: false, versionKey: false }
);
var TriviaForeignOptionSchema = new Schema(
  {
    text: { type: String, required: true }
  },
  { _id: false }
);
var TriviaForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    allowMultiple: { type: Boolean, required: true },
    options: { type: [TriviaForeignOptionSchema], required: true }
  },
  { _id: false }
);
var TriviaSchema = new Schema(
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
var TriviaModel = models.Trivia || model("Trivia", TriviaSchema);
var trivia_model_default = TriviaModel;

// _src/services/trivia-service/index.ts
var detail3 = async (id) => {
  const item = await trivia_model_default.findOne({ _id: id });
  if (!item) throw new Error("trivia not found");
  return item;
};
var details = async (challengeId) => {
  const challenge = await detail2(challengeId);
  if (challenge.settings.type !== CHALLENGE_TYPES.Trivia)
    throw new Error("challenge.not_trivia_type_error");
  const items = await trivia_model_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};

// _src/types/user.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Admin"] = "admin";
  UserRole2["Private"] = "private";
  UserRole2["Public"] = "public";
  return UserRole2;
})(UserRole || {});

// _src/types/user-stage.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/user-model/index.ts
var ToObject2 = {
  transform: (doc, ret) => {
    const { _id, __v, password, ...rest } = ret;
    return { id: _id, ...rest };
  }
};
var UserForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" },
    email: { type: String, required: true }
  },
  { _id: false }
);
var UserSchema = new Schema(
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
models.User || model("User", UserSchema);
var S3ForeignSchema = new Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true }
  },
  { _id: false }
);
var S3Schema = new Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    user: { type: UserForeignSchema, required: true }
  },
  { timestamps: true }
);
S3Schema.set("toObject", ToObject);
S3Schema.set("toJSON", ToObject);
models.S3 || model("S3", S3Schema);

// _src/models/user-public-model/index.ts
var UserPublicForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new Schema(
  {
    user: { type: UserForeignSchema, default: null },
    code: { type: String, required: true },
    name: { type: String, default: "" },
    dob: { type: Date, default: null },
    gender: {
      type: String,
      enum: Object.values(USER_PUBLIC_GENDER),
      default: null
    },
    phone: { type: String, default: "" },
    photo: { type: S3ForeignSchema, default: null },
    lastAccessedAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
UserPublicSchema.set("toJSON", ToObject);
UserPublicSchema.set("toObject", ToObject);
var UserPublicModel = models.UserPublic || model("UserPublic", UserPublicSchema, "usersPublic");
var user_public_model_default = UserPublicModel;
var UserStageForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserStageResultSchema = new Schema(
  {
    baseScore: { type: Number, required: true },
    challengeBonus: { type: Number, required: true },
    bonus: { type: Number, required: true },
    totalScore: { type: Number, required: true }
  },
  { _id: false }
);
var UserStageSchema = new Schema(
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
var UserStageModel = models.UserStage || model("UserStage", UserStageSchema, "usersStage");
var user_stage_model_default = UserStageModel;

// _src/models/user-challenge-model/index.ts
var UserChallengeForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserChallengeResultSchema = new Schema(
  {
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true },
    contentBonus: { type: Number, required: true },
    totalItem: { type: Number, required: true },
    totalScore: { type: Number, required: true },
    startAt: { type: Date, default: Date.now() },
    endAt: { type: Date, default: null },
    timeUsed: { type: Number, required: true }
  },
  { _id: false }
);
var UserChallengeSchema = new Schema(
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
var UserChallengeModel = models.UserChallenge || model("UserChallenge", UserChallengeSchema, "usersChallenge");
var user_challenge_model_default = UserChallengeModel;

// _src/models/user-trivia-model/index.ts
var ToObject3 = {
  transform: (doc, ret) => {
    const { _id, __v, userPublic, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};
var UserTriviaResultSchema = new Schema(
  {
    answer: { type: String, default: null },
    feedback: { type: String, default: null },
    isCorrect: { type: Boolean, required: true },
    baseScore: { type: Number, required: true },
    bonus: { type: Number, required: true }
  },
  { _id: false }
);
var UserTriviaSchema = new Schema(
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
var UserTriviaModel = models.UserTrivia || model("UserTrivia", UserTriviaSchema, "usersTrivia");
var user_trivia_model_default = UserTriviaModel;

// _src/services/user-public-service/index.ts
var verify2 = async (value, session) => {
  if (!value) throw new Error("token is required");
  const userPublic = await user_public_model_default.findOneAndUpdate(
    {
      $or: [{ "user.id": value }, { code: value }],
      deletedAt: null
    },
    { lastAccessedAt: /* @__PURE__ */ new Date() },
    { new: true, session }
  );
  if (!userPublic) throw new Error("invalid user");
  return userPublic.toObject();
};

// _src/services/user-stage-service/index.ts
var initResults = () => ({
  baseScore: 0,
  challengeBonus: 0,
  bonus: 0,
  totalScore: 0
});
var verify3 = async (stageId, TID) => {
  return await user_stage_model_default.findOne({
    "userPublic.code": TID,
    "stage.id": stageId
  });
};
var setup = async (stageId, TID) => {
  return transaction(async (session) => {
    console.time("queryTime");
    const exist = await verify3(stageId, TID);
    if (exist) return exist;
    const userPublicData = await verify2(TID);
    const stageData = await verify(stageId);
    const userPublic = {
      code: userPublicData.code,
      id: userPublicData.id,
      name: userPublicData.name
    };
    const stage = {
      id: stageData.id,
      name: stageData.name,
      settings: {
        periode: stageData.settings.periode
      },
      storyline: stageData.storyline
    };
    const [userStageData] = await user_stage_model_default.create(
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
var list = async (params, TID) => {
  const skip = (params.page - 1) * params.limit;
  const filter = {
    deletedAt: null,
    "stage.name": { $regex: params.search, $options: "i" },
    "userPublic.code": TID
  };
  if (params.status) filter.status = params.status;
  const items = await user_stage_model_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await user_stage_model_default.countDocuments(filter);
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
  const item = await user_stage_model_default.findOne({
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
var submitState = async (id, TID, session) => {
  const item = await user_stage_model_default.findOne(
    {
      _id: id,
      "userPublic.code": TID
    },
    null,
    { session }
  );
  if (!item) throw new Error("user stage not found");
  const results = item?.results || initResults();
  const [summary4] = await summary(id, TID, session);
  results.baseScore = summary4.totalBaseScore;
  results.bonus = 0;
  results.challengeBonus = summary4.totalBonus;
  results.totalScore = summary4.totalScore;
  item.results = results;
  await item.save({ session });
  return item.toObject();
};
var UserStageService = { list, detail: detail4, setup, verify: verify3, submitState };
var user_stage_service_default = UserStageService;
var QrForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true, index: true }
  },
  { _id: false, versionKey: false }
);
var QrContentSchema = new Schema(
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
var QrLocationSchema = new Schema(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new Schema(
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
models.Qr || model("Qr", QrSchema);

// _src/models/photo-hunt-model/index.ts
var PhotoHuntForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    hint: { type: String, required: true }
  },
  { _id: false }
);
var PhotoHuntSchema = new Schema(
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
var PhotoHuntModel = models.PhotoHunt || model("PhotoHunt", PhotoHuntSchema, "photoHunts");
var photo_hunt_model_default = PhotoHuntModel;

// _src/models/user-photo-hunt-model/index.ts
var UserPhotoHuntResultSchema = new Schema(
  {
    feedback: { type: String, default: null },
    foundAt: { type: Date, default: Date.now() },
    score: { type: Number, default: 0 }
  },
  { _id: false }
);
var UserPhotoHuntSchema = new Schema({
  photoHunt: { type: PhotoHuntForeignSchema, required: true },
  results: { type: UserPhotoHuntResultSchema, default: null },
  userChallenge: { type: UserChallengeForeignSchema, required: true },
  userPublic: { type: UserPublicForeignSchema, required: true }
});
UserPhotoHuntSchema.set("toObject", ToObject);
UserPhotoHuntSchema.set("toJSON", ToObject);
var UserPhotoHuntModel = models.UserPhotoHunt || model("UserPhotoHunt", UserPhotoHuntSchema, "usersPhotoHunt");
var user_photo_hunt_model_default = UserPhotoHuntModel;

// _src/services/photo-hunt-service/index.ts
var details2 = async (challengeId) => {
  const challenge = await detail2(challengeId);
  if (challenge.settings.type !== CHALLENGE_TYPES.PhotoHunt)
    throw new Error("challenge.not_photohunt_type_error");
  const items = await photo_hunt_model_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};

// _src/services/user-photo-hunt-service/index.ts
var setup3 = async (userPublic, userChallenge, session) => {
  const items = await details2(userChallenge.challengeId);
  const payload = items.map(({ id, hint }) => {
    return {
      userPublic,
      userChallenge,
      photoHunt: { id, hint }
    };
  });
  return await user_photo_hunt_model_default.insertMany(payload, { session });
};
var details3 = async (ids, TID, hasResult, session) => {
  const filter = {};
  if (hasResult !== undefined)
    filter.results = hasResult ? { $ne: null } : null;
  const data = await user_photo_hunt_model_default.find(
    {
      ...filter,
      _id: { $in: ids },
      "userPublic.code": TID
    },
    null,
    { session }
  );
  return data.map((item) => item.toObject());
};
var submitEmpties = async (userChallengeId, TID, session) => {
  const results = {
    feedback: null,
    foundAt: null,
    score: 0
  };
  return await user_photo_hunt_model_default.updateMany(
    {
      "userChallenge.id": userChallengeId,
      "userPublic.code": TID,
      results: null
    },
    { $set: { results } },
    { session }
  );
};
var summary2 = async (userChallengeId, TID, session) => {
  const [summary4] = await user_photo_hunt_model_default.aggregate().match({
    "userChallenge.id": userChallengeId,
    "userPublic.code": TID
  }).group({
    _id: {
      userChallenge: "$userChallenge.id",
      userPublic: "$userPublic.code"
    },
    type: { $first: CHALLENGE_TYPES.PhotoHunt },
    userPublic: { $first: "$userPublic" },
    userChallenge: { $first: "$userChallenge" },
    totalItem: {
      $sum: {
        $cond: {
          if: { $ne: ["$results.foundAt", null] },
          then: 1,
          else: 0
        }
      }
    },
    totalBaseScore: { $sum: "$results.score" },
    totalBonus: { $first: 0 },
    totalScore: { $sum: "$results.score" }
  }).session(session || null);
  return summary4;
};

// _src/helpers/bonus.ts
var timeBonus = (seconds, totalSeconds, maxPoint = 1e3) => {
  return Math.round(maxPoint * (1 - seconds / totalSeconds));
};

// _src/plugins/redis/index.ts
var redis_exports = {};
__export(redis_exports, {
  RedisHelper: () => RedisHelper,
  default: () => redis_default,
  redis: () => redis
});
__reExport(redis_exports, Redis);
var prefix = "\x1B[35mREDIS:\x1B[0m";
var RedisHelper = class {
  status = 0;
  client = null;
  subscr = null;
  messageHandlers = [];
  constructor() {
  }
  init(options) {
    this.client = new Redis__default(options);
    this.subscr = new Redis__default(options);
    this.initiate();
  }
  getClient() {
    if (!this.client) throw new Error("Redis client has not ben set yer");
    return this.client;
  }
  getSubscr() {
    if (!this.subscr) throw new Error("Redis subscribe has not ben set yer");
    return this.subscr;
  }
  initiate() {
    const client = this.getClient();
    const subscr = this.getSubscr();
    this.status = 1;
    client.on(
      "connect",
      () => console.log(prefix, "Redis connected successfully!")
    );
    client.on("error", (err) => console.error("\u274C Redis Error:", err));
    subscr.on("message", async (channel, message) => {
      const handlers = this.messageHandlers.filter(
        (v) => v.channel === channel
      );
      const data = await Promise.resolve().then(() => JSON.parse(message)).catch(() => message);
      handlers.forEach((handler) => {
        console.log(
          prefix,
          `message received from ${channel} to id ${handler.id}`
        );
        handler.callback(data);
      });
    });
  }
  async get(key) {
  }
  async set(key) {
  }
  async del(key) {
  }
  async pub(channel, data) {
    const client = this.getClient();
    const message = typeof data == "string" ? data : JSON.stringify(data);
    console.log(prefix, `message published to ${channel}`);
    await client.publish(channel, message);
  }
  async sub(channel, callback) {
    if (!this.subscr) return;
    await this.subscr.subscribe(channel);
    const handler = {
      id: randomUUID(),
      channel,
      callback
    };
    this.messageHandlers.push(handler);
    console.log(prefix, `channel ${channel} subscribed with id ${handler.id}`);
    return () => {
      const index = this.messageHandlers.findIndex(
        ({ id }) => id === handler.id
      );
      if (index !== -1) this.messageHandlers.splice(index, 1);
      console.log(
        prefix,
        `channel ${channel} with id ${handler.id} unsubscribed`
      );
    };
  }
};
var globalInstance = globalThis;
if (!globalInstance.__REDIS_HELPER__)
  globalInstance.__REDIS_HELPER__ = new RedisHelper();
var redis = globalInstance.__REDIS_HELPER__;
var redis_default = Redis__default;

// _src/services/user-challenge-service/index.ts
var services = {
  [CHALLENGE_TYPES.Trivia]: {
    setup: setup4,
    details: details4,
    submitEmpties: submitEmpties2,
    summary: summary3
  },
  [CHALLENGE_TYPES.PhotoHunt]: {
    setup: setup3,
    details: details3,
    submitEmpties,
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
    totalItem: 0,
    startAt: /* @__PURE__ */ new Date(),
    endAt: null
  };
};
var init = async (stage, userStage, session) => {
  const challenges = await challenge_model_default.find({
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
  const contents = await user_challenge_model_default.insertMany(payload, { session });
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
  return await user_challenge_model_default.find({
    _id: { $in: contents.map((item) => item._id) }
  });
};
var submit = async (id, TID, session, forceFinish) => {
  const { OnGoing, Completed } = USER_CHALLENGE_STATUS;
  const userChallenge = await user_challenge_model_default.findOne({ _id: id }, null, {
    session
  });
  if (!userChallenge) throw new Error("user_challenge.not_found");
  if (userChallenge.status === Completed) return userChallenge.toObject();
  const contents = await services[userChallenge.settings.type].details(
    userChallenge.contents,
    TID,
    false,
    session
  );
  const isFinish = !contents.length || forceFinish;
  const {
    settings: { type: challengeType }
  } = userChallenge;
  const summary4 = await services[challengeType].summary(id, TID, session);
  const results = userChallenge.results || initResult();
  results.totalItem = summary4.totalItem;
  results.baseScore = summary4.totalBaseScore;
  results.contentBonus = summary4.totalBonus;
  if (isFinish) {
    if (contents.length)
      await services[challengeType].submitEmpties(id, TID, session);
    const timeUsed = Math.min(
      dayjs().diff(dayjs(results.startAt), "seconds"),
      userChallenge.settings.duration
    );
    const bonus = timeBonus(
      timeUsed,
      userChallenge.settings.duration,
      userChallenge.contents.length * 100 / 2
    );
    results.bonus = bonus;
    results.timeUsed = timeUsed;
    results.endAt = /* @__PURE__ */ new Date();
  }
  results.totalScore = results.baseScore + results.bonus + results.contentBonus;
  userChallenge.results = results;
  userChallenge.status = isFinish ? Completed : OnGoing;
  await userChallenge.save({ session });
  if (userChallenge.userStage && isFinish) {
    await user_stage_service_default.submitState(
      userChallenge.userStage.id,
      TID,
      session
    );
    redis.pub("leaderboard", userChallenge.userStage.stageId);
  }
  return userChallenge.toObject();
};
var summary = async (userStageId, TID, session) => {
  return user_challenge_model_default.aggregate().match({
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
  }).session(session || null);
};

// _src/services/user-trivia-service/index.ts
var verify7 = async (triviaId, TID) => {
  const item = await user_trivia_model_default.findOne({
    "userPublic.code": TID,
    "trivia.id": triviaId,
    deletedAt: null
  });
  if (!item) throw new Error("user trivia not found");
  return item;
};
var setup4 = async (userPublic, userChallenge, session) => {
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
  return await user_trivia_model_default.insertMany(payload, { session });
};
var details4 = async (ids, TID, hasResult, session) => {
  const filter = {};
  if (hasResult !== undefined)
    filter.results = hasResult ? { $ne: null } : null;
  const data = await user_trivia_model_default.find(
    {
      ...filter,
      _id: { $in: ids },
      "userPublic.code": TID
    },
    null,
    { session }
  );
  return data.map((item) => item.toObject());
};
var submit2 = async (id, TID, answer = null, bonus) => {
  return db_default.transaction(async (session) => {
    const userTrivia = await user_trivia_model_default.findOne({
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
    await userTrivia.save({ session });
    await submit(userTrivia.userChallenge.id, TID, session);
    return userTrivia.toObject();
  });
};
var submitEmpties2 = async (userChallengeId, TID, session) => {
  const results = {
    answer: null,
    feedback: null,
    isCorrect: false,
    baseScore: 0,
    bonus: 0,
    totalScore: 0
  };
  return await user_trivia_model_default.updateMany(
    {
      "userChallenge.id": userChallengeId,
      "userPublic.code": TID,
      results: null
    },
    { $set: { results } },
    { session }
  );
};
var summary3 = async (userChallengeId, TID, session) => {
  const [summary4] = await user_trivia_model_default.aggregate().match({
    "userChallenge.id": userChallengeId,
    "userPublic.code": TID
  }).group({
    _id: {
      userChallenge: "$userChallenge.id",
      userPublic: "$userPublic.code"
    },
    type: { $first: CHALLENGE_TYPES.Trivia },
    userPublic: { $first: "$userPublic" },
    userChallenge: { $first: "$userChallenge" },
    totalItem: {
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
  }).session(session || null);
  return summary4;
};
var UserTriviaService = {
  setup: setup4,
  details: details4,
  submit: submit2,
  submitEmpties: submitEmpties2,
  summary: summary3
};
var user_trivia_service_default = UserTriviaService;

export { user_trivia_service_default as default, details4 as details, setup4 as setup, submit2 as submit, submitEmpties2 as submitEmpties, summary3 as summary, verify7 as verify };
