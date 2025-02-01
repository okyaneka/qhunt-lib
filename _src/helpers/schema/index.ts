import Joi from "joi";

export interface ValidatorOption<T = unknown> {
  required?: boolean;
  defaultValue?: T;
  allow?: T;
}

export const createValidator = <T = unknown>(
  base: Joi.Schema<T>,
  option?: ValidatorOption<T>
) => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== undefined) v = v.allow(option.allow);
  if (option?.defaultValue !== undefined) v = v.default(option.defaultValue);
  return v;
};

export const string = (option?: ValidatorOption<string | null>) =>
  createValidator(Joi.string().trim(), option) as Joi.StringSchema;

export const number = (option?: ValidatorOption<number | null>) =>
  createValidator(Joi.number(), option) as Joi.NumberSchema;

export const boolean = (option?: ValidatorOption<boolean | null>) =>
  createValidator(Joi.boolean(), option) as Joi.BooleanSchema;

export const array = <T = unknown>(
  item: Joi.Schema<T>,
  options?: ValidatorOption<T[]>
) => {
  let v = createValidator<T | null>(
    Joi.array<T>().items(item)
  ) as Joi.ArraySchema<T[]>;
  if (options?.required) v = v.min(1);
  if (options?.defaultValue) v.default(options.defaultValue);
  if (options?.allow) v.allow(options.allow);
  return v;
};

export const generate = <T>(
  fields: Record<keyof T, Joi.Schema>
): Joi.ObjectSchema<T> => Joi.object(fields);

const schema = {
  createValidator,
  string,
  number,
  boolean,
  array,
  generate,
};

export default schema;
