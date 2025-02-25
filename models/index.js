'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mongoose = require('mongoose');

// _src/models/challenge/index.ts

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
var QrModel = mongoose.models.Qr || mongoose.model("Qr", QrSchema);
var qr_default = QrModel;
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
mongoose.models.S3 || mongoose.model("S3", S3Schema);

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
var UserTriviaModel = mongoose.models.UserTrivia || mongoose.model("UserTrivia", UserTriviaSchema, "usersTrivia");
var user_trivia_default = UserTriviaModel;
new mongoose.Schema(
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

// _src/models/index.ts
var models12 = {
  ChallengeModel: challenge_default,
  QrModel: qr_default,
  StageModel: stage_default,
  TriviaModel: trivia_default,
  PhotoHuntModel: photo_hunt_default,
  UserModel: user_default,
  UserChallengeModel: user_challenge_default,
  UserPublicModel: user_public_default,
  UserStageModel: user_stage_default,
  UserTriviaModel: user_trivia_default
};
var models_default = models12;

exports.ChallengeModel = challenge_default;
exports.PhotoHuntModel = photo_hunt_default;
exports.QrModel = qr_default;
exports.StageModel = stage_default;
exports.TriviaModel = trivia_default;
exports.UserChallengeModel = user_challenge_default;
exports.UserModel = user_default;
exports.UserPublicModel = user_public_default;
exports.UserStageModel = user_stage_default;
exports.UserTriviaModel = user_trivia_default;
exports.default = models_default;
