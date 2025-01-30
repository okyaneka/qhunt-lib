import { Model, Schema } from "mongoose";
import { Qr, QrForeign } from "./types";
export declare const QrForeignSchema: Schema<QrForeign, Model<QrForeign, any, any, any, import("mongoose").Document<unknown, any, QrForeign> & QrForeign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QrForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<QrForeign>> & import("mongoose").FlatRecord<QrForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export * from "./types";
declare const QrModel: Model<Qr, {}, {}, {}, import("mongoose").Document<unknown, {}, Qr> & Qr & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default QrModel;
//# sourceMappingURL=index.d.ts.map