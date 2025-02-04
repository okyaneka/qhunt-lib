'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Joi = require('joi');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Joi__default = /*#__PURE__*/_interopDefault(Joi);

// _src/helpers/schema/index.ts
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
schema_default.generate({
  startDate: Joi__default.default.date().required(),
  endDate: Joi__default.default.date().required().greater(Joi__default.default.ref("startDate"))
});
var DefaultListParamsFields = {
  page: schema_default.number({ defaultValue: 1 }),
  limit: schema_default.number({ defaultValue: 10 }),
  search: schema_default.string({ allow: "", defaultValue: "" })
};
schema_default.generate({
  positive: schema_default.string({ allow: "", defaultValue: "" }),
  negative: schema_default.string({ allow: "", defaultValue: "" })
}).default({ positive: "", negative: "" });

// _src/types/user-stage/index.ts
var UserStageStatus = /* @__PURE__ */ ((UserStageStatus2) => {
  UserStageStatus2["OnGoing"] = "ongoing";
  UserStageStatus2["Completed"] = "completed";
  UserStageStatus2["End"] = "end";
  return UserStageStatus2;
})(UserStageStatus || {});

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

exports.UserStageForeignValidator = UserStageForeignValidator;
exports.UserStageListParamsValidator = UserStageListParamsValidator;
exports.default = user_stage_default;
