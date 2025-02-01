import { UserChallengeForeign } from "../../models/UserChallengeModel";
import { UserPublicForeign } from "../../models/UserPublicModel";
import { UserTriviaSummary } from "../../models/UserTriviaModel";
export declare const verify: (triviaId: string, TID: string) => Promise<import("mongoose").Document<unknown, {}, import("../../models/UserTriviaModel").UserTrivia> & import("../../models/UserTriviaModel").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const setup: (userPublic: UserPublicForeign, userChallenge: UserChallengeForeign, content: string[]) => Promise<string[]>;
export declare const details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("../../models/UserTriviaModel").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const submit: (id: string, TID: string, answer?: string | null, bonus?: number) => Promise<import("../../models/UserTriviaModel").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const summary: (userChallengeId: string, TID: string) => Promise<UserTriviaSummary[]>;
declare const UserTriviaService: {
    readonly setup: (userPublic: UserPublicForeign, userChallenge: UserChallengeForeign, content: string[]) => Promise<string[]>;
    readonly details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("../../models/UserTriviaModel").UserTrivia & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    readonly submit: (id: string, TID: string, answer?: string | null, bonus?: number) => Promise<import("../../models/UserTriviaModel").UserTrivia & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly summary: (userChallengeId: string, TID: string) => Promise<UserTriviaSummary[]>;
};
export default UserTriviaService;
//# sourceMappingURL=index.d.ts.map