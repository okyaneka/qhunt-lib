import { Model, Schema } from "mongoose";
import { PhotoHunt, PhotoHuntForeign } from "../../types";
export declare const PhotoHuntForeignSchema: Schema<PhotoHuntForeign, Model<PhotoHuntForeign, any, any, any, import("mongoose").Document<unknown, any, PhotoHuntForeign> & PhotoHuntForeign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PhotoHuntForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PhotoHuntForeign>> & import("mongoose").FlatRecord<PhotoHuntForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const PhotoHuntModel: Model<PhotoHunt, {}, {}, {}, import("mongoose").Document<unknown, {}, PhotoHunt> & PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default PhotoHuntModel;
//# sourceMappingURL=index.d.ts.map