import 'deepmerge';
import { Schema } from 'mongoose';
import '@zxing/browser';
import Joi from 'joi';

// _src/helpers/common/index.ts
new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);
new Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { _id: false }
);
new Schema(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" }
  },
  { _id: false }
);
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

// _src/types/leaderboard/index.ts
var LEADERBOARD_MODE = {
  Ranks: "ranks",
  Current: "current"
};

// _src/validators/leaderboard/index.ts
var LeaderboardParamsValidator = schema_default.generate({
  stageId: schema_default.string({ required: true }),
  mode: schema_default.string({ required: true }).valid(...Object.values(LEADERBOARD_MODE))
});
var LeaderboardValidator = { LeaderboardParamsValidator };
var leaderboard_default = LeaderboardValidator;

export { LeaderboardParamsValidator, leaderboard_default as default };
