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

// _src/types/user/index.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Admin"] = "admin";
  UserRole2["Private"] = "private";
  UserRole2["Public"] = "public";
  return UserRole2;
})(UserRole || {});

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

exports.UserListParamsValidator = UserListParamsValidator;
exports.UserPayloadValidator = UserPayloadValidator;
exports.default = user_default;
