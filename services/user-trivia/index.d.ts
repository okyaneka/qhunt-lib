import { UserChallengeForeign, UserPublicForeign, UserTriviaSummary, TriviaForeign } from "../../types";
import { ClientSession } from "mongoose";
export declare const verify: (triviaId: string, TID: string) => Promise<import("mongoose").Document<unknown, {}, import("../../types").UserTrivia> & import("../../types").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const setup: (userPublic: UserPublicForeign, userChallenge: UserChallengeForeign, session?: ClientSession) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../../types").UserTrivia> & import("../../types").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Omit<{
    userPublic: UserPublicForeign;
    userChallenge: UserChallengeForeign;
    trivia: TriviaForeign;
}[], "_id">>[]>;
export declare const details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("../../types").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const submit: (id: string, TID: string, answer?: string | null, bonus?: number) => Promise<import("../../types").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const submitEmpties: (userChallengeId: string, TID: string, session?: ClientSession) => Promise<import("mongoose").UpdateWriteOpResult>;
export declare const summary: (userChallengeId: string, TID: string, session?: ClientSession) => Promise<UserTriviaSummary>;
declare const UserTriviaService: {
    readonly setup: (userPublic: UserPublicForeign, userChallenge: UserChallengeForeign, session?: ClientSession) => Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../../types").UserTrivia> & import("../../types").UserTrivia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, Omit<{
        userPublic: UserPublicForeign;
        userChallenge: UserChallengeForeign;
        trivia: TriviaForeign;
    }[], "_id">>[]>;
    readonly details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("../../types").UserTrivia & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    readonly submit: (id: string, TID: string, answer?: string | null, bonus?: number) => Promise<import("../../types").UserTrivia & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly submitEmpties: (userChallengeId: string, TID: string, session?: ClientSession) => Promise<import("mongoose").UpdateWriteOpResult>;
    readonly summary: (userChallengeId: string, TID: string, session?: ClientSession) => Promise<UserTriviaSummary>;
};
export default UserTriviaService;
//# sourceMappingURL=index.d.ts.map