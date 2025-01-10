export declare const sync: (TID: string) => Promise<import("~/models/UserPublicModel").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const verify: (code: string) => Promise<import("~/models/UserPublicModel").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const UserPublicService: {
    sync: (TID: string) => Promise<import("~/models/UserPublicModel").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    verify: (code: string) => Promise<import("~/models/UserPublicModel").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default UserPublicService;
//# sourceMappingURL=index.d.ts.map