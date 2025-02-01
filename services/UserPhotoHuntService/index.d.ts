import { UserChallengeForeign } from "../../models/UserChallengeModel";
import { UserPhotoHuntSummary } from "../../models/UserPhotoHuntModel";
import { UserPublicForeign } from "../../models/UserPublicModel";
export declare const setup: (userPublic: UserPublicForeign, userChallenge: UserChallengeForeign) => Promise<string[]>;
export declare const details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("../../models/UserPhotoHuntModel").UserPhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const submit: (id: string, TID: string, isFound: boolean, bonus?: number) => Promise<import("../../models/UserPhotoHuntModel").UserPhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const submitEmpties: (userChallengeId: string, TID: string) => Promise<import("mongoose").UpdateWriteOpResult>;
export declare const summary: (userChallengeId: string, TID: string) => Promise<UserPhotoHuntSummary>;
declare const UserPhotoHuntService: {
    readonly setup: (userPublic: UserPublicForeign, userChallenge: UserChallengeForeign) => Promise<string[]>;
    readonly details: (ids: string[], TID: string, hasResult?: boolean) => Promise<(import("../../models/UserPhotoHuntModel").UserPhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    readonly submit: (id: string, TID: string, isFound: boolean, bonus?: number) => Promise<import("../../models/UserPhotoHuntModel").UserPhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readonly submitEmpties: (userChallengeId: string, TID: string) => Promise<import("mongoose").UpdateWriteOpResult>;
    readonly summary: (userChallengeId: string, TID: string) => Promise<UserPhotoHuntSummary>;
};
export default UserPhotoHuntService;
//# sourceMappingURL=index.d.ts.map