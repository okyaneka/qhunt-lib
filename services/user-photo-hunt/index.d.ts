import { UserChallengeForeign, UserPhotoHuntSummary, UserPublicForeign } from "../../types";
import { ClientSession } from "mongoose";
export declare const setup: (userPublic: UserPublicForeign, userChallenge: UserChallengeForeign, session?: ClientSession) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../../types").UserPhotoHunt> & import("../../types").UserPhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Omit<{
    userPublic: UserPublicForeign;
    userChallenge: UserChallengeForeign;
    photoHunt: {
        id: string;
        hint: string;
    };
}[], "_id">>[]>;
export declare const details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("../../types").UserPhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const submit: (userChallengeId: string, TID: string, code: string, bonus?: number) => Promise<import("../../types").UserPhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const submitEmpties: (userChallengeId: string, TID: string, session?: ClientSession) => Promise<import("mongoose").UpdateWriteOpResult>;
export declare const summary: (userChallengeId: string, TID: string, session?: ClientSession) => Promise<UserPhotoHuntSummary>;
declare const UserPhotoHuntService: {
    readonly setup: (userPublic: UserPublicForeign, userChallenge: UserChallengeForeign, session?: ClientSession) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../../types").UserPhotoHunt> & import("../../types").UserPhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, Omit<{
        userPublic: UserPublicForeign;
        userChallenge: UserChallengeForeign;
        photoHunt: {
            id: string;
            hint: string;
        };
    }[], "_id">>[]>;
    readonly details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("../../types").UserPhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    readonly submit: (userChallengeId: string, TID: string, code: string, bonus?: number) => Promise<import("../../types").UserPhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly submitEmpties: (userChallengeId: string, TID: string, session?: ClientSession) => Promise<import("mongoose").UpdateWriteOpResult>;
    readonly summary: (userChallengeId: string, TID: string, session?: ClientSession) => Promise<UserPhotoHuntSummary>;
};
export default UserPhotoHuntService;
//# sourceMappingURL=index.d.ts.map