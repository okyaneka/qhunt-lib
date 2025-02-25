'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bcryptjs = require('bcryptjs');
var jsonwebtoken = require('jsonwebtoken');
require('deepmerge');
var mongoose = require('mongoose');
require('@zxing/browser');
require('joi');
var cryptoJs = require('crypto-js');
require('dayjs');
var Redis = require('ioredis');
var crypto = require('crypto');
var client_s3_star = require('@aws-sdk/client-s3');

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

var Redis__namespace = /*#__PURE__*/_interopNamespace(Redis);
var client_s3_star__namespace = /*#__PURE__*/_interopNamespace(client_s3_star);

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
var USER_PUBLIC_GENDER = {
  Male: "male",
  Female: "female",
  Panda: "panda"
};

// _src/types/user-stage/index.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});
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
var db = { transaction };
var db_default = db;
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
mongoose.models.Challenge || mongoose.model("Challenge", ChallengeSchema);
var QrForeignSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true, index: true }
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
mongoose.models.Stage || mongoose.model("Stage", StageSchema);
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
mongoose.models.Trivia || mongoose.model("Trivia", TriviaSchema);
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
    email: { type: String, required: true }
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
var UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
var user_default = UserModel;
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
    user: { type: UserForeignSchema, required: true }
  },
  { timestamps: true }
);
S3Schema.set("toObject", ToObject);
S3Schema.set("toJSON", ToObject);
var S3Model = mongoose.models.S3 || mongoose.model("S3", S3Schema);
var s3_default = S3Model;

// _src/models/user-public/index.ts
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
    photo: { type: S3ForeignSchema, default: null },
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
mongoose.models.UserTrivia || mongoose.model("UserTrivia", UserTriviaSchema, "usersTrivia");
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
mongoose.models.PhotoHunt || mongoose.model("PhotoHunt", PhotoHuntSchema, "photoHunts");
var verify = async (value, session) => {
  if (!value) throw new Error("token is required");
  const userPublic = await user_public_default.findOneAndUpdate(
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
var setup = async (userId) => {
  const timestamp = Date.now();
  const salt = cryptoJs.lib.WordArray.random(4).toString(cryptoJs.enc.Hex);
  const code = cryptoJs.SHA256(`${timestamp}${salt}`).toString(cryptoJs.enc.Hex);
  const payload = { code };
  if (userId) {
    const userPublic = await user_public_default.findOne({
      "user.id": userId,
      deletedAt: null
    });
    if (userPublic) return userPublic.toObject();
    const user2 = await user_default.findOne({ _id: userId, deletedAt: null });
    if (user2) payload.user = { id: user2.id, name: user2.name };
  }
  const user = await user_public_default.create(payload);
  return user.toObject();
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
mongoose.models.UserPhotoHunt || mongoose.model("UserPhotoHunt", UserPhotoHuntSchema, "usersPhotoHunt");

// _src/plugins/redis/index.ts
var redis_exports = {};
__export(redis_exports, {
  RedisHelper: () => RedisHelper,
  default: () => redis_default
});
__reExport(redis_exports, Redis__namespace);
var prefix = "\x1B[35mREDIS:\x1B[0m";
var RedisHelper = class {
  status = 0;
  client = null;
  subscr = null;
  messageHandlers = [];
  constructor() {
  }
  init(options) {
    this.client = new Redis__namespace.default(options);
    this.subscr = new Redis__namespace.default(options);
    this.initiate();
  }
  initiate() {
    if (!(this.client && this.subscr)) return;
    this.status = 1;
    this.client.on(
      "connect",
      () => console.log(prefix, "Redis connected successfully!")
    );
    this.client.on("error", (err) => console.error("\u274C Redis Error:", err));
    this.subscr.on("message", async (channel, message) => {
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
    if (!this.client) return;
    const message = typeof data == "string" ? data : JSON.stringify(data);
    console.log(prefix, `message published to ${channel}`);
    await this.client.publish(channel, message);
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
if (!globalInstance.__REDIS_HELPER__) {
  globalInstance.__REDIS_HELPER__ = new RedisHelper();
}
var redis_default = globalInstance.__REDIS_HELPER__;

// _src/plugins/s3/index.ts
var s3_exports = {};
__export(s3_exports, {
  S3Helper: () => S3Helper,
  default: () => s3_default2
});
__reExport(s3_exports, client_s3_star__namespace);
var prefix2 = "\x1B[0;92mS3:\x1B[0m";
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
      console.log(prefix2, "Aws S3 connected successfully!");
    }).catch((err) => {
      console.log(prefix2, "\u274C Aws S3 Error:", err.message);
    });
  }
  async put(payload) {
    if (!(this.client && this.bucket)) return;
    const { buffer, filename, mimetype } = payload;
    const names = filename.split(".");
    const ext = names.pop();
    const Key = `${names.join(".")}-${Date.now()}.${ext}`;
    const config = {
      Bucket: this.bucket,
      Key,
      Body: buffer,
      ContentType: mimetype,
      ACL: "public-read"
    };
    const command = new client_s3_star.PutObjectCommand(config);
    const region = await this.client.config.region();
    const res = await this.client.send(command);
    return {
      fileName: Key,
      size: res.Size,
      fileUrl: `https://${this.bucket}.s3.${region}.amazonaws.com/${Key}`
    };
  }
  async delete(key) {
    if (!(this.client && this.bucket)) return;
    const config = {
      Bucket: this.bucket,
      Key: key
    };
    const command = new client_s3_star.DeleteObjectCommand(config);
    const res = await this.client.send(command);
    return res;
  }
};
var globalInstance2 = globalThis;
if (!globalInstance2.__S3_HELPER__) {
  globalInstance2.__S3_HELPER__ = new S3Helper();
}
var s3_default2 = globalInstance2.__S3_HELPER__;
var userSync = async (TID, session) => {
  const userPublicData = await verify(TID, session);
  const userPublic = {
    code: userPublicData.code,
    id: userPublicData.id,
    name: userPublicData.name
  };
  await user_challenge_default.updateMany(
    { "userPublic.code": TID },
    { userPublic }
  );
};

// _src/services/user-stage/index.ts
var userSync2 = async (TID, session) => {
  const userPublicData = await verify(TID, session);
  const userPublic = {
    id: userPublicData.id,
    code: userPublicData.code,
    name: userPublicData.name
  };
  await user_stage_default.updateMany({ "userPublic.code": TID }, { userPublic });
};

// _src/services/s3/index.ts
var set = async (payload, userId, session) => {
  const resS3 = await s3_default2.put(payload);
  if (!resS3) throw new Error("s3.failed_upload");
  const userData = await detail6(userId, session);
  const user = {
    id: userData.id,
    name: userData.name,
    email: userData.email
  };
  const item = await s3_default.create({
    fileName: resS3.fileName,
    fileUrl: resS3.fileUrl,
    fileSize: payload.buffer.length,
    fileType: payload.mimetype,
    user
  });
  return item.toObject();
};
var get = async (path) => {
};
var _delete = async (key) => {
  const res = await s3_default2.delete(key);
  await s3_default.deleteOne({ fileName: key });
  return res;
};
var S3Service = { set, get, delete: _delete };
var s3_default3 = S3Service;

// _src/services/user/index.ts
var register = async (payload, TID) => {
  return await db_default.transaction(async (session) => {
    const { email, name, password: rawPassword } = payload;
    const userPublic = await verify(TID, session);
    if (userPublic.user?.id) throw new Error("user already exists");
    const userExists = await user_default.findOne({ email }, { _id: 1 }).session(
      session
    );
    if (userExists) throw new Error("email taken");
    const password = await bcryptjs.hash(rawPassword, 10);
    const [user] = await user_default.create(
      [
        {
          name,
          email,
          password,
          role: "public" /* Public */
        }
      ],
      { session }
    );
    const data = {
      name: user.name,
      user: { id: user._id, name: user.name, email: user.email }
    };
    await user_public_default.updateOne({ code: TID }, { $set: data }, { session });
    await dataSync(TID, session);
    return user.toObject();
  });
};
var login = async (payload, secret) => {
  const email = payload.email;
  const user = await user_default.findOne({ email });
  if (!user) throw new Error("user not found");
  const isPasswordValid = await bcryptjs.compare(payload.password, user.password);
  if (!isPasswordValid) throw new Error("invalid password");
  const userPublic = await user_public_default.findOne({ "user.id": user._id }).catch(
    () => null
  ) || await setup(user.id);
  const token = jsonwebtoken.sign({ id: user._id }, secret, {
    expiresIn: 30 * 24 * 60 * 60
  });
  const { _id: id, name } = user;
  return { id, name, email, TID: userPublic.code, token };
};
var profile = async (bearer) => {
};
var list2 = async (params) => {
};
var create = async (payload) => {
};
var detail6 = async (id, session) => {
  const user = await user_default.findOne({ _id: id, deletedAt: null }, null, {
    session
  });
  if (!user) throw new Error("user not found");
  const meta = await verify(user.id, session);
  return {
    ...user.toObject(),
    meta
  };
};
var update = async (id, payload) => {
  return db_default.transaction(async (session) => {
    await user_default.updateOne(
      { _id: id },
      { $set: { name: payload.name } },
      { session, new: true }
    );
    const userPublic = await user_public_default.findOneAndUpdate(
      { "user.id": id },
      { $set: { ...payload, "user.name": payload.name } },
      { session, new: true }
    );
    if (!userPublic) throw new Error("user.not_found");
    await dataSync(userPublic.code, session);
    redis_default.pub("update-user", userPublic);
    return userPublic.toObject();
  });
};
var updatePhoto = async (payload, userId) => {
  return db_default.transaction(async (session) => {
    const userPublic = await user_public_default.findOne({ "user.id": userId });
    if (!userPublic) throw new Error("user.not_found");
    if (userPublic.photo?.fileName)
      await s3_default3.delete(userPublic.photo.fileName);
    const res = await s3_default3.set(payload, userId, session);
    const photo = {
      fileName: res.fileName,
      fileSize: res.fileSize,
      fileUrl: res.fileUrl
    };
    userPublic.photo = photo;
    await userPublic?.save({ session });
    redis_default.pub("update-user", userPublic);
    return userPublic;
  });
};
var _delete2 = async (id) => {
};
var dataSync = async (TID, session) => {
  await userSync2(TID, session);
  await userSync(TID, session);
};
var UserService = {
  register,
  login,
  profile,
  list: list2,
  create,
  detail: detail6,
  update,
  updatePhoto,
  delete: _delete2
};
var user_default2 = UserService;

exports._delete = _delete2;
exports.create = create;
exports.dataSync = dataSync;
exports.default = user_default2;
exports.detail = detail6;
exports.list = list2;
exports.login = login;
exports.profile = profile;
exports.register = register;
exports.update = update;
exports.updatePhoto = updatePhoto;
