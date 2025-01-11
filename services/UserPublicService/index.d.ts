export declare const verify: (code: string) => Promise<import("../../models/UserPublicModel").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const setup: () => Promise<import("../../models/UserPublicModel").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const UserPublicService: {
    verify: (code: string) => Promise<import("../../models/UserPublicModel").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setup: () => Promise<import("../../models/UserPublicModel").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default UserPublicService;
//# sourceMappingURL=index.d.ts.map