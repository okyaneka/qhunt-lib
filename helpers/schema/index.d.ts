import Joi from "joi";
import mongoose from "mongoose";
import { IdName, Periode } from "../types";
export interface ValidatorOption<T = unknown> {
    required?: boolean;
    defaultValue?: T;
    allow?: T;
}
export declare const createValidator: <T = unknown>(base: Joi.Schema<T>, option?: ValidatorOption<T>) => Joi.Schema<T>;
export declare const string: (option?: ValidatorOption<string | null>) => Joi.StringSchema;
export declare const number: (option?: ValidatorOption<number | null>) => Joi.NumberSchema;
export declare const boolean: (option?: ValidatorOption<boolean | null>) => Joi.BooleanSchema;
export declare const array: <T = unknown>(item: Joi.Schema<T>, options?: ValidatorOption<T>) => Joi.ArraySchema<T>;
export declare const generate: <T>(fields: Record<keyof T, Joi.Schema>) => Joi.ObjectSchema<T>;
export declare const ToObject: mongoose.ToObjectOptions;
export declare const IdNameSchema: mongoose.Schema<IdName, mongoose.Model<IdName, any, any, any, mongoose.Document<unknown, any, IdName> & IdName & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IdName, mongoose.Document<unknown, {}, mongoose.FlatRecord<IdName>> & mongoose.FlatRecord<IdName> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const PeriodSchema: mongoose.Schema<Periode, mongoose.Model<Periode, any, any, any, mongoose.Document<unknown, any, Periode> & Periode & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Periode, mongoose.Document<unknown, {}, mongoose.FlatRecord<Periode>> & mongoose.FlatRecord<Periode> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const schema: {
    createValidator: <T = unknown>(base: Joi.Schema<T>, option?: ValidatorOption<T>) => Joi.Schema<T>;
    string: (option?: ValidatorOption<string | null>) => Joi.StringSchema;
    number: (option?: ValidatorOption<number | null>) => Joi.NumberSchema;
    boolean: (option?: ValidatorOption<boolean | null>) => Joi.BooleanSchema;
    array: <T = unknown>(item: Joi.Schema<T>, options?: ValidatorOption<T>) => Joi.ArraySchema<T>;
    generate: <T>(fields: Record<keyof T, Joi.Schema>) => Joi.ObjectSchema<T>;
    ToObject: mongoose.ToObjectOptions<mongoose.Document<unknown, {}, unknown> & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    PeriodSchema: mongoose.Schema<Periode, mongoose.Model<Periode, any, any, any, mongoose.Document<unknown, any, Periode> & Periode & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Periode, mongoose.Document<unknown, {}, mongoose.FlatRecord<Periode>> & mongoose.FlatRecord<Periode> & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    IdNameSchema: mongoose.Schema<IdName, mongoose.Model<IdName, any, any, any, mongoose.Document<unknown, any, IdName> & IdName & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IdName, mongoose.Document<unknown, {}, mongoose.FlatRecord<IdName>> & mongoose.FlatRecord<IdName> & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
};
export default schema;
//# sourceMappingURL=index.d.ts.map