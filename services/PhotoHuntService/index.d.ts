import { PhotoHuntPayload } from "../../models/PhotoHuntModel";
export declare const detail: (id: string) => Promise<import("../../models/PhotoHuntModel").PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const details: (challengeId: string) => Promise<(import("../../models/PhotoHuntModel").PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const sync: (challengeId: string, payload: PhotoHuntPayload[]) => Promise<(import("../../models/PhotoHuntModel").PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const verify: (id: string) => Promise<void>;
declare const PhotoHuntService: {
    detail: (id: string) => Promise<import("../../models/PhotoHuntModel").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    details: (challengeId: string) => Promise<(import("../../models/PhotoHuntModel").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    sync: (challengeId: string, payload: PhotoHuntPayload[]) => Promise<(import("../../models/PhotoHuntModel").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    verify: (id: string) => Promise<void>;
};
export default PhotoHuntService;
//# sourceMappingURL=index.d.ts.map