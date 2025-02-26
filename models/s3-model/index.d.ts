import { Model, Schema } from "mongoose";
import { S3, S3Foreign } from "../../types/s3";
export declare const S3ForeignSchema: Schema<S3Foreign, Model<S3Foreign, any, any, any, import("mongoose").Document<unknown, any, S3Foreign> & S3Foreign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, S3Foreign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<S3Foreign>> & import("mongoose").FlatRecord<S3Foreign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const S3Model: Model<S3, {}, {}, {}, import("mongoose").Document<unknown, {}, S3> & S3 & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default S3Model;
