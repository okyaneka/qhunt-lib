import { Schema, models, model } from 'mongoose';
import { randomUUID, randomBytes, createHash } from 'crypto';
import 'bcryptjs';
import 'jsonwebtoken';
import 'dayjs';
import * as ioredis_star from 'ioredis';
import { Redis } from 'ioredis';
import '@zxing/browser';
import * as client_s3_star from '@aws-sdk/client-s3';
import { S3Client, HeadBucketCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import slugify from 'slugify';

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

// _src/models/s3-model/index.ts
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
    userId: { type: String, default: null }
  },
  { timestamps: true }
);
S3Schema.set("toObject", ToObject);
S3Schema.set("toJSON", ToObject);
models.S3 || model("S3", S3Schema);

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
var FEATURE_STATUS = PUBLISHING_STATUS;
var FEATURE_TYPES = {
  Event: "event",
  Patch: "patch",
  Info: "info"
};

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
    email: { type: String, required: true },
    photo: { type: String, default: null }
  },
  { _id: false }
);
var UserSchema = new Schema(
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
var UserModel = models.User || model("User", UserSchema);
var user_model_default = UserModel;
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
    lastAccessedAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
UserPublicSchema.set("toJSON", ToObject);
UserPublicSchema.set("toObject", ToObject);
var UserPublicModel = models.UserPublic || model("UserPublic", UserPublicSchema, "usersPublic");
var user_public_model_default = UserPublicModel;

// _src/types/user-stage.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});
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
var QrForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true, index: true },
    location: { type: QrLocationSchema, default: null }
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

// _src/models/stage-model/index.ts
var StageSettingsSchema = new Schema(
  {
    unlockAll: { type: Boolean, default: false },
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new Schema(
  {
    periode: { type: PeriodSchema, default: null }
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
models.Stage || model("Stage", StageSchema);

// _src/models/user-stage-model/index.ts
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
models.UserStage || model("UserStage", UserStageSchema, "usersStage");
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
    qr: { type: QrForeignSchema, default: null },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
ChallengeSchema.set("toJSON", ToObject);
ChallengeSchema.set("toObject", ToObject);
models.Challenge || model("Challenge", ChallengeSchema);
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
models.UserChallenge || model("UserChallenge", UserChallengeSchema, "usersChallenge");
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
models.Trivia || model("Trivia", TriviaSchema);
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
models.UserTrivia || model("UserTrivia", UserTriviaSchema, "usersTrivia");
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
models.PhotoHunt || model("PhotoHunt", PhotoHuntSchema, "photoHunts");

// _src/models/user-photohunt-model/index.ts
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
models.UserPhotoHunt || model("UserPhotoHunt", UserPhotoHuntSchema, "usersPhotoHunt");

// _src/plugins/redis/index.ts
var redis_exports = {};
__export(redis_exports, {
  RedisHelper: () => RedisHelper,
  default: () => redis_default,
  redis: () => redis
});
__reExport(redis_exports, ioredis_star);
var prefix = "\x1B[38;5;196mREDIS:\x1B[0m";
var RedisHelper = class {
  status = 0;
  client = null;
  subscr = null;
  messageHandlers = [];
  constructor() {
  }
  init(options) {
    this.client = new Redis(options);
    this.subscr = new Redis(options);
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
var redis_default = RedisHelper;
var FeatureSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    quest: { type: StageForeignSchema, default: null },
    featured: { type: Boolean, default: false },
    featuredImage: { type: S3ForeignSchema, default: null },
    status: {
      type: String,
      enum: Object.values(FEATURE_STATUS),
      default: FEATURE_STATUS.Draft
    },
    type: { type: String, enum: Object.values(FEATURE_TYPES), required: true },
    attachments: { type: [S3ForeignSchema], default: [] },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
FeatureSchema.set("toJSON", ToObject);
FeatureSchema.set("toObject", ToObject);
models.Feature || model("Feature", FeatureSchema);

// _src/plugins/aws-s3/index.ts
var aws_s3_exports = {};
__export(aws_s3_exports, {
  S3Helper: () => S3Helper,
  awsS3: () => awsS3,
  default: () => aws_s3_default
});
__reExport(aws_s3_exports, client_s3_star);
var prefix2 = "\x1B[38;5;165mS3:\x1B[0m";
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
    this.client = new S3Client(config);
    this.initiate();
  }
  async initiate() {
    if (!(this.client && this.bucket)) return;
    this.status = 1;
    this.client.send(new HeadBucketCommand({ Bucket: this.bucket })).then(() => {
      console.log(prefix2, "Aws S3 connected successfully!");
    }).catch((err) => {
      console.log(prefix2, "\u274C Aws S3 Error:", err.message);
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
    const finalName = names.join(".").split("/").map((part) => slugify(part, { lower: true })).join("/");
    const Key = `${finalName}-${unique}${ext}`;
    const config = {
      Bucket: bucket,
      Key,
      Body: buffer,
      ContentType: mimetype,
      ACL: "public-read"
    };
    const command = new PutObjectCommand(config);
    const region = await client.config.region();
    const res = await client.send(command);
    console.log(prefix2, `success put file`);
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
    const command = new DeleteObjectCommand(config);
    const res = await client.send(command);
    console.log(prefix2, `success delete file`);
    return res;
  }
};
var globalInstance2 = globalThis;
if (!globalInstance2.__S3_HELPER__)
  globalInstance2.__S3_HELPER__ = new S3Helper();
var awsS3 = globalInstance2.__S3_HELPER__;
var aws_s3_default = S3Helper;

// _src/services/user-service/index.ts
var detail5 = async (id, session) => {
  const user = await user_model_default.findOne({ _id: id, deletedAt: null }, null, {
    session
  });
  if (!user) throw new Error("user not found");
  const userForeign = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    photo: user.photo,
    provider: user.provider,
    role: user.role
  };
  return userForeign;
};

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
var detail6 = async (TID, session) => {
  const userPublic = await user_public_model_default.findOne(
    {
      code: TID,
      deletedAt: null
    },
    null,
    { session }
  );
  if (!userPublic) throw new Error("user_public.not_found");
  const userPublicFull = {
    ...userPublic.toObject(),
    user: null
  };
  if (userPublic?.user?.id) {
    const user = await detail5(userPublic.user.id, session);
    userPublicFull.user = user;
  }
  return userPublicFull;
};
var setup5 = async (userId) => {
  const timestamp = Date.now();
  const salt = randomBytes(4).toString("hex");
  const code = createHash("sha256").update(`${timestamp}${salt}`).digest("hex");
  const payload = { code };
  if (userId) {
    const userPublic = await user_public_model_default.findOne({
      "user.id": userId,
      deletedAt: null
    });
    if (userPublic) return userPublic.toObject();
    const user2 = await user_model_default.findOne({ _id: userId, deletedAt: null });
    if (user2) payload.user = { id: user2.id, name: user2.name };
  }
  const user = await user_public_model_default.create(payload);
  return user.toObject();
};
var UserPublicService = { verify: verify2, detail: detail6, setup: setup5 };
var user_public_service_default = UserPublicService;

export { user_public_service_default as default, detail6 as detail, setup5 as setup, verify2 as verify };
