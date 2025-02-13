import common from "./common";
import db from "./db";
import model from "./model";
import qrcode from "./qrcode";
import response from "./response";
import schema from "./schema";
import service from "./service";
export { common, db, model, qrcode, response, schema, service };
declare const helpers: {
    readonly common: {
        readonly deepmerge: typeof import("deepmerge");
    };
    readonly db: {
        transaction: <T>(operation: (session: import("mongoose").ClientSession) => Promise<T>) => Promise<T>;
    };
    readonly model: {
        readonly IdNameSchema: import("mongoose").Schema<import("./types").IdName, import("mongoose").Model<import("./types").IdName, any, any, any, import("mongoose").Document<unknown, any, import("./types").IdName> & import("./types").IdName & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("./types").IdName, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<import("./types").IdName>> & import("mongoose").FlatRecord<import("./types").IdName> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        readonly PeriodSchema: import("mongoose").Schema<import("./types").Periode, import("mongoose").Model<import("./types").Periode, any, any, any, import("mongoose").Document<unknown, any, import("./types").Periode> & import("./types").Periode & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("./types").Periode, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<import("./types").Periode>> & import("mongoose").FlatRecord<import("./types").Periode> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        readonly FeedbackSchema: import("mongoose").Schema<import("./types").Feedback, import("mongoose").Model<import("./types").Feedback, any, any, any, import("mongoose").Document<unknown, any, import("./types").Feedback> & import("./types").Feedback & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("./types").Feedback, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<import("./types").Feedback>> & import("mongoose").FlatRecord<import("./types").Feedback> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        readonly ToObject: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
    };
    readonly qrcode: {
        readonly scanByStream: (stream: MediaStream, el?: HTMLVideoElement) => Promise<import("@zxing/library").Result>;
        readonly scanByFile: (file: File) => Promise<import("@zxing/library").Result>;
    };
    readonly response: {
        success: (data?: any, message?: string) => {
            code: number;
            message: string;
            data: any;
            error: {};
        };
        error: (error?: any, message?: string, code?: number) => {
            code: number;
            message: string;
            data: {};
            error: any;
        };
        errorValidation: (error: import("joi").Root.ValidationError) => {
            code: number;
            message: string;
            data: {};
            error: any;
        };
    };
    readonly schema: {
        createValidator: <T = unknown>(base: import("joi").Schema<T>, option?: import("./schema").ValidatorOption<T>) => import("joi").Schema<T>;
        string: (option?: import("./schema").ValidatorOption<string | null>) => import("joi").StringSchema;
        number: (option?: import("./schema").ValidatorOption<number | null>) => import("joi").NumberSchema;
        boolean: (option?: import("./schema").ValidatorOption<boolean | null>) => import("joi").BooleanSchema;
        array: <T = unknown>(item: import("joi").Schema<T>, options?: import("./schema").ValidatorOption<T[]>) => import("joi").ArraySchema<T[]>;
        generate: <T>(fields: Record<keyof T, import("joi").Schema>) => import("joi").ObjectSchema<T>;
    };
    readonly service: {
        list: <T>(model: import("mongoose").Model<T>, page: number, limit: number, filters?: Record<string, any>, sort?: any) => Promise<{
            list: import("mongoose").Require_id<T>[];
            page: number;
            totalItems: number;
            totalPages: number;
        }>;
    };
};
export default helpers;
//# sourceMappingURL=index.d.ts.map