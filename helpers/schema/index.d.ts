import Joi from "joi";
export interface ValidatorOption<T = unknown> {
    required?: boolean;
    defaultValue?: T;
    allow?: T;
}
export declare const createValidator: <T = unknown>(base: Joi.Schema<T>, option?: ValidatorOption<T>) => Joi.Schema<T>;
export declare const string: (option?: ValidatorOption<string | null>) => Joi.StringSchema;
export declare const number: (option?: ValidatorOption<number | null>) => Joi.NumberSchema;
export declare const boolean: (option?: ValidatorOption<boolean | null>) => Joi.BooleanSchema;
export declare const array: <T = unknown>(item: Joi.Schema<T>, options?: ValidatorOption<T[]>) => Joi.ArraySchema<T[]>;
export declare const generate: <T>(fields: Record<keyof T, Joi.Schema>) => Joi.ObjectSchema<T>;
declare const schema: {
    createValidator: <T = unknown>(base: Joi.Schema<T>, option?: ValidatorOption<T>) => Joi.Schema<T>;
    string: (option?: ValidatorOption<string | null>) => Joi.StringSchema;
    number: (option?: ValidatorOption<number | null>) => Joi.NumberSchema;
    boolean: (option?: ValidatorOption<boolean | null>) => Joi.BooleanSchema;
    array: <T = unknown>(item: Joi.Schema<T>, options?: ValidatorOption<T[]>) => Joi.ArraySchema<T[]>;
    generate: <T>(fields: Record<keyof T, Joi.Schema>) => Joi.ObjectSchema<T>;
};
export default schema;
//# sourceMappingURL=index.d.ts.map