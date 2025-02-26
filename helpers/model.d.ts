import { Schema, ToObjectOptions } from "mongoose";
import { Feedback, IdName, Periode } from "..";
export declare const IdNameSchema: Schema<IdName, import("mongoose").Model<IdName, any, any, any, import("mongoose").Document<unknown, any, IdName> & IdName & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IdName, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IdName>> & import("mongoose").FlatRecord<IdName> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const PeriodSchema: Schema<Periode, import("mongoose").Model<Periode, any, any, any, import("mongoose").Document<unknown, any, Periode> & Periode & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Periode, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Periode>> & import("mongoose").FlatRecord<Periode> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const FeedbackSchema: Schema<Feedback, import("mongoose").Model<Feedback, any, any, any, import("mongoose").Document<unknown, any, Feedback> & Feedback & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Feedback, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Feedback>> & import("mongoose").FlatRecord<Feedback> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ToObject: ToObjectOptions;
declare const model: {
    readonly IdNameSchema: Schema<IdName, import("mongoose").Model<IdName, any, any, any, import("mongoose").Document<unknown, any, IdName> & IdName & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IdName, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IdName>> & import("mongoose").FlatRecord<IdName> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly PeriodSchema: Schema<Periode, import("mongoose").Model<Periode, any, any, any, import("mongoose").Document<unknown, any, Periode> & Periode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Periode, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Periode>> & import("mongoose").FlatRecord<Periode> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly FeedbackSchema: Schema<Feedback, import("mongoose").Model<Feedback, any, any, any, import("mongoose").Document<unknown, any, Feedback> & Feedback & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Feedback, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Feedback>> & import("mongoose").FlatRecord<Feedback> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly ToObject: ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
};
export default model;
