import { Schema, models, model, startSession } from 'mongoose';
import dayjs from 'dayjs';
import { randomUUID, randomBytes, createHash } from 'crypto';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import * as client_s3_star from '@aws-sdk/client-s3';
import { S3Client, HeadBucketCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import slugify from 'slugify';
import * as ioredis_star from 'ioredis';
import { Redis } from 'ioredis';
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
var transaction = async (operation, clientSession) => {
  const session = clientSession ?? await startSession();
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
var FEATURE_STATUS = PUBLISHING_STATUS;
var FEATURE_TYPES = {
  Event: "event",
  Patch: "patch",
  Info: "info"
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
var QrModel = models.Qr || model("Qr", QrSchema);
var qr_model_default = QrModel;

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
    qr: { type: QrForeignSchema, default: null },
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
    qr: { type: QrForeignSchema, default: null },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
StageSchema.set("toObject", ToObject);
StageSchema.set("toJSON", ToObject);
var StageModel = models.Stage || model("Stage", StageSchema);
var stage_model_default = StageModel;
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
var S3Model = models.S3 || model("S3", S3Schema);
var s3_model_default = S3Model;

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
    const stage2 = {
      id: stageData.id,
      name: stageData.name,
      settings: {
        periode: stageData.settings.periode
      },
      storyline: stageData.storyline
    };
    const [userStageData] = await user_stage_model_default.create(
      [{ userPublic, stage: stage2 }],
      { session }
    );
    const contents = await init(stageData, userStageData, session);
    userStageData.contents = contents.map((item) => item._id.toString());
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
var detail = async (id, TID) => {
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
var userSync = async (TID, session) => {
  const userPublicData = await verify2(TID, session);
  const userPublic = {
    id: userPublicData.id,
    code: userPublicData.code,
    name: userPublicData.name
  };
  await user_stage_model_default.updateMany({ "userPublic.code": TID }, { userPublic });
};
var UserStageService = { list, detail, setup, verify: verify3, submitState };
var user_stage_service_default = UserStageService;

// _src/plugins/aws-s3/index.ts
var aws_s3_exports = {};
__export(aws_s3_exports, {
  S3Helper: () => S3Helper,
  awsS3: () => awsS3,
  default: () => aws_s3_default
});
__reExport(aws_s3_exports, client_s3_star);
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
    this.client = new S3Client(config);
    this.initiate();
  }
  async initiate() {
    if (!(this.client && this.bucket)) return;
    this.status = 1;
    this.client.send(new HeadBucketCommand({ Bucket: this.bucket })).then(() => {
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
    const command = new DeleteObjectCommand(config);
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
var photohunt_model_default = PhotoHuntModel;
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
var user_photohunt_model_default = UserPhotoHuntModel;
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

// _src/services/s3-service/index.ts
var S3ServiceSet = async (payload, userId, session) => {
  const userData = await user_model_default.findOne(
    { _id: userId },
    { _id: true },
    { session }
  );
  if (userId && !userData) throw new Error("s3.user_empty");
  const resS3 = await awsS3.put(payload);
  if (!resS3) throw new Error("s3.failed_upload");
  const [item] = await s3_model_default.create(
    [
      {
        fileName: resS3.fileName,
        fileUrl: resS3.fileUrl,
        fileSize: payload.buffer.length,
        fileType: payload.mimetype,
        userId: userId ?? null
      }
    ],
    { session }
  );
  return item.toObject();
};
var S3ServiceGet = async (path) => {
  const res = await s3_model_default.findOne({ fileName: path });
  if (!res) throw new Error("s3.file_not_found");
  return res.toObject();
};
var S3ServiceDelete = async (key, session) => {
  const res = await awsS3.delete(key);
  await s3_model_default.deleteOne({ fileName: key }, { session });
  return res;
};
var S3Service = {
  set: S3ServiceSet,
  get: S3ServiceGet,
  delete: S3ServiceDelete
};
var s3_service_default = S3Service;

// _src/plugins/redis/index.ts
var redis_exports = {};
__export(redis_exports, {
  RedisHelper: () => RedisHelper,
  default: () => redis_default,
  redis: () => redis
});
__reExport(redis_exports, ioredis_star);
var prefix2 = "\x1B[38;5;196mREDIS:\x1B[0m";
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
      id: randomUUID(),
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

// _src/helpers/bonus.ts
var timeBonus = (seconds, totalSeconds, maxPoint = 1e3) => {
  return Math.round(maxPoint * (1 - seconds / totalSeconds));
};

// _src/helpers/service.ts
var list2 = async (model14, page, limit, filters = {}, sort) => {
  const skip = (page - 1) * limit;
  const filter = {
    ...filters,
    deletedAt: null
  };
  const items = await model14.find(filter).skip(skip).limit(limit).sort(sort ?? { createdAt: -1 });
  const totalItems = await model14.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);
  return {
    list: items.map((item) => item.toObject ? item.toObject() : item),
    page,
    totalItems,
    totalPages
  };
};
var service = { list: list2 };
var service_default = service;

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
    const userPublic = await verify2(TID, session);
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
var list3 = async (params) => {
};
var create = async (payload) => {
};
var detail2 = async (id, session) => {
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
var updatePassword = async (id, payload) => {
  const user = await user_model_default.findOne({ _id: id });
  if (!user) throw new Error("user.not_found");
  const provider = user.provider;
  if (payload.old_password && user.password) {
    const isPasswordValid = await compare(payload.old_password, user.password);
    if (!isPasswordValid) throw new Error("user.invalid_old_password");
  } else if (!provider.includes("email")) {
    provider.push("email");
  }
  const password = await hash(payload.new_password, 10);
  await user_model_default.updateOne({ _id: id }, { $set: { password, provider } });
  return {};
};
var updatePhoto = async (userId, payload) => {
  return await db_default.transaction(async (session) => {
    const user = await detail2(userId, session);
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
  await userSync(TID, session);
  await userSync2(TID, session);
};
var UserService = {
  register,
  googleSign,
  login,
  profile,
  list: list3,
  create,
  detail: detail2,
  update,
  updatePassword,
  updatePhoto,
  delete: _delete
};
var user_service_default = UserService;

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
var detail3 = async (TID, session) => {
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
    const user = await detail2(userPublic.user.id, session);
    userPublicFull.user = user;
  }
  return userPublicFull;
};
var setup2 = async (userId) => {
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
var UserPublicService = { verify: verify2, detail: detail3, setup: setup2 };
var user_public_service_default = UserPublicService;

// _src/services/trivia-service/index.ts
var createMany = async (challenge, payload, session) => {
  if (payload.length === 0) return [];
  const items = payload.map((item, i) => ({
    ...item,
    challenge
  }));
  return await trivia_model_default.insertMany(items, { session });
};
var updateMany = async (challenge, payload, session) => {
  if (payload.length === 0) return [];
  const ids = payload.map(({ id }) => id);
  const res = await trivia_model_default.bulkWrite(
    payload.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.id },
          update: {
            $set: {
              ...item,
              challenge
            }
          }
        }
      };
    }),
    { session }
  );
  if (res.modifiedCount !== payload.length)
    throw new Error("trivia.sync.update_error");
  return await trivia_model_default.find({ _id: { $in: ids } });
};
var detail5 = async (id) => {
  const item = await trivia_model_default.findOne({ _id: id });
  if (!item) throw new Error("trivia not found");
  return item;
};
var details = async (challengeId) => {
  const challenge = await detail4(challengeId);
  if (challenge.settings.type !== CHALLENGE_TYPES.Trivia)
    throw new Error("challenge.not_trivia_type_error");
  const items = await trivia_model_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};
var sync = async (challengeId, payload) => {
  return await transaction(async (session) => {
    await trivia_model_default.updateMany(
      { "challenge.id": challengeId },
      { $set: { challenge: null } },
      { session }
    );
    if (payload.length === 0) return [];
    const challenge = await detail4(challengeId);
    if (challenge.settings.type !== CHALLENGE_TYPES.Trivia)
      throw new Error("challenge.not_trivia_type_error");
    const challengeForeign = { id: challenge.id, name: challenge.name };
    const { create: itemsCreate, update: itemsUpdate } = payload.reduce(
      (acc, cur) => {
        acc[cur.id ? "update" : "create"].push(cur);
        return acc;
      },
      { create: [], update: [] }
    );
    const itemsCreated = await createMany(
      challengeForeign,
      itemsCreate,
      session
    );
    const itemsUpdated = await updateMany(
      challengeForeign,
      itemsUpdate,
      session
    );
    const items = [...itemsCreated, ...itemsUpdated].map(
      (item) => item.toObject()
    );
    await updateContent(
      challengeId,
      items.map(({ id }) => id)
    );
    return items;
  });
};
var verify4 = async (id) => {
};
var TriviaService = { detail: detail5, details, sync, verify: verify4 };
var trivia_service_default = TriviaService;

// _src/services/user-trivia-service/index.ts
var setup3 = async (userPublic, userChallenge, session) => {
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
var details2 = async (ids, TID, hasResult, session) => {
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
    const trivia = await detail5(userTrivia.trivia.id);
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
var submitEmpties = async (userChallengeId, TID, session) => {
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
var summary2 = async (userChallengeId, TID, session) => {
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
  setup: setup3,
  details: details2,
  submit: submit2,
  submitEmpties,
  summary: summary2
};
var user_trivia_service_default = UserTriviaService;

// _src/services/photohunt-service/index.ts
var createMany2 = async (challenge, payload, session) => {
  if (payload.length === 0) return [];
  const qrs = await (await QrGenerate(payload.length, session)).map((item) => ({
    id: item._id.toString(),
    code: item.code,
    location: item.location
  }));
  if (qrs.length !== payload.length)
    throw new Error("photohunt.sync.qr_not_enough_error");
  const items = await photohunt_model_default.insertMany(
    payload.map((item, i) => ({
      ...item,
      challenge,
      qr: qrs[i]
    })),
    { session }
  );
  const res = await qr_model_default.bulkWrite(
    items.map((item) => {
      const content = {
        type: "photohunt",
        refId: item.id
      };
      return {
        updateOne: {
          filter: { _id: item.qr?.id },
          update: { $set: { content } }
        }
      };
    }),
    { session }
  );
  if (res.modifiedCount !== items.length)
    throw new Error("photohunt.sync.qr_updating_error");
  return items;
};
var updateMany2 = async (challenge, payload, session) => {
  if (payload.length === 0) return [];
  const ids = payload.map(({ id }) => id);
  const res = await photohunt_model_default.bulkWrite(
    payload.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.id },
          update: { $set: { ...item, challenge } }
        }
      };
    }),
    { session }
  );
  if (res.modifiedCount !== payload.length)
    throw new Error("photohunt.sync.update_error");
  return await photohunt_model_default.find({ _id: { $in: ids } });
};
var detail6 = async (id) => {
  const item = await photohunt_model_default.findOne({ _id: id });
  if (!item) throw new Error("photo hunt not found");
  return item.toObject();
};
var details3 = async (challengeId) => {
  const challenge = await detail4(challengeId);
  if (challenge.settings.type !== CHALLENGE_TYPES.PhotoHunt)
    throw new Error("challenge.not_photohunt_type_error");
  const items = await photohunt_model_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};
var sync2 = async (challengeId, payload) => {
  return transaction(async (session) => {
    await photohunt_model_default.updateMany(
      { "challenge.id": challengeId },
      { $set: { challenge: null } },
      { session }
    );
    if (payload.length === 0) return [];
    const challenge = await detail4(challengeId);
    if (challenge.settings.type !== CHALLENGE_TYPES.PhotoHunt)
      throw new Error("challenge.not_photohunt_type_error");
    const challengeForeign = { id: challenge.id, name: challenge.name };
    const { create: itemsCreate, update: itemsUpdate } = payload.reduce(
      (acc, cur) => {
        acc[cur.id ? "update" : "create"].push(cur);
        return acc;
      },
      { create: [], update: [] }
    );
    const itemsCreated = await createMany2(
      challengeForeign,
      itemsCreate,
      session
    );
    const itemsUpdated = await updateMany2(
      challengeForeign,
      itemsUpdate,
      session
    );
    const items = [...itemsCreated, ...itemsUpdated].map(
      (item) => item.toObject()
    );
    await updateContent(
      challengeId,
      items.map(({ id }) => id)
    );
    return items;
  });
};
var verify5 = async (id) => {
};
var verifyCode = async (challengeId, code) => {
  const item = await photohunt_model_default.findOne({
    "challenge.id": challengeId,
    "qr.code": code
  });
  if (!item) throw new Error("photohunt.not_found");
  return item.toObject();
};
var PhotoHuntService = { detail: detail6, details: details3, sync: sync2, verify: verify5, verifyCode };
var photohunt_service_default = PhotoHuntService;

// _src/services/user-photohunt-service/index.ts
var setup4 = async (userPublic, userChallenge, session) => {
  const items = await details3(userChallenge.challengeId);
  const payload = items.map(({ id, hint }) => {
    return {
      userPublic,
      userChallenge,
      photoHunt: { id, hint }
    };
  });
  return await user_photohunt_model_default.insertMany(payload, { session });
};
var details4 = async (ids, TID, hasResult, session) => {
  const filter = {};
  if (hasResult !== undefined)
    filter.results = hasResult ? { $ne: null } : null;
  const data = await user_photohunt_model_default.find(
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
var submit3 = async (userChallengeId, TID, code, bonus) => {
  return db_default.transaction(async (session) => {
    const userChallenge = await detail7(userChallengeId, TID);
    const {
      challenge: { id: challengeId }
    } = userChallenge;
    const photoHunt = await verifyCode(challengeId, code);
    const userPhotoHunt = await user_photohunt_model_default.findOne({
      "photoHunt.id": photoHunt.id,
      "userPublic.code": TID
    });
    if (!userPhotoHunt) throw new Error("user_photohunt.not_found");
    if (userPhotoHunt.results) throw new Error("user_photohunt.submitted");
    userPhotoHunt.results = {
      score: photoHunt.score,
      foundAt: /* @__PURE__ */ new Date(),
      feedback: photoHunt.feedback
    };
    await userPhotoHunt.save({ session });
    await submit(userChallengeId, TID, session);
    return userPhotoHunt.toObject();
  });
};
var submitEmpties2 = async (userChallengeId, TID, session) => {
  const results = {
    feedback: null,
    foundAt: null,
    score: 0
  };
  return await user_photohunt_model_default.updateMany(
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
  const [summary4] = await user_photohunt_model_default.aggregate().match({
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
var UserPhotoHuntService = {
  setup: setup4,
  details: details4,
  submit: submit3,
  submitEmpties: submitEmpties2,
  summary: summary3
};
var user_photohunt_service_default = UserPhotoHuntService;

// _src/services/user-challenge-service/index.ts
var services = {
  [CHALLENGE_TYPES.Trivia]: {
    setup: setup3,
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
    totalItem: 0,
    startAt: /* @__PURE__ */ new Date(),
    endAt: null
  };
};
var verify7 = async (challengeId, TID, setDiscover) => {
  const item = await user_challenge_model_default.findOne({
    "userPublic.code": TID,
    "challenge.id": challengeId,
    deletedAt: null
  });
  if (!item) return null;
  if (item.status == USER_CHALLENGE_STATUS.Undiscovered && setDiscover)
    await user_challenge_model_default.updateOne(
      { _id: item.id },
      { $set: { status: USER_CHALLENGE_STATUS.Discovered } }
    );
  return item.toObject();
};
var init = async (stage2, userStage, session) => {
  const challenges = await challenge_model_default.find({
    _id: { $in: stage2.contents }
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
  return await user_challenge_model_default.find(
    {
      _id: { $in: contents.map((item) => item._id) }
    },
    { _id: true },
    { session }
  );
};
var setup5 = async (challengeId, TID, setDiscover) => {
  const exist = await verify7(challengeId, TID, setDiscover);
  if (exist) return exist;
  const userPublicData = await verify2(TID);
  const challengeData = await verify6(challengeId);
  const stageId = challengeData.stage?.id;
  const userStageData = stageId && await user_stage_service_default.verify(stageId, TID);
  if (stageId && !userStageData) {
    const stageData = await stage_service_default.detail(stageId);
    if (!stageData.settings.canStartFromChallenges)
      throw new Error("user stage has not been found yet");
    await user_stage_service_default.setup(stageId, TID);
    const result = await verify7(challengeId, TID, setDiscover);
    if (result) return result;
    throw new Error("challenge setup error");
  }
  const userStage = userStageData && {
    id: userStageData.id,
    stageId: userStageData.stage.id,
    name: userStageData.stage.name
  };
  const userPublic = {
    code: userPublicData.code,
    id: userPublicData.id,
    name: userPublicData.name
  };
  const challenge = {
    id: challengeData.id,
    name: challengeData.name,
    storyline: challengeData.storyline,
    order: challengeData.order
  };
  const settings = {
    duration: challengeData.settings.duration,
    type: challengeData.settings.type
  };
  const userChallengeData = await user_challenge_model_default.create({
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
var list4 = async (params, TID) => {
  const { search, status, userStageId } = params;
  const filters = { "userPublic.code": TID };
  if (search) filters["challenge.name"] = { $regex: search, $options: "i" };
  if (status) filters.status = status;
  if (userStageId) filters["userStage.id"] = userStageId;
  const { list: list8, ...rest } = await service_default.list(
    user_challenge_model_default,
    params.page,
    params.limit,
    filters,
    "challenge.order"
  );
  return {
    list: list8.map(({ userPublic, ...item }) => item),
    ...rest
  };
};
var detail7 = async (id, TID) => {
  const data = await user_challenge_model_default.findOne({
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
var submit = async (id, TID, session, forceFinish) => {
  const { OnGoing, Completed } = USER_CHALLENGE_STATUS;
  const userChallenge = await user_challenge_model_default.findOne({ _id: id }, null, {
    session
  });
  if (!userChallenge) throw new Error("user_challenge.not_found");
  if (userChallenge.status === Completed) return userChallenge.toObject();
  const contents = forceFinish ? [] : await services[userChallenge.settings.type].details(
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
var userSync2 = async (TID, session) => {
  const userPublicData = await verify2(TID, session);
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
var UserChallengeService = {
  verify: verify7,
  setup: setup5,
  list: list4,
  detail: detail7,
  submit,
  summary,
  init
};
var user_challenge_service_default = UserChallengeService;
var servicesSetup = {
  stage: { setup },
  challenge: { setup: setup5 },
  trivia: null,
  photohunt: null
};
var list5 = async (params) => {
  const { page = 1, limit = 10 } = params;
  const skip = (page - 1) * limit;
  const filter = { deletedAt: null };
  if (params.status) filter.status = params.status;
  if (params.code) filter.code = params.code;
  if (params.hasContent != null)
    filter.content = params.hasContent ? { $ne: null } : null;
  const items = await qr_model_default.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
  const totalItems = await qr_model_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);
  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages
  };
};
var QrGenerate = async (count, session) => {
  const items = new Array(count).fill({}).map(() => {
    const salt = Math.floor(Math.random() * Math.pow(16, 8)).toString(16).padStart(8, "0");
    return {
      code: createHash("sha256").update(`${Date.now()}${salt}`).digest("hex"),
      status: QR_STATUS.Draft
    };
  });
  return qr_model_default.insertMany(items, { session });
};
var detail8 = async (id) => {
  const item = await qr_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("item not found");
  return item.toObject();
};
var details5 = async (ids) => {
  const items = await qr_model_default.find({ _id: { $in: ids } });
  return items.map((item) => item.toObject());
};
var QrUpdate = async (id, payload, session) => {
  return db_default.transaction(async (session2) => {
    const item = await qr_model_default.findOne({ _id: id, deletedAt: null }, null, {
      session: session2
    });
    if (!item) throw new Error("item not found");
    Object.assign(item, payload);
    await item.save({ session: session2 });
    return item.toObject();
  }, session);
};
var _delete2 = async (id) => {
  const item = await qr_model_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: /* @__PURE__ */ new Date() }
  );
  if (!item) throw new Error("item not found");
  return item;
};
var deleteMany = async (ids) => {
  const changed = await qr_model_default.updateMany(
    {
      _id: { $in: ids },
      deletedAt: null,
      status: QR_STATUS.Draft
    },
    { $set: { deletedAt: /* @__PURE__ */ new Date() } }
  );
  if (changed.modifiedCount == 0) throw new Error("item not found");
  return changed;
};
var verify8 = async (code, TID) => {
  const qrData = await qr_model_default.findOne({
    code,
    deletedAt: null,
    status: QR_STATUS.Publish
  });
  if (!qrData || !["stage", "challenge"].includes(String(qrData.content?.type)))
    throw new Error("qr code invalid");
  const { content } = qrData;
  if (!content) throw new Error("invalid qr content");
  const service2 = servicesSetup[content.type];
  const data = await service2?.setup(content.refId, TID, true);
  if (data) content.refId = data.id;
  await qr_model_default.updateOne(
    { _id: qrData.id },
    { accessCount: (qrData.accessCount || 0) + 1 }
  );
  return content;
};
var QrService = {
  generate: QrGenerate,
  list: list5,
  detail: detail8,
  details: details5,
  update: QrUpdate,
  delete: _delete2,
  deleteMany,
  verify: verify8
};
var qr_service_default = QrService;

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
var list6 = async (params) => {
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
var create2 = async (payload) => {
  await isUsed(payload.contents);
  const contents = await challenge_model_default.find({
    _id: { $in: payload.contents }
  });
  const stage2 = await stage_model_default.create({
    ...payload,
    contents: contents.map((item) => item.id)
  });
  const sync3 = contents.map((item) => {
    item.stage = { id: stage2.id, name: stage2.name };
    return item.save();
  });
  await Promise.all(sync3);
  return stage2.toObject();
};
var detail9 = async (id, session) => {
  const item = await stage_model_default.findOne({ _id: id, deletedAt: null }, null, {
    session
  });
  if (!item) throw new Error("stage not found");
  return item.toObject();
};
var StageUpdate = async (id, payload) => {
  return await transaction(async (session) => {
    await isUsed(payload.contents, id);
    const stage2 = await stage_model_default.findOne({ _id: id, deletedAt: null });
    if (!stage2) throw new Error("stage not found");
    const contents = (await challenge_model_default.find({
      _id: { $in: payload.contents },
      deletedAt: null
    })).map((item) => item.id);
    await challenge_model_default.updateMany(
      { "stage.id": stage2.id },
      { $set: { stage: null } },
      { session }
    );
    await challenge_model_default.updateMany(
      { _id: { $in: contents } },
      { $set: { stage: { id: stage2.id, name: stage2.name } } },
      { session }
    );
    Object.assign(stage2, { ...payload, contents });
    await stage2.save({ session });
    return stage2.toObject();
  });
};
var _delete3 = async (id) => {
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
    const stage2 = await stage_model_default.findOne(
      { _id: id, deletedAt: null },
      { _id: true, contents: true, qr: true },
      { session }
    );
    if (!stage2) throw new Error("stage.not_found");
    const challenges = await challenge_model_default.find(
      { _id: { $in: stage2.contents }, qr: null, deletedAt: null },
      { _id: true },
      { session }
    );
    const qrs = await QrGenerate(
      challenges.length + (stage2.qr ? 0 : 1),
      session
    );
    if (!stage2.qr) {
      const qr = qrs.pop();
      if (!qr) throw new Error("qr.not_enough");
      const stageQr = {
        id: qr.id,
        code: qr.code,
        location: qr.location
      };
      const qrContent = {
        type: "stage",
        refId: stage2.id
      };
      await stage_model_default.updateOne(
        { _id: stage2.id },
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
    const newStage = await stage_model_default.findById(stage2.id, null, { session });
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
  const stage2 = await detail9(id);
  const challenges = await ChallengeDetails(stage2.contents);
  return { stage: stage2, challenges };
};
var StageService = {
  list: list6,
  create: create2,
  detail: detail9,
  update: StageUpdate,
  delete: _delete3,
  verify,
  publish: StagePublish,
  detailFull: StageDetailFull
};
var stage_service_default = StageService;

// _src/services/challenge-service/index.ts
var list7 = async (params) => {
  const { page = 1, limit = 10 } = params;
  const skip = (page - 1) * limit;
  const filter = { deletedAt: null };
  if (params.stageId === "null") filter["stage"] = null;
  else if (params.stageId) filter["stage.id"] = params.stageId;
  if (params.type) filter["settings.type"] = params.type;
  const list8 = await challenge_model_default.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
  const totalItems = await challenge_model_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);
  return {
    list: list8.map((item) => item.toObject()),
    page,
    totalItems,
    totalPages
  };
};
var create3 = async (payload) => {
  return db_default.transaction(async (session) => {
    const { stageId, ...value } = payload;
    const stageData = stageId ? await detail9(stageId, session) : null;
    const stage2 = stageData ? { id: stageData.id, name: stageData.name } : null;
    const [item] = await challenge_model_default.create([{ ...value, stage: stage2 }], {
      session
    });
    if (stage2) {
      const contents = stageData?.contents || [];
      contents.push(item.id);
      item.order = contents.length;
      await Promise.all([
        stage_model_default.findOneAndUpdate(
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
var detail4 = async (id) => {
  const item = await challenge_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var ChallengeDetails = async (ids) => {
  const items = await challenge_model_default.find({ _id: { $in: ids } });
  return items.map((item) => item.toObject());
};
var update2 = async (id, payload) => {
  return await db_default.transaction(async (session) => {
    const { stageId, ...value } = payload;
    const item = await challenge_model_default.findOne({ _id: id, deletedAt: null });
    if (!item) throw new Error("challenge not found");
    const newStage = stageId ? await detail9(stageId) : null;
    const oldStage = item.stage?.id ? await detail9(item.stage.id) : null;
    const newContent = newStage?.contents || [];
    const oldContent = oldStage?.contents || [];
    if (!newContent.includes(id)) newContent.push(id);
    if (oldContent.includes(id)) oldContent.splice(oldContent.indexOf(id), 1);
    await stage_model_default.findOneAndUpdate(
      { _id: newStage?.id },
      { $set: { contents: newContent } },
      { session }
    );
    await stage_model_default.findOneAndUpdate(
      { _id: oldStage?.id },
      { $set: { contents: oldContent } },
      { session }
    );
    const stage2 = newStage ? { id: newStage.id, name: newStage.name } : null;
    Object.assign(item, value, { stage: stage2 });
    await item.save({ session });
    return item.toObject();
  });
};
var updateContent = async (id, contents) => {
  const item = await challenge_model_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { contents } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var _delete4 = async (id) => {
  const item = await challenge_model_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: Date.now() } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var verify6 = async (id) => {
  const item = await challenge_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  if (item.status !== CHALLENGE_STATUS.Publish)
    throw new Error("challenge not published yet");
  return item.toObject();
};
var ChallengeService = {
  list: list7,
  create: create3,
  detail: detail4,
  details: ChallengeDetails,
  // detailContent,
  update: update2,
  updateContent,
  delete: _delete4,
  verify: verify6
};
var challenge_service_default = ChallengeService;
var FeatureSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    quest: { type: StageForeignSchema, default: null },
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
var FeatureModel = models.Feature || model("Feature", FeatureSchema);
var feature_model_default = FeatureModel;

// _src/services/feature-service/index.ts
var FeatureList = async (params) => {
  const { page = 1, limit = 10 } = params || {};
  const filters = {};
  if (params?.questId) filters["quest.id"] = params.questId;
  if (params?.search)
    filters["title"] = { $regex: params.search, $options: "i" };
  if (params?.type) filters["type"] = params.type;
  return list2(feature_model_default, page, limit, filters);
};
var FeatureCreate = async (payload) => {
  return db_default.transaction(async (session) => {
    const { featuredImage, questId, ...data } = payload;
    const s3FeaturedImg = featuredImage ? await S3ServiceSet(featuredImage, undefined, session).then(
      ({ fileName, fileSize, fileUrl }) => {
        return { fileName, fileSize, fileUrl };
      }
    ) : null;
    const quest = questId ? await detail9(questId, session).then((res) => ({
      id: res.id,
      name: res.name,
      settings: { periode: res.settings.periode },
      storyline: res.storyline
    })) : null;
    const [item] = await feature_model_default.create(
      [{ ...data, quest, featuredImage: s3FeaturedImg }],
      { session }
    );
    if (!item) throw new Error("feature.unexpected_error");
    return item.toObject();
  });
};
var FeatureDetail = async (id) => {
  const item = await feature_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("feature.not_found");
  return item.toObject();
};
var FeatureUpdate = async (id, payload) => {
  return db_default.transaction(async (session) => {
    const item = await feature_model_default.findOne({ _id: id, deletedAt: null });
    if (!item) throw new Error("feature.not_found");
    const { featuredImage, questId, ...data } = payload;
    const s3FeaturedImg = featuredImage ? await S3ServiceSet(featuredImage, undefined, session).then(
      ({ fileName, fileSize, fileUrl }) => {
        return { fileName, fileSize, fileUrl };
      }
    ) : null;
    const quest = questId ? await detail9(questId, session).then((res) => ({
      id: res.id,
      name: res.name,
      settings: { periode: res.settings.periode },
      storyline: res.storyline
    })) : null;
    const update3 = { ...data, quest };
    if (s3FeaturedImg) update3.featuredImage = s3FeaturedImg;
    if (!update3.attachments) update3.attachments = [];
    const newItem = await feature_model_default.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: update3 },
      { new: true }
    );
    if (!newItem) throw new Error("feature.not_found");
    return newItem.toObject();
  });
};
var FeatureDelete = async (id) => {
  const item = await feature_model_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("feature.not_found");
  item.deletedAt = /* @__PURE__ */ new Date();
  await item.save();
  return {};
};
var FeaturePublished = async (type, slug) => {
  const item = await feature_model_default.findOne({
    type,
    slug,
    status: FEATURE_STATUS.Publish,
    deletedAt: null
  });
  if (!item) throw new Error("feature.not_found");
  return item.toObject();
};
var FeatureService = {
  list: FeatureList,
  create: FeatureCreate,
  detail: FeatureDetail,
  update: FeatureUpdate,
  delete: FeatureDelete,
  published: FeaturePublished
};
var feature_service_default = FeatureService;

// _src/services/leaderboard-service/index.ts
var stage = async (stageId, TID, limit) => {
  const filter = { "stage.id": stageId, results: { $ne: null } };
  const pipelines = [
    { $match: filter },
    {
      $setWindowFields: {
        sortBy: { "results.totalScore": -1 },
        output: { rank: { $rank: {} } }
      }
    },
    {
      $project: {
        rank: 1,
        userPublic: 1,
        stage: 1,
        totalScore: "$results.totalScore"
      }
    }
  ];
  if (limit) pipelines.splice(2, 0, { $limit: limit });
  else if (TID) pipelines.splice(2, 0, { $match: { "userPublic.code": TID } });
  const total = await user_stage_model_default.countDocuments(filter);
  const ranks = await user_stage_model_default.aggregate(pipelines);
  return { ranks, total };
};
var LeaderboardService = { stage };
var leaderboard_service_default = LeaderboardService;

export { challenge_service_default as ChallengeService, feature_service_default as FeatureService, leaderboard_service_default as LeaderboardService, photohunt_service_default as PhotoHuntService, qr_service_default as QrService, s3_service_default as S3Service, stage_service_default as StageService, trivia_service_default as TriviaService, user_challenge_service_default as UserChallengeService, user_photohunt_service_default as UserPhotoHuntService, user_public_service_default as UserPublicService, user_service_default as UserService, user_stage_service_default as UserStageService, user_trivia_service_default as UserTriviaService };
