export declare const verify: (code: string) => Promise<import("~/models/UserPublicModel").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const setup: () => Promise<import("mongoose").Document<unknown, {}, import("~/models/UserPublicModel").UserPublic> & import("~/models/UserPublicModel").UserPublic & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const UserPublicService: {
    verify: (code: string) => Promise<import("~/models/UserPublicModel").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setup: () => Promise<import("mongoose").Document<unknown, {}, import("~/models/UserPublicModel").UserPublic> & import("~/models/UserPublicModel").UserPublic & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
};
export default UserPublicService;
//# sourceMappingURL=index.d.ts.map