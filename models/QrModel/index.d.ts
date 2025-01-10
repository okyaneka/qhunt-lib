import { Model } from "mongoose";
import { Qr } from "./types";
export * from "./types";
declare const QrModel: Model<Qr, {}, {}, {}, import("mongoose").Document<unknown, {}, Qr> & Qr & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default QrModel;
//# sourceMappingURL=index.d.ts.map