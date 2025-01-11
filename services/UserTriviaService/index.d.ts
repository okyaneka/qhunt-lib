import { UserChallengeForeign } from "../../models/UserChallengeModel";
import { UserPublicForeign } from "../../models/UserPublicModel";
export declare const verify: (triviaId: string, TID: string) => Promise<import("mongoose").Document<unknown, {}, import("../../models/UserTriviaModel").UserTrivia> & import("../../models/UserTriviaModel").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const setup: (userPublic: UserPublicForeign, userChallenge: UserChallengeForeign, content: string[]) => Promise<string[]>;
export declare const details: (ids: string[], TID: string) => Promise<(import("../../models/UserTriviaModel").UserTrivia & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
declare const UserTriviaService: {
    readonly setup: (userPublic: UserPublicForeign, userChallenge: UserChallengeForeign, content: string[]) => Promise<string[]>;
    readonly details: (ids: string[], TID: string) => Promise<(import("../../models/UserTriviaModel").UserTrivia & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
};
export default UserTriviaService;
//# sourceMappingURL=index.d.ts.map