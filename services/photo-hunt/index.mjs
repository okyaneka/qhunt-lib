import { Schema, models, model, startSession } from 'mongoose';
import Joi from 'joi';
import 'crypto-js';
import 'deepmerge';
import '@zxing/browser';
import 'dayjs';

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

// _src/models/challenge/index.ts
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
var challenge_default = ChallengeModel;
var QrForeignSchema = new Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true }
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
var QrModel = models.Qr || model("Qr", QrSchema);
var qr_default = QrModel;
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
var ToObject2 = {
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
UserSchema.set("toJSON", ToObject2);
UserSchema.set("toObject", ToObject2);
models.User || model("User", UserSchema);
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
models.UserPublic || model("UserPublic", UserPublicSchema, "usersPublic");
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

// _src/models/user-challenge/index.ts
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
    totalCorrect: { type: Number, required: true },
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
var PhotoHuntModel = models.PhotoHunt || model("PhotoHunt", PhotoHuntSchema, "photoHunts");
var photo_hunt_default = PhotoHuntModel;
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
var createValidator = (base, option) => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== undefined) v = v.allow(option.allow);
  if (option?.defaultValue !== undefined) v = v.default(option.defaultValue);
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
var PeriodeValidator = schema_default.generate({
  startDate: Joi.date().required(),
  endDate: Joi.date().required().greater(Joi.ref("startDate"))
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

// _src/validators/qr/index.ts
var QrListParamsValidator = schema_default.generate({
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
  ids: schema_default.array(Joi.string(), { required: true })
});

// _src/services/challenge/index.ts
var detail2 = async (id) => {
  const item = await challenge_default.findOne({ _id: id, deletedAt: null });
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
var updateContent = async (id, contents) => {
  const item = await challenge_default.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { contents } },
    { new: true }
  );
  if (!item) throw new Error("challenge not found");
  return item.toObject();
};
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
schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  order: schema_default.number({ defaultValue: null }),
  storyline: schema_default.array(Joi.string(), { defaultValue: [] })
});
schema_default.generate({
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

// _src/validators/user-public/index.ts
schema_default.generate({
  id: schema_default.string({ required: true }),
  code: schema_default.string({ required: true }),
  name: schema_default.string({ required: true, allow: "" })
});
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
  storyline: schema_default.array(Joi.string()).default([]),
  contents: schema_default.array(Joi.string()).default([]),
  status: schema_default.string({ required: true }).valid(...Object.values(STAGE_STATUS)),
  settings: StageSettingsValidator.required()
});
schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(Joi.string(), { defaultValue: [] }),
  settings: schema_default.generate({
    periode: PeriodeValidator.allow(null)
  })
});

// _src/services/qr/index.ts
var list = async (params) => {
  const skip = (params.page - 1) * params.limit;
  const filter = { deletedAt: null };
  if (params.status) filter.status = params.status;
  if (params.code) filter.code = params.code;
  if (params.hasContent != null)
    filter.content = params.hasContent ? { $ne: null } : null;
  const items = await qr_default.find(filter).skip(skip).limit(params.limit).sort({ createdAt: -1 });
  const totalItems = await qr_default.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / params.limit);
  return {
    list: items.map((item) => item.toObject()),
    page: params.page,
    totalItems,
    totalPages
  };
};

// _src/services/photo-hunt/index.ts
var createMany = async (challenge, payload, session) => {
  if (payload.length === 0) return [];
  const qrParams = await QrListParamsValidator.validateAsync({
    hasContent: false,
    limit: payload.length
  });
  const qrs = (await list(qrParams)).list.map(({ id, code }) => ({
    id,
    code
  }));
  if (qrs.length !== payload.length)
    throw new Error("photohunt.sync.qr_not_enough_error");
  const items = await photo_hunt_default.insertMany(
    payload.map((item, i) => ({
      ...item,
      challenge,
      qr: qrs[i]
    })),
    { session }
  );
  const res = await qr_default.bulkWrite(
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
var updateMany = async (challenge, payload, session) => {
  if (payload.length === 0) return [];
  const ids = payload.map(({ id }) => id);
  const res = await photo_hunt_default.bulkWrite(
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
  return await photo_hunt_default.find({ _id: { $in: ids } });
};
var detail4 = async (id) => {
  const item = await photo_hunt_default.findOne({ _id: id });
  if (!item) throw new Error("photo hunt not found");
  return item.toObject();
};
var details3 = async (challengeId) => {
  const challenge = await detail2(challengeId);
  if (challenge.settings.type !== CHALLENGE_TYPES.PhotoHunt)
    throw new Error("challenge.not_photohunt_type_error");
  const items = await photo_hunt_default.find({ _id: { $in: challenge.contents } });
  return items.map((item) => item.toObject());
};
var sync = async (challengeId, payload) => {
  return transaction(async (session) => {
    await photo_hunt_default.updateMany(
      { "challenge.id": challengeId },
      { $set: { challenge: null } },
      { session }
    );
    if (payload.length === 0) return [];
    const challenge = await detail2(challengeId);
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
var PhotoHuntService = { detail: detail4, details: details3, sync, verify: verify4 };
var photo_hunt_default2 = PhotoHuntService;

export { photo_hunt_default2 as default, detail4 as detail, details3 as details, sync, verify4 as verify };
