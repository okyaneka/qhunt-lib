import { ClientSession } from "mongoose";
import { UserPublicFull } from "../../types/user-public";
export declare const verify: (value: string, session?: ClientSession) => Promise<import("../../types/user-public").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const detail: (TID: string, session?: ClientSession) => Promise<UserPublicFull>;
export declare const setup: (userId?: string) => Promise<import("../../types/user-public").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const UserPublicService: {
    verify: (value: string, session?: ClientSession) => Promise<import("../../types/user-public").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    detail: (TID: string, session?: ClientSession) => Promise<UserPublicFull>;
    setup: (userId?: string) => Promise<import("../../types/user-public").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default UserPublicService;
//# sourceMappingURL=index.d.ts.map