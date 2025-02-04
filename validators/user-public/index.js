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

// _src/validators/user-public/index.ts
var UserPublicForeignValidator = schema_default.generate({
  id: schema_default.string({ required: true }),
  code: schema_default.string({ required: true }),
  name: schema_default.string({ required: true, allow: "" })
});
var UserPublicValidator = { UserPublicForeignValidator };
var user_public_default = UserPublicValidator;

exports.UserPublicForeignValidator = UserPublicForeignValidator;
exports.default = user_public_default;
