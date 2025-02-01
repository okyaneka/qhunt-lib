// _src/helpers/schema/index.ts
import Joi from "joi";
var createValidator = (base, option) => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== void 0) v = v.allow(option.allow);
  if (option?.defaultValue !== void 0) v = v.default(option.defaultValue);
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

// _src/validators/PhotoHuntValidator/index.ts
var PhotoHuntPayloadValidator = schema_default.array(
  schema_default.generate({
    id: schema_default.string(),
    hint: schema_default.string({ required: true }),
    score: schema_default.number({ required: true }),
    feedback: schema_default.string({ defaultValue: "" })
  }),
  { required: true }
);
var PhotoHuntValidator = { PhotoHuntPayloadValidator };
var PhotoHuntValidator_default = PhotoHuntValidator;
export {
  PhotoHuntPayloadValidator,
  PhotoHuntValidator_default as default
};
