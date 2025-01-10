"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// _src/validators/QrValidator/index.ts
var QrValidator_exports = {};
__export(QrValidator_exports, {
  QrDeleteBulkPayloadValidator: () => QrDeleteBulkPayloadValidator,
  QrGeneratePayloadValidator: () => QrGeneratePayloadValidator,
  QrListQueryValidator: () => QrListQueryValidator,
  QrUpdatePayloadValidator: () => QrUpdatePayloadValidator,
  default: () => QrValidator_default
});
module.exports = __toCommonJS(QrValidator_exports);
var import_joi6 = __toESM(require("joi"));

// _src/helpers/schema/index.ts
var import_joi = __toESM(require("joi"));
var import_mongoose = require("mongoose");
var createValidator = (base, option) => {
  let v = base;
  if (option == null ? void 0 : option.required) v = v.required();
  if ((option == null ? void 0 : option.allow) !== void 0) v = v.allow(option.allow);
  if ((option == null ? void 0 : option.defaultValue) !== void 0) v = v.default(option.defaultValue);
  return v;
};
var string = (option) => createValidator(import_joi.default.string().trim(), option);
var number = (option) => createValidator(import_joi.default.number(), option);
var boolean = (option) => createValidator(import_joi.default.boolean(), option);
var array = (item, options) => {
  let v = createValidator(
    import_joi.default.array().items(item),
    options
  );
  if (options == null ? void 0 : options.required) v = v.min(1);
  return v;
};
var generate = (fields) => import_joi.default.object(fields);
var ToObject = {
  transform: (doc, ret) => {
    const _a = ret, { _id, deletedAt, __v } = _a, rest = __objRest(_a, ["_id", "deletedAt", "__v"]);
    return __spreadValues({ id: _id.toString() }, rest);
  }
};
var IdNameSchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var PeriodSchema = new import_mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);
var schema = {
  createValidator,
  string,
  number,
  boolean,
  array,
  generate,
  ToObject,
  PeriodSchema,
  IdNameSchema
};
var schema_default = schema;

// _src/models/QrModel/index.ts
var import_mongoose2 = require("mongoose");

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
var QrContentSchema = new import_mongoose2.Schema(
  {
    type: { type: String, enum: Object.values(QrContentType), required: true },
    refId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
var QrLocationSchema = new import_mongoose2.Schema(
  {
    label: { type: String, default: "" },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
var QrSchema = new import_mongoose2.Schema(
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
QrSchema.set("toObject", ToObject);
QrSchema.set("toJSON", ToObject);
var QrModel = import_mongoose2.models.Qr || (0, import_mongoose2.model)("Qr", QrSchema);

// _src/validators/index.ts
var import_joi5 = __toESM(require("joi"));

// _src/validators/ChallengeValidator/index.ts
var import_joi2 = __toESM(require("joi"));

// _src/models/ChallengeModel/index.ts
var import_mongoose3 = require("mongoose");

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
var ChallengeFeedbackSchema = new import_mongoose3.Schema(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsSchema = new import_mongoose3.Schema(
  {
    type: { type: String, enum: Object.values(ChallengeType), required: true },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: ChallengeFeedbackSchema }
  },
  { _id: false, versionKey: false }
);
var ChallengeSettingsForeignSchema = new import_mongoose3.Schema(
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
var ChallengeForeignSchema = new import_mongoose3.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: ChallengeSettingsSchema, required: true }
  },
  { _id: false }
);
var ChallengeSchema = new import_mongoose3.Schema(
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
ChallengeSchema.set("toJSON", ToObject);
ChallengeSchema.set("toObject", ToObject);
var ChallengeModel = import_mongoose3.models.Challenge || (0, import_mongoose3.model)("Challenge", ChallengeSchema);

// _src/validators/ChallengeValidator/index.ts
var ChallengeListParamsValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListParamsFields), {
  stageId: schema_default.string().allow("").default("")
}));
var ChallengeFeedbackValidator = schema_default.generate({
  positive: schema_default.string({ allow: "", defaultValue: "" }),
  negative: schema_default.string({ allow: "", defaultValue: "" })
}).default({ positive: "", negative: "" });
var ChallengeSettingsSchema2 = schema_default.generate({
  clue: schema_default.string({ defaultValue: "" }),
  duration: schema_default.number({ defaultValue: 0 }),
  type: schema_default.string({ required: true }).valid(...Object.values(ChallengeType)),
  feedback: ChallengeFeedbackValidator
});
var ChallengeForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(import_joi2.default.string(), { defaultValue: [] }),
  settings: schema_default.generate({
    duration: schema_default.number({ allow: 0 }),
    type: schema_default.string({ required: true }).valid(...Object.values(ChallengeType))
  })
});
var ChallengePayloadValidator = schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(schema_default.string()).default([]),
  stageId: schema_default.string({ required: true }),
  status: schema_default.string({ required: true }).valid(...Object.values(ChallengeStatus)),
  settings: ChallengeSettingsSchema2.required()
});

// _src/validators/StageValidator/index.ts
var import_joi4 = __toESM(require("joi"));

// _src/models/StageModel/types.ts
var StageStatus = /* @__PURE__ */ ((StageStatus2) => {
  StageStatus2["Draft"] = "draft";
  StageStatus2["Publish"] = "publish";
  return StageStatus2;
})(StageStatus || {});

// _src/models/StageModel/index.ts
var import_mongoose4 = require("mongoose");
var StageSettingsSchema = new import_mongoose4.Schema(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null }
  },
  { _id: false }
);
var StageSettingsForeignSchema = new import_mongoose4.Schema(
  {
    periode: { type: PeriodSchema, required: true }
  },
  { _id: false }
);
var StageForeignSchema = new import_mongoose4.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: StageSettingsForeignSchema, required: true }
  },
  { _id: false }
);
var StageSchema = new import_mongoose4.Schema(
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
StageSchema.set("toObject", ToObject);
StageSchema.set("toJSON", ToObject);
var StageModel = import_mongoose4.models.Stage || (0, import_mongoose4.model)("Stage", StageSchema);

// _src/helpers/validator/index.ts
var import_joi3 = __toESM(require("joi"));
var PeriodeValidator = schema_default.generate({
  startDate: import_joi3.default.date().required().greater("now"),
  endDate: import_joi3.default.date().required().greater(import_joi3.default.ref("startDate"))
});

// _src/validators/StageValidator/index.ts
var StageSettingsValidator = schema_default.generate(
  {
    canDoRandomChallenges: schema_default.boolean({ defaultValue: false }),
    canStartFromChallenges: schema_default.boolean({ defaultValue: false }),
    periode: PeriodeValidator.allow(null)
  }
);
var StageListParamsValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListQueryFields), {
  status: schema_default.string({ allow: null }).valid(...Object.values(StageStatus))
}));
var StagePayloadValidator = schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(import_joi4.default.string()).default([]),
  contents: schema_default.array(import_joi4.default.string()).default([]),
  status: schema_default.string({ required: true }).valid(...Object.values(StageStatus)),
  settings: StageSettingsValidator.required()
});
var StageForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(import_joi4.default.string(), { defaultValue: [] }),
  settings: schema_default.generate({
    periode: PeriodeValidator.allow(null)
  })
});

// _src/validators/TriviaValidator/index.ts
var TriviaOptionValidator = schema_default.generate({
  isCorrect: schema_default.boolean({ defaultValue: false }),
  point: schema_default.number({ defaultValue: 0 }),
  text: schema_default.string({ required: true })
});
var TriviaOptionsValidator = schema_default.array(TriviaOptionValidator, {
  required: true
}).custom((value, helpers) => {
  const hasCorrect = value.some((option) => option.isCorrect === true);
  return hasCorrect ? value : helpers.error("array.hasCorrect");
}).messages({
  "array.hasCorrect": "{#label} at least one option must have `isCorrect` set to true."
});
var TriviaPayloadValidator = schema_default.generate({
  id: schema_default.string(),
  question: schema_default.string({ required: true }),
  feedback: ChallengeFeedbackValidator,
  allowMultiple: schema_default.boolean({ defaultValue: false }),
  options: TriviaOptionsValidator
});
var TriviaItemsPayloadValidator = schema_default.generate({
  items: schema_default.array(TriviaPayloadValidator, {
    required: true
  })
});
var TriviaForeignOptionValidator = schema_default.generate({
  text: schema_default.string({ required: true })
});
var TriviaForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  question: schema_default.string({ required: true }),
  allowMultiple: schema_default.boolean({ required: true }),
  options: schema_default.array(TriviaForeignOptionValidator, { required: true })
});

// _src/models/UserChallengeModel/index.ts
var import_mongoose7 = require("mongoose");

// _src/models/UserChallengeModel/types.ts
var UserChallengeStatus = /* @__PURE__ */ ((UserChallengeStatus2) => {
  UserChallengeStatus2["Undiscovered"] = "undiscovered";
  UserChallengeStatus2["OnGoing"] = "ongoing";
  UserChallengeStatus2["Completed"] = "completed";
  UserChallengeStatus2["Failed"] = "failed";
  return UserChallengeStatus2;
})(UserChallengeStatus || {});

// _src/models/UserPublicModel/index.ts
var import_mongoose5 = require("mongoose");

// _src/models/UserPublicModel/types.ts
var UserPublicGender = /* @__PURE__ */ ((UserPublicGender2) => {
  UserPublicGender2["Male"] = "male";
  UserPublicGender2["Female"] = "female";
  UserPublicGender2["Panda"] = "panda";
  return UserPublicGender2;
})(UserPublicGender || {});

// _src/models/UserPublicModel/index.ts
var UserPublicForeignSchema = new import_mongoose5.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String }
  },
  { _id: false }
);
var UserPublicSchema = new import_mongoose5.Schema(
  {
    user: { type: IdNameSchema, default: null },
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
var UserPublicModel = import_mongoose5.models.UserPublic || (0, import_mongoose5.model)("UserPublic", UserPublicSchema, "usersPublic");

// _src/models/UserStageModel/index.ts
var import_mongoose6 = require("mongoose");

// _src/models/UserStageModel/types.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/models/UserStageModel/index.ts
var UserStageForeignSchema = new import_mongoose6.Schema(
  {
    id: { type: String, required: true },
    stageId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserStageSchema = new import_mongoose6.Schema(
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
UserStageSchema.set("toJSON", ToObject);
UserStageSchema.set("toObject", ToObject);
var UserStageModel = import_mongoose6.models.UserStage || (0, import_mongoose6.model)("UserStage", UserStageSchema, "usersStage");

// _src/models/UserChallengeModel/index.ts
var UserChallengeForeignSchema = new import_mongoose7.Schema(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);
var UserChallengeSchema = new import_mongoose7.Schema(
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
UserChallengeSchema.set("toJSON", ToObject);
UserChallengeSchema.set("toObject", ToObject);
var UserChallengeModel = import_mongoose7.models.UserChallenge || (0, import_mongoose7.model)("UserChallenge", UserChallengeSchema, "usersChallenge");

// _src/validators/UserChallengeValidator/index.ts
var UserChallengeForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  challengeId: schema_default.string({ required: true }),
  name: schema_default.string({ required: true })
});
var UserChallengeParamsValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListParamsFields), {
  userStageId: schema_default.string({ allow: "" }),
  status: schema_default.string({ allow: "" }).valid(...Object.values(UserChallengeStatus))
}));

// _src/validators/UserPublicValidator/index.ts
var UserPublicForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  code: schema_default.string({ required: true }),
  name: schema_default.string({ required: true, allow: "" })
});

// _src/validators/UserStageValidator/index.ts
var UserStageForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  stageId: schema_default.string({ required: true }),
  name: schema_default.string({ required: true })
});
var UserStageListParamsValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListParamsFields), {
  status: schema_default.string({ allow: "" }).valid(...Object.values(UserStageStatus))
}));

// _src/models/UserModel/index.ts
var import_mongoose8 = require("mongoose");

// _src/models/UserModel/types.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Admin"] = "admin";
  UserRole2["Private"] = "private";
  UserRole2["Public"] = "public";
  return UserRole2;
})(UserRole || {});

// _src/models/UserModel/index.ts
var ToObject2 = {
  transform: (doc, ret) => {
    const _a = ret, { _id, __v, password } = _a, rest = __objRest(_a, ["_id", "__v", "password"]);
    return __spreadValues({ id: _id }, rest);
  }
};
var UserSchema = new import_mongoose8.Schema(
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
var UserModel = import_mongoose8.models.User || (0, import_mongoose8.model)("User", UserSchema);

// _src/validators/UserValidator/index.ts
var UserPayloadValidator = schema_default.generate({
  email: schema_default.string({ required: true }).email(),
  password: schema_default.string({ required: true })
});
var UserListQueryValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListQueryFields), {
  role: schema_default.string({ defaultValue: null }).valid(...Object.values(UserRole))
}));

// _src/validators/index.ts
var DefaultListParamsFields = {
  page: import_joi5.default.number().default(1),
  limit: import_joi5.default.number().default(10),
  search: import_joi5.default.string().allow("").default("")
};
var DefaultListQueryFields = {
  page: schema_default.number({ defaultValue: 1 }),
  limit: schema_default.number({ defaultValue: 1 }),
  search: schema_default.string({ defaultValue: "", allow: "" })
};

// _src/validators/QrValidator/index.ts
var QrListQueryValidator = schema_default.generate(__spreadProps(__spreadValues({}, DefaultListParamsFields), {
  code: schema_default.string({ allow: "" }),
  status: schema_default.string({ allow: "" }).valid(...Object.values(QrStatus))
}));
var QrGeneratePayloadValidator = schema_default.generate({
  amount: schema_default.number({ required: true })
});
var QrContentValidator = schema_default.generate({
  refId: schema_default.string({ required: true }),
  type: schema_default.string({ required: true }).valid(...Object.values(QrContentType))
});
var QrLocationValidator = schema_default.generate({
  label: schema_default.string({ required: true, allow: "" }),
  longitude: schema_default.number({ required: true }),
  latitude: schema_default.number({ required: true })
});
var QrUpdatePayloadValidator = schema_default.generate({
  status: schema_default.string({ required: true }).valid(...Object.values(QrStatus)),
  content: QrContentValidator.allow(null).default(null),
  location: QrLocationValidator.allow(null).default(null)
});
var QrDeleteBulkPayloadValidator = schema_default.generate({
  ids: schema_default.array(import_joi6.default.string(), { required: true })
});
var QrValidator = {
  QrListQueryValidator,
  QrGeneratePayloadValidator,
  QrUpdatePayloadValidator,
  QrDeleteBulkPayloadValidator
};
var QrValidator_default = QrValidator;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QrDeleteBulkPayloadValidator,
  QrGeneratePayloadValidator,
  QrListQueryValidator,
  QrUpdatePayloadValidator
});
