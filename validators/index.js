'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Joi = require('joi');
require('deepmerge');
var mongoose = require('mongoose');
require('@zxing/browser');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Joi__default = /*#__PURE__*/_interopDefault(Joi);

// _src/validators/challenge/index.ts
var createValidator = (base, option) => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== undefined) v = v.allow(option.allow);
  if (option?.defaultValue !== undefined) v = v.default(option.defaultValue);
  return v;
};
var string = (option) => createValidator(Joi__default.default.string().trim(), option);
var number = (option) => createValidator(Joi__default.default.number(), option);
var boolean = (option) => createValidator(Joi__default.default.boolean(), option);
var array = (item, options) => {
  let v = createValidator(
    Joi__default.default.array().items(item)
  );
  if (options?.required) v = v.min(1);
  if (options?.defaultValue) v.default(options.defaultValue);
  if (options?.allow) v.allow(options.allow);
  return v;
};
var generate = (fields) => Joi__default.default.object(fields);
var schema = {
  createValidator,
  string,
  number,
  boolean,
  array,
  generate
};
var schema_default = schema;

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

// _src/types/user-stage/index.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

// _src/types/leaderboard/index.ts
var LEADERBOARD_MODE = {
  Ranks: "ranks",
  Current: "current"
};
var PeriodeValidator = schema_default.generate({
  startDate: Joi__default.default.date().required(),
  endDate: Joi__default.default.date().required().greater(Joi__default.default.ref("startDate"))
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

// _src/validators/challenge/index.ts
var ChallengeListParamsValidator = schema_default.generate({
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
var ChallengeForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  order: schema_default.number({ defaultValue: null }),
  storyline: schema_default.array(Joi__default.default.string(), { defaultValue: [] })
});
var ChallengeSettingsForeignValidator = schema_default.generate({
  duration: schema_default.number({ allow: 0 }),
  type: schema_default.string({ required: true }).valid(...Object.values(CHALLENGE_TYPES))
});
var ChallengePayloadValidator = schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(schema_default.string()).default([]),
  stageId: schema_default.string().allow(null, ""),
  status: schema_default.string({ required: true, defaultValue: CHALLENGE_STATUS.Draft }).valid(...Object.values(CHALLENGE_STATUS)),
  settings: ChallengeSettingsValidator.required()
});
var ChallengeValidator = {
  ChallengeForeignValidator,
  ChallengeListParamsValidator,
  ChallengePayloadValidator,
  ChallengeSettingsForeignValidator,
  ChallengeSettingsValidator
};
var challenge_default = ChallengeValidator;
var QrListParamsValidator = schema_default.generate({
  ...DefaultListParamsFields,
  code: schema_default.string({ allow: "" }),
  status: schema_default.string({ allow: "" }).valid(...Object.values(QR_STATUS)),
  hasContent: schema_default.boolean({ defaultValue: null })
});
var QrGeneratePayloadValidator = schema_default.generate({
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
var QrUpdatePayloadValidator = schema_default.generate({
  status: schema_default.string({ required: true }).valid(...Object.values(QR_STATUS)),
  content: QrContentValidator.allow(null).default(null),
  location: QrLocationValidator.allow(null).default(null)
});
var QrDeleteBulkPayloadValidator = schema_default.generate({
  ids: schema_default.array(Joi__default.default.string(), { required: true })
});
var QrValidator = {
  QrListParamsValidator,
  QrGeneratePayloadValidator,
  QrUpdatePayloadValidator,
  QrDeleteBulkPayloadValidator
};
var qr_default = QrValidator;
var StageSettingsValidator = schema_default.generate(
  {
    canDoRandomChallenges: schema_default.boolean({ defaultValue: false }),
    canStartFromChallenges: schema_default.boolean({ defaultValue: false }),
    periode: PeriodeValidator.allow(null)
  }
);
var StageListParamsValidator = schema_default.generate({
  ...DefaultListParamsFields,
  status: schema_default.string({ allow: null }).valid(...Object.values(STAGE_STATUS))
});
var StagePayloadValidator = schema_default.generate({
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(Joi__default.default.string()).default([]),
  contents: schema_default.array(Joi__default.default.string()).default([]),
  status: schema_default.string({ required: true }).valid(...Object.values(STAGE_STATUS)),
  settings: StageSettingsValidator.required()
});
var StageForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  name: schema_default.string({ required: true }),
  storyline: schema_default.array(Joi__default.default.string(), { defaultValue: [] }),
  settings: schema_default.generate({
    periode: PeriodeValidator.allow(null)
  })
});
var StageValidator = {
  StageSettingsValidator,
  StageListParamsValidator,
  StagePayloadValidator,
  StageForeignValidator
};
var stage_default = StageValidator;

// _src/validators/trivia/index.ts
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
  feedback: FeedbackValidator,
  allowMultiple: schema_default.boolean({ defaultValue: false }),
  options: TriviaOptionsValidator
});
var TriviaItemsPayloadValidator = schema_default.array(
  TriviaPayloadValidator,
  {
    required: true
  }
);
var TriviaForeignOptionValidator = schema_default.generate({
  text: schema_default.string({ required: true })
});
var TriviaForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  question: schema_default.string({ required: true }),
  allowMultiple: schema_default.boolean({ required: true }),
  options: schema_default.array(TriviaForeignOptionValidator, { required: true })
});
var TriviaValidator = {
  TriviaOptionValidator,
  TriviaOptionsValidator,
  TriviaPayloadValidator,
  TriviaItemsPayloadValidator,
  TriviaForeignValidator
};
var trivia_default = TriviaValidator;

// _src/validators/user-challenge/index.ts
var UserChallengeForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  challengeId: schema_default.string({ required: true }),
  name: schema_default.string({ required: true })
});
var UserChallengeParamsValidator = schema_default.generate({
  ...DefaultListParamsFields,
  userStageId: schema_default.string({ allow: "" }),
  status: schema_default.string({ allow: "" }).valid(...Object.values(USER_CHALLENGE_STATUS))
});
var UserChallengeValidator = {
  UserChallengeForeignValidator,
  UserChallengeParamsValidator
};
var user_challenge_default = UserChallengeValidator;

// _src/validators/user-public/index.ts
var UserPublicForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  code: schema_default.string({ required: true }),
  name: schema_default.string({ required: true, allow: "" })
});
var UserPublicValidator = { UserPublicForeignValidator };
var user_public_default = UserPublicValidator;

// _src/validators/user-stage/index.ts
var UserStageForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  stageId: schema_default.string({ required: true }),
  name: schema_default.string({ required: true })
});
var UserStageListParamsValidator = schema_default.generate({
  ...DefaultListParamsFields,
  status: schema_default.string({ allow: "" }).valid(...Object.values(UserStageStatus))
});
var UserStageValidator = {
  UserStageForeignValidator,
  UserStageListParamsValidator
};
var user_stage_default = UserStageValidator;

// _src/validators/user/index.ts
var UserPayloadValidator = schema_default.generate({
  email: schema_default.string({ required: true }).email(),
  password: schema_default.string({ required: true })
});
var UserListParamsValidator = schema_default.generate({
  ...DefaultListParamsFields,
  role: schema_default.string({ defaultValue: null }).valid(...Object.values(UserRole))
});
var UserValidator = {
  UserPayloadValidator,
  UserListParamsValidator
};
var user_default = UserValidator;
new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);
new mongoose.Schema(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false }
);

// _src/validators/leaderboard/index.ts
var LeaderboardParamsValidator = schema_default.generate({
  stageId: schema_default.string({ required: true }),
  mode: schema_default.string({ required: true }).valid(...Object.values(LEADERBOARD_MODE))
});
var LeaderboardValidator = { LeaderboardParamsValidator };
var leaderboard_default = LeaderboardValidator;

// _src/validators/index.ts
var validators = {
  ChallengeValidator: challenge_default,
  QrValidator: qr_default,
  StageValidator: stage_default,
  TriviaValidator: trivia_default,
  UserChallengeValidator: user_challenge_default,
  UserPublicValidator: user_public_default,
  UserStageValidator: user_stage_default,
  UserValidator: user_default,
  LeaderboardValidator: leaderboard_default
};
var validators_default = validators;

exports.ChallengeValidator = challenge_default;
exports.LeaderboardValidator = leaderboard_default;
exports.QrValidator = qr_default;
exports.StageValidator = stage_default;
exports.TriviaValidator = trivia_default;
exports.UserChallengeValidator = user_challenge_default;
exports.UserPublicValidator = user_public_default;
exports.UserStageValidator = user_stage_default;
exports.UserValidator = user_default;
exports.default = validators_default;
