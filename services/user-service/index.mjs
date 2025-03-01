import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Schema, models, model, startSession } from 'mongoose';
import 'dayjs';
import * as ioredis_star from 'ioredis';
import { Redis } from 'ioredis';
import { randomUUID } from 'crypto';
import * as client_s3_star from '@aws-sdk/client-s3';
import { S3Client, HeadBucketCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import slugify from 'slugify';
import '@zxing/browser';

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
    userId: { type: String, required: true }
  },
  { timestamps: true }
);
S3Schema.set("toObject", ToObject);
S3Schema.set("toJSON", ToObject);
var S3Model = models.S3 || model("S3", S3Schema);
var s3_model_default = S3Model;

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

// _src/services/user-public-service/index.ts
var verify = async (value, session) => {
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

// _src/types/user-stage.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});
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
var UserStageModel = models.UserStage || model("UserStage", UserStageSchema, "usersStage");
var user_stage_model_default = UserStageModel;
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
var UserChallengeModel = models.UserChallenge || model("UserChallenge", UserChallengeSchema, "usersChallenge");
var user_challenge_model_default = UserChallengeModel;
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
models.PhotoHunt || model("PhotoHunt", PhotoHuntSchema, "photoHunts");

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
var userSync = async (TID, session) => {
  const userPublicData = await verify(TID, session);
  const userPublic = {
    code: userPublicData.code,
    id: userPublicData.id,
    name: userPublicData.name
  };
  await user_challenge_model_default.updateMany(
    { "userPublic.code": TID },
    { userPublic }
  );
};

// _src/services/user-stage-service/index.ts
var userSync2 = async (TID, session) => {
  const userPublicData = await verify(TID, session);
  const userPublic = {
    id: userPublicData.id,
    code: userPublicData.code,
    name: userPublicData.name
  };
  await user_stage_model_default.updateMany({ "userPublic.code": TID }, { userPublic });
};

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
    const Key = slugify(`${names.join(".")}-${unique}${ext}`);
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

// _src/services/s3-service/index.ts
var S3ServiceSet = async (payload, userId, session) => {
  const userData = await user_model_default.findOne(
    { _id: userId },
    { _id: true },
    { session }
  );
  if (!userData) throw new Error("s3.user_empty");
  const resS3 = await awsS3.put(payload);
  if (!resS3) throw new Error("s3.failed_upload");
  const [item] = await s3_model_default.create(
    [
      {
        fileName: resS3.fileName,
        fileUrl: resS3.fileUrl,
        fileSize: payload.buffer.length,
        fileType: payload.mimetype,
        userId
      }
    ],
    { session }
  );
  return item.toObject();
};
var S3ServiceDelete = async (key, session) => {
  const res = await awsS3.delete(key);
  await s3_model_default.deleteOne({ fileName: key }, { session });
  return res;
};

// _src/helpers/index.ts
var urlToBuffer = async (photoURL) => {
  const response = await fetch(photoURL);
  if (!response.ok) throw new Error("Failed to fetch image");
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimetype = response.headers.get("content-type") || "application/octet-stream";
  return { buffer, mimetype };
};

// _src/services/user-service/index.ts
var register = async (payload, TID) => {
  return await db_default.transaction(async (session) => {
    const { email, name, password: rawPassword } = payload;
    const userPublic = await verify(TID, session);
    if (userPublic.user?.id) throw new Error("user.exists");
    const userExists = await user_model_default.findOne({ email }, { _id: 1 }).session(
      session
    );
    if (userExists) throw new Error("email taken");
    const password = await hash(rawPassword, 10);
    const [user] = await user_model_default.create(
      [
        {
          name,
          email,
          password,
          role: USER_ROLES.Public,
          provider: [USER_PROVIDERS.Email]
        }
      ],
      { session }
    );
    const data = {
      name: user.name,
      user: { id: user._id, name: user.name, email: user.email }
    };
    await user_public_model_default.updateOne({ code: TID }, { $set: data }, { session });
    await dataSync(TID, session);
    return user.toObject();
  });
};
var googleSign = async (payload, TID) => {
  return await db_default.transaction(async (session) => {
    const { email, displayName: name, photoURL, phoneNumber: phone } = payload;
    if (!(email && name)) throw new Error("user.payload_invalid");
    const user = await Promise.resolve().then(async () => {
      const userExists = await user_model_default.findOne({ email }, null, { session });
      if (userExists) {
        if (!userExists.provider.includes(USER_PROVIDERS.Google)) {
          userExists.provider.push(USER_PROVIDERS.Google);
          await userExists.save({ session });
        }
        return userExists;
      }
      const [user2] = await user_model_default.create(
        [{ name, email, provider: ["google"] }],
        { session }
      );
      return user2;
    });
    const userId = user._id.toString();
    const userForeign = {
      id: userId,
      name,
      email,
      photo: user.photo?.fileUrl || null
    };
    if (photoURL && !user.photo?.fileUrl) {
      const res = await urlToBuffer(photoURL);
      const s3payload = {
        ...res,
        filename: `${name}_photo`
      };
      const photo = await S3ServiceSet(s3payload, userId, session);
      userForeign.photo = photo.fileUrl;
      const s3foreign = {
        fileName: photo.fileName,
        fileSize: photo.fileSize,
        fileUrl: photo.fileUrl
      };
      await user_model_default.updateOne(
        { _id: userId },
        { $set: { photo: s3foreign } },
        { session }
      );
    }
    await user_public_model_default.findOneAndUpdate(
      { code: TID },
      { $set: { name, phone, user: userForeign } },
      { session }
    );
    if (user.provider.includes(USER_PROVIDERS.Google)) return user.toObject();
    await dataSync(TID, session);
    const userResult = await user_model_default.findOne({ _id: userId }, null, {
      session
    });
    return userResult?.toObject();
  });
};
var login = async (payload, provider, secret) => {
  const email = payload.email;
  const user = await user_model_default.findOne({ email });
  if (!user) throw new Error("user not found");
  if (provider == "email") {
    if (!user.password) throw new Error("user.password_empty");
    if (!payload.password) throw new Error("login.password_empty");
    const isPasswordValid = await compare(payload.password, user.password);
    if (!isPasswordValid) throw new Error("invalid password");
  }
  const userPublic = await user_public_model_default.findOne({
    "user.id": user._id.toString()
  });
  if (!userPublic) throw new Error("user_public.not_found");
  const token = sign({ id: user._id }, secret, {
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
  const user = await user_model_default.findOne({ _id: id, deletedAt: null }, null, {
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
    await user_model_default.updateOne(
      { _id: id },
      { $set: { name: payload.name } },
      { session, new: true }
    );
    const userPublic = await user_public_model_default.findOneAndUpdate(
      { "user.id": id },
      { $set: { ...payload, "user.name": payload.name } },
      { session, new: true }
    );
    if (!userPublic) throw new Error("user.not_found");
    await dataSync(userPublic.code, session);
    redis.pub("update-user", userPublic);
    return userPublic.toObject();
  });
};
var updatePhoto = async (userId, payload) => {
  return await db_default.transaction(async (session) => {
    const user = await detail6(userId, session);
    const userPublic = await user_public_model_default.findOne({ "user.id": userId });
    if (!userPublic) throw new Error("user.not_found");
    const oldPhoto = user.photo?.fileName;
    if (oldPhoto) await S3ServiceDelete(oldPhoto);
    const res = await S3ServiceSet(payload, userId, session);
    const photo = {
      fileName: res.fileName,
      fileSize: res.fileSize,
      fileUrl: res.fileUrl
    };
    await user_model_default.updateOne(
      { _id: user.id },
      { $set: { photo } },
      { session }
    );
    const newUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      photo: res.fileUrl
    };
    userPublic.user = newUser;
    await userPublic.save({ session });
    redis.pub("update-user", userPublic);
    return userPublic.toObject();
  });
};
var _delete = async (id) => {
};
var dataSync = async (TID, session) => {
  await userSync2(TID, session);
  await userSync(TID, session);
};
var UserService = {
  register,
  googleSign,
  login,
  profile,
  list: list2,
  create,
  detail: detail6,
  update,
  updatePhoto,
  delete: _delete
};
var user_service_default = UserService;

export { _delete, create, dataSync, user_service_default as default, detail6 as detail, googleSign, list2 as list, login, profile, register, update, updatePhoto };
