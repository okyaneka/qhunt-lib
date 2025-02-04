import { PhotoHuntPayload } from "../../types";
export declare const detail: (id: string) => Promise<import("../../types").PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const details: (challengeId: string) => Promise<(import("../../types").PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const sync: (challengeId: string, payload: PhotoHuntPayload[]) => Promise<(import("../../types").PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const verify: (id: string) => Promise<void>;
declare const PhotoHuntService: {
    detail: (id: string) => Promise<import("../../types").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    details: (challengeId: string) => Promise<(import("../../types").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    sync: (challengeId: string, payload: PhotoHuntPayload[]) => Promise<(import("../../types").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    verify: (id: string) => Promise<void>;
};
export default PhotoHuntService;
//# sourceMappingURL=index.d.ts.map