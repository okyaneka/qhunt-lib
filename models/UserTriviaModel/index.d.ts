import { Model } from "mongoose";
import { UserTrivia } from "./types";
export * from "./types";
declare const UserTriviaModel: Model<UserTrivia, {}, {}, {}, import("mongoose").Document<unknown, {}, UserTrivia> & UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default UserTriviaModel;
//# sourceMappingURL=index.d.ts.map