// _src/models/UserModel/index.ts
import { model, models, Schema } from "mongoose";

// _src/models/UserModel/types.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Admin"] = "admin";
  UserRole2["Private"] = "private";
  UserRole2["Public"] = "public";
  return UserRole2;
})(UserRole || {});

// _src/models/UserModel/index.ts
var ToObject = {
  transform: (doc, ret) => {
    const { _id, __v, password, ...rest } = ret;
    return { id: _id, ...rest };
  }
};
var UserForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: "" }
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
UserSchema.set("toJSON", ToObject);
UserSchema.set("toObject", ToObject);
var UserModel = models.User || model("User", UserSchema);
var UserModel_default = UserModel;

// _src/services/UserService/index.ts
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

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
import { Schema as Schema2 } from "mongoose";
var ToObject2 = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  }
};
var IdNameSchema = new Schema2(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var PeriodSchema = new Schema2(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);

// _src/models/UserPublicModel/index.ts
import { model as model2, models as models2, Schema as Schema3 } from "mongoose";

// _src/models/UserPublicModel/types.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

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
UserPublicSchema.set("toJSON", ToObject2);
UserPublicSchema.set("toObject", ToObject2);
var UserPublicModel = models2.UserPublic || model2("UserPublic", UserPublicSchema, "usersPublic");
var UserPublicModel_default = UserPublicModel;

// _src/services/UserPublicService/index.ts
import { enc, lib, SHA256 } from "crypto-js";

// _src/models/ChallengeModel/index.ts
import { model as model3, models as models3, Schema as Schema4 } from "mongoose";

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
var ChallengeFeedbackSchema = new Schema4(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsSchema = new Schema4(
  {
    type: { type: String, enum: Object.values(ChallengeType), required: true },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: ChallengeFeedbackSchema }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsForeignSchema = new Schema4(
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
var ChallengeForeignSchema = new Schema4(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: ChallengeSettingsSchema, required: true }
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
      enum: Object.values(ChallengeStatus),
      default: "draft" /* Draft */
    },
    settings: { type: ChallengeSettingsSchema, default: null },
    contents: { type: [String] },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
ChallengeSchema.set("toJSON", ToObject2);
ChallengeSchema.set("toObject", ToObject2);
var ChallengeModel = models3.Challenge || model3("Challenge", ChallengeSchema);

// _src/models/QrModel/index.ts
import { model as model4, models as models4, Schema as Schema5 } from "mongoose";

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
var QrContentSchema = new Schema5(
  {
    type: { type: String, enum: Object.values(QrContentType), required: true },
    refId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrLocationSchema = new Schema5(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new Schema5(
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
QrSchema.set("toObject", ToObject2);
QrSchema.set("toJSON", ToObject2);
var QrModel = models4.Qr || model4("Qr", QrSchema);

// _src/models/StageModel/types.ts
var StageStatus = /* @__PURE__ */ ((StageStatus2) => {
  StageStatus2["Draft"] = "draft";
  StageStatus2["Publish"] = "publish";
  return StageStatus2;
})(StageStatus || {});

// _src/models/StageModel/index.ts
import { model as model5, models as models5, Schema as Schema6 } from "mongoose";
var StageSettingsSchema = new Schema6(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new Schema6(
  {
    periode: { type: PeriodSchema, required: true }
  },
  { _id: false }
);
var StageForeignSchema = new Schema6(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true }
  },
  { _id: false }
);
var StageSchema = new Schema6(
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
StageSchema.set("toObject", ToObject2);
StageSchema.set("toJSON", ToObject2);
var StageModel = models5.Stage || model5("Stage", StageSchema);

// _src/models/TriviaModel/index.ts
import { model as model6, models as models6, Schema as Schema7 } from "mongoose";
var TriviaOptionSchema = new Schema7(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 }
  },
  { _id: false, versionKey: false }
);
var TriviaForeignOptionSchema = new Schema7(
  {
    text: { type: String, required: true }
  },
  { _id: false }
);
var TriviaForeignSchema = new Schema7(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    allowMultiple: { type: Boolean, required: true },
    options: { type: [TriviaForeignOptionSchema], required: true }
  },
  { _id: false }
);
var TriviaSchema = new Schema7(
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
TriviaSchema.set("toObject", ToObject2);
TriviaSchema.set("toJSON", ToObject2);
var TriviaModel = models6.Trivia || model6("Trivia", TriviaSchema);

// _src/models/UserChallengeModel/index.ts
import { model as model8, models as models8, Schema as Schema9 } from "mongoose";

// _src/models/UserChallengeModel/types.ts
var UserChallengeStatus = /* @__PURE__ */ ((UserChallengeStatus2) => {
  UserChallengeStatus2["Undiscovered"] = "undiscovered";
  UserChallengeStatus2["Discovered"] = "discovered";
  UserChallengeStatus2["OnGoing"] = "ongoing";
  UserChallengeStatus2["Completed"] = "completed";
  UserChallengeStatus2["Failed"] = "failed";
  return UserChallengeStatus2;
})(UserChallengeStatus || {});

// _src/models/UserStageModel/index.ts
import { model as model7, models as models7, Schema as Schema8 } from "mongoose";

// _src/models/UserStageModel/types.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/UserStageModel/index.ts
var UserStageForeignSchema = new Schema8(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserStageSchema = new Schema8(
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
UserStageSchema.set("toJSON", ToObject2);
UserStageSchema.set("toObject", ToObject2);
var UserStageModel = models7.UserStage || model7("UserStage", UserStageSchema, "usersStage");

// _src/models/UserChallengeModel/index.ts
var UserChallengeForeignSchema = new Schema9(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserChallengeSchema = new Schema9(
  {
    userStage: { type: UserStageForeignSchema, default: null },
    challenge: { type: ChallengeForeignSchema, required: true },
    userPublic: { type: UserPublicForeignSchema, required: true },
    status: {
      type: String,
      enum: Object.values(UserChallengeStatus),
      default: "undiscovered" /* Undiscovered */
    },
    contents: { type: [String], default: [] },
    score: { type: Number, default: null },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);
UserChallengeSchema.set("toJSON", ToObject2);
UserChallengeSchema.set("toObject", ToObject2);
var UserChallengeModel = models8.UserChallenge || model8("UserChallenge", UserChallengeSchema, "usersChallenge");

// _src/models/UserTriviaModel/index.ts
import { model as model9, models as models9, Schema as Schema10 } from "mongoose";
var UserTriviaResultSchema = new Schema10(
  {
    answer: { type: String, required: true },
    feedback: { type: String, default: "" },
    isCorrect: { type: Boolean, required: true },
    score: { type: Number, required: true }
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
UserTriviaSchema.set("toJSON", ToObject2);
UserTriviaSchema.set("toObject", ToObject2);
var UserTriviaModel = models9.UserTrivia || model9("UserTrivia", UserTriviaSchema, "usersTrivia");

// _src/services/UserPublicService/index.ts
var verify = async (value) => {
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
var UserPublicService = { verify, setup };
var UserPublicService_default = UserPublicService;

// _src/services/UserService/index.ts
var register = async (payload, code) => {
  return await db_default.transaction(async (session) => {
    const email = payload.email;
    const userExists = await UserModel_default.findOne({ email }).session(session);
    if (userExists) throw new Error("email taken");
    const password = await hash(payload.password, 10);
    const [user] = await UserModel_default.create(
      [
        {
          email,
          password,
          role: "public" /* Public */
        }
      ],
      { session }
    );
    await UserPublicModel_default.findOneAndUpdate(
      { code },
      { $set: { user: { id: user._id, name: user.name } } },
      { new: true, session }
    );
    return user;
  });
};
var login = async (payload, secret) => {
  const email = payload.email;
  const user = await UserModel_default.findOne({ email });
  if (!user) throw new Error("user not found");
  const isPasswordValid = await compare(payload.password, user.password);
  if (!isPasswordValid) throw new Error("invalid password");
  const userPublic = await UserPublicModel_default.findOne({ "user.id": user._id }).catch(() => null) || await UserPublicService_default.setup(user.id);
  const token = sign({ id: user._id }, secret, {
    expiresIn: 30 * 24 * 60 * 60
  });
  const { _id: id, name } = user;
  return { id, name, email, TID: userPublic.code, token };
};
var profile = async (bearer) => {
};
var list = async (params) => {
};
var create = async (payload) => {
};
var detail = async (id) => {
  const user = await UserModel_default.findOne({ _id: id, deletedAt: null }).catch(() => {
  });
  if (!user) throw new Error("user not found");
  const meta = await UserPublicService_default.verify(user.id);
  return {
    ...user.toObject(),
    meta
  };
};
var update = async (id, payload) => {
};
var _delete = async (id) => {
};
var UserService = {
  register,
  login,
  profile,
  list,
  create,
  detail,
  update,
  delete: _delete
};
var UserService_default = UserService;
export {
  _delete,
  create,
  UserService_default as default,
  detail,
  list,
  login,
  profile,
  register,
  update
};
