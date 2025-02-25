import { ClientSession } from "mongoose";
export declare const verify: (value: string, session?: ClientSession) => Promise<import("../..").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const setup: (userId?: string) => Promise<import("../..").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const UserPublicService: {
    verify: (value: string, session?: ClientSession) => Promise<import("../..").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setup: (userId?: string) => Promise<import("../..").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default UserPublicService;
//# sourceMappingURL=index.d.ts.map