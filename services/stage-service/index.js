'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mongoose = require('mongoose');
require('dayjs');
require('bcryptjs');
require('jsonwebtoken');
var client_s3_star = require('@aws-sdk/client-s3');
var slugify = require('slugify');
var ioredis_star = require('ioredis');
var crypto = require('crypto');
require('@zxing/browser');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var client_s3_star__namespace = /*#__PURE__*/_interopNamespace(client_s3_star);
var slugify__default = /*#__PURE__*/_interopDefault(slugify);
var ioredis_star__namespace = /*#__PURE__*/_interopNamespace(ioredis_star);

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
var transaction = async (operation, clientSession) => {
  const session = clientSession ?? await mongoose.startSession();
  clientSession ?? session.startTransaction();
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
var USER_PROVIDERS = {
  Email: "email",
  Google: "google",
  TikTok: "tiktok"
};
var USER_ROLES = {
  Admin: "admin",
  Private: "private",
  Public: "public"
};
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
var QrForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true, index: true },
    location: { type: QrLocationSchema, default: null }
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
var QrModel = mongoose.models.Qr || mongoose.model("Qr", QrSchema);
var qr_model_default = QrModel;

// _src/models/challenge-model/index.ts
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
    qr: { type: QrForeignSchema, default: null },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
ChallengeSchema.set("toJSON", ToObject);
ChallengeSchema.set("toObject", ToObject);
var ChallengeModel = mongoose.models.Challenge || mongoose.model("Challenge", ChallengeSchema);
var challenge_model_default = ChallengeModel;
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
    prologue: { type: [String], default: [] },
    epilogue: { type: [String], default: [] },
    status: {
      type: String,
      enum: Object.values(STAGE_STATUS),
      default: STAGE_STATUS.Draft
    },
    settings: { type: StageSettingsSchema, required: true },
    contents: { type: [String], default: [] },
    qr: { type: QrForeignSchema, default: null },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
StageSchema.set("toObject", ToObject);
StageSchema.set("toJSON", ToObject);
var StageModel = mongoose.models.Stage || mongoose.model("Stage", StageSchema);
var stage_model_default = StageModel;
var ChallengeDetails = async (ids) => {
  const items = await challenge_model_default.find({ _id: { $in: ids } });
  return items.map((item) => item.toObject());
};
var S3ForeignSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true }
  },
  { _id: false }
);
var S3Schema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    userId: { type: String, default: null }
  },
  { timestamps: true }
);
S3Schema.set("toObject", ToObject);
S3Schema.set("toJSON", ToObject);
mongoose.models.S3 || mongoose.model("S3", S3Schema);

// _src/models/user-model/index.ts
var ToObject2 = {
  transform: (doc, ret) => {
    const { _id, __v, password, ...rest } = ret;
    return { id: _id, ...rest };
  }
};
var UserForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" },
    email: { type: String, required: true },
    photo: { type: String, default: null }
  },
  { _id: false }
);
var UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.Public
    },
    email: { type: String, required: true, unique: true },
    photo: { type: S3ForeignSchema, default: null },
    provider: {
      type: [String],
      enum: Object.values(USER_PROVIDERS),
      default: []
    },
    password: { type: String, default: null },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);
UserSchema.set("toJSON", ToObject2);
UserSchema.set("toObject", ToObject2);
mongoose.models.User || mongoose.model("User", UserSchema);

// _src/models/user-public-model/index.ts
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
      enum: Object.values(USER_PUBLIC_GENDER),
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
mongoose.models.UserPublic || mongoose.model("UserPublic", UserPublicSchema, "usersPublic");

// _src/types/user-stage.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/user-stage-model/index.ts
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
mongoose.models.UserStage || mongoose.model("UserStage", UserStageSchema, "usersStage");

// _src/models/user-challenge-model/index.ts
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
    totalItem: { type: Number, required: true },
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
mongoose.models.UserChallenge || mongoose.model("UserChallenge", UserChallengeSchema, "usersChallenge");

// _src/plugins/aws-s3/index.ts
var aws_s3_exports = {};
__export(aws_s3_exports, {
  S3Helper: () => S3Helper,
  awsS3: () => awsS3,
  default: () => aws_s3_default
});
__reExport(aws_s3_exports, client_s3_star__namespace);
var prefix = "\x1B[38;5;165mS3:\x1B[0m";
var S3Helper = class {
  status = 0;
  bucket;
  client;
  constructor() {
    this.bucket = null;
    this.client = null;
  }
  init({ bucket, ...config }) {
    this.bucket = bucket;
    this.client = new client_s3_star.S3Client(config);
    this.initiate();
  }
  async initiate() {
    if (!(this.client && this.bucket)) return;
    this.status = 1;
    this.client.send(new client_s3_star.HeadBucketCommand({ Bucket: this.bucket })).then(() => {
      console.log(prefix, "Aws S3 connected successfully!");
    }).catch((err) => {
      console.log(prefix, "\u274C Aws S3 Error:", err.message);
    });
  }
  getClient() {
    if (!this.client) throw new Error("Aws S3 has not been setup yet");
    return this.client;
  }
  getBucket() {
    if (!this.bucket) throw new Error("S3 Bucket has not been setup yet");
    return this.bucket;
  }
  async put(payload) {
    const client = this.getClient();
    const bucket = this.getBucket();
    const { buffer, filename, mimetype } = payload;
    const names = filename.split(".");
    const ext = names.length > 1 ? "." + names.pop() : "";
    const unique = Date.now().toString(36);
    const finalName = names.join(".").split("/").map((part) => slugify__default.default(part, { lower: true })).join("/");
    const Key = `${finalName}-${unique}${ext}`;
    const config = {
      Bucket: bucket,
      Key,
      Body: buffer,
      ContentType: mimetype,
      ACL: "public-read"
    };
    const command = new client_s3_star.PutObjectCommand(config);
    const region = await client.config.region();
    const res = await client.send(command);
    console.log(prefix, `success put file`);
    return {
      fileName: Key,
      size: res.Size,
      fileUrl: `https://${bucket}.s3.${region}.amazonaws.com/${Key}`
    };
  }
  async delete(key) {
    const client = this.getClient();
    const bucket = this.getBucket();
    const config = {
      Bucket: bucket,
      Key: key
    };
    const command = new client_s3_star.DeleteObjectCommand(config);
    const res = await client.send(command);
    console.log(prefix, `success delete file`);
    return res;
  }
};
var globalInstance = globalThis;
if (!globalInstance.__S3_HELPER__)
  globalInstance.__S3_HELPER__ = new S3Helper();
var awsS3 = globalInstance.__S3_HELPER__;
var aws_s3_default = S3Helper;
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
var photohunt_model_default = PhotoHuntModel;
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
var trivia_model_default = TriviaModel;
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
mongoose.models.UserPhotoHunt || mongoose.model("UserPhotoHunt", UserPhotoHuntSchema, "usersPhotoHunt");
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
mongoose.models.UserTrivia || mongoose.model("UserTrivia", UserTriviaSchema, "usersTrivia");

// _src/plugins/redis/index.ts
var redis_exports = {};
__export(redis_exports, {
  RedisHelper: () => RedisHelper,
  default: () => redis_default,
  redis: () => redis
});
__reExport(redis_exports, ioredis_star__namespace);
var prefix2 = "\x1B[38;5;196mREDIS:\x1B[0m";
var RedisHelper = class {
  status = 0;
  client = null;
  subscr = null;
  messageHandlers = [];
  constructor() {
  }
  init(options) {
    this.client = new ioredis_star.Redis(options);
    this.subscr = new ioredis_star.Redis(options);
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
      () => console.log(prefix2, "Redis connected successfully!")
    );
    client.on("error", (err) => console.error("\u274C Redis Error:", err));
    subscr.on("message", async (channel, message) => {
      const handlers = this.messageHandlers.filter(
        (v) => v.channel === channel
      );
      const data = await Promise.resolve().then(() => JSON.parse(message)).catch(() => message);
      handlers.forEach((handler) => {
        console.log(
          prefix2,
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
    console.log(prefix2, `message published to ${channel}`);
    await client.publish(channel, message);
  }
  async sub(channel, callback) {
    if (!this.subscr) return;
    await this.subscr.subscribe(channel);
    const handler = {
      id: crypto.randomUUID(),
      channel,
      callback
    };
    this.messageHandlers.push(handler);
    console.log(prefix2, `channel ${channel} subscribed with id ${handler.id}`);
    return () => {
      const index = this.messageHandlers.findIndex(
        ({ id }) => id === handler.id
      );
      if (index !== -1) this.messageHandlers.splice(index, 1);
      console.log(
        prefix2,
        `channel ${channel} with id ${handler.id} unsubscribed`
      );
    };
  }
};
var globalInstance2 = globalThis;
if (!globalInstance2.__REDIS_HELPER__)
  globalInstance2.__REDIS_HELPER__ = new RedisHelper();
var redis = globalInstance2.__REDIS_HELPER__;
var redis_default = RedisHelper;
var QrGenerate = async (count, session) => {
  const items = new Array(count).fill({}).map(() => {
    const salt = Math.floor(Math.random() * Math.pow(16, 8)).toString(16).padStart(8, "0");
    return {
      code: crypto.createHash("sha256").update(`${Date.now()}${salt}`).digest("hex"),
      status: QR_STATUS.Draft
    };
  });
  return qr_model_default.insertMany(items, { session });
};

// _src/services/stage-service/index.ts
var isUsed = async (ids, id) => {
  const filter = {
    _id: { $in: ids },
    deletedAt: null,
    stage: { $ne: null }
  };
  if (id) filter["stage.id"] = { $ne: id };
  const used = (await challenge_model_default.find(filter)).map((item) => item.id);
  if (used.length)
    throw new Error(
      `challenge${used.length > 1 ? "s" : ""} ${used.join(", ")} ${used.length > 1 ? "are" : "is"} used`
    );
};
var list = async (params) => {
  const { page = 1, limit = 10, search = "" } = params;
  const skip = (page - 1) * limit;
  const filter = {
    deletedAt: null,
    name: { $regex: search, $options: "i" }
  };
  const items = await stage_model_default.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
  const totalItems = await stage_model_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);
  return {
    list: items.map((item) => item.toObject()),
    page,
    totalItems,
    totalPages
  };
};
var create = async (payload) => {
  await isUsed(payload.contents);
  const contents = await challenge_model_default.find({
    _id: { $in: payload.contents }
  });
  const stage = await stage_model_default.create({
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
var detail = async (id, session) => {
  const item = await stage_model_default.findOne({ _id: id, deletedAt: null }, null, {
    session
  });
  if (!item) throw new Error("stage not found");
  return item.toObject();
};
var StageUpdate = async (id, payload) => {
  return await transaction(async (session) => {
    await isUsed(payload.contents, id);
    const stage = await stage_model_default.findOne({ _id: id, deletedAt: null });
    if (!stage) throw new Error("stage not found");
    const contents = (await challenge_model_default.find({
      _id: { $in: payload.contents },
      deletedAt: null
    })).map((item) => item.id);
    await challenge_model_default.updateMany(
      { "stage.id": stage.id },
      { $set: { stage: null } },
      { session }
    );
    await challenge_model_default.updateMany(
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
  const item = await stage_model_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } }
  );
  if (!item) throw new Error("stage not found");
  return item;
};
var verify = async (id) => {
  const item = await stage_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("stage not found");
  if (item.status !== STAGE_STATUS.Publish)
    throw new Error("stage not published yet");
  return item.toObject();
};
var StagePublish = async (id) => {
  return db_default.transaction(async (session) => {
    const stage = await stage_model_default.findOne(
      { _id: id, deletedAt: null },
      { _id: true, contents: true, qr: true },
      { session }
    );
    if (!stage) throw new Error("stage.not_found");
    const challenges = await challenge_model_default.find(
      { _id: { $in: stage.contents }, qr: null, deletedAt: null },
      { _id: true },
      { session }
    );
    const qrs = await QrGenerate(
      challenges.length + (stage.qr ? 0 : 1),
      session
    );
    if (!stage.qr) {
      const qr = qrs.pop();
      if (!qr) throw new Error("qr.not_enough");
      const stageQr = {
        id: qr.id,
        code: qr.code,
        location: qr.location
      };
      const qrContent = {
        type: "stage",
        refId: stage.id
      };
      await stage_model_default.updateOne(
        { _id: stage.id },
        { $set: { qr: stageQr, status: "publish" } },
        { session }
      );
      await qr_model_default.updateOne(
        { _id: qr.id },
        { $set: { content: qrContent, status: "publish" } },
        session
      );
    }
    const { bulkChallenges, bulkQr } = challenges.reduce(
      (acc, cur) => {
        const qr = qrs.pop();
        if (!qr) throw new Error("qr.not_enough");
        const qrForeign = {
          id: qr?.id,
          code: qr?.code,
          location: qr?.location
        };
        acc.bulkChallenges.push({
          updateOne: {
            filter: { _id: cur.id },
            update: { $set: { qr: qrForeign, status: "publish" } }
          }
        });
        acc.bulkQr.push({
          updateOne: {
            filter: { _id: qr.id },
            update: {
              $set: {
                content: { type: "challenge", refId: cur.id },
                status: "publish"
              }
            }
          }
        });
        return acc;
      },
      { bulkChallenges: [], bulkQr: [] }
    );
    await challenge_model_default.bulkWrite(bulkChallenges, { session });
    await qr_model_default.bulkWrite(bulkQr, { session });
    const newStage = await stage_model_default.findById(stage.id, null, { session });
    const newChallenges = await challenge_model_default.find(
      { _id: { $in: newStage?.contents }, deletedAt: null },
      null,
      { session }
    );
    if (!newStage) throw new Error("stage.not_found");
    return {
      stage: newStage.toObject(),
      challenges: newChallenges.map((item) => item.toObject())
    };
  });
};
var StageDetailFull = async (id) => {
  const stage = await detail(id);
  const challenges = await ChallengeDetails(stage.contents);
  return { stage, challenges };
};
var StageQrs = async (id) => {
  const stage = await stage_model_default.findOne(
    { _id: id, deletedAt: null },
    { _id: true, name: true, qr: true, contents: true }
  );
  if (!stage) throw new Error("quest.not_found");
  const challenges = await challenge_model_default.find(
    { _id: { $in: stage.contents }, deletedAt: null },
    { _id: true, qr: true, contents: true, settings: true, name: true }
  );
  const contents = await Promise.all(
    challenges.map(async (item) => {
      const models13 = {
        photohunt: photohunt_model_default,
        trivia: trivia_model_default
      };
      const model13 = models13[item.settings.type];
      return model13.find(
        {
          _id: { $in: item.contents },
          qr: { $ne: null },
          deletedAt: null
        },
        { _id: true, qr: true, hint: true }
      );
    })
  );
  const challnegeContents = challenges.map((item, i) => {
    return {
      challenge: {
        id: item.id,
        name: item.name,
        type: item.settings.type
      },
      contents: contents[i]
    };
  });
  return {
    stage: {
      id: stage.id,
      name: stage.name,
      qr: stage.qr
    },
    challenges: challenges.map(({ id: id2, name, qr, settings: { type } }) => ({
      id: id2,
      name,
      qr,
      type
    })),
    challnegeContents
  };
};
var StageService = {
  list,
  create,
  detail,
  update: StageUpdate,
  delete: _delete,
  verify,
  publish: StagePublish,
  detailFull: StageDetailFull,
  qrs: StageQrs
};
var stage_service_default = StageService;

exports.StageDetailFull = StageDetailFull;
exports.StagePublish = StagePublish;
exports.StageQrs = StageQrs;
exports.StageUpdate = StageUpdate;
exports._delete = _delete;
exports.create = create;
exports.default = stage_service_default;
exports.detail = detail;
exports.list = list;
exports.verify = verify;
