import { PhotoHuntPayload } from "../..";
export declare const detail: (id: string) => Promise<import("../..").PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const details: (challengeId: string) => Promise<(import("../..").PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const sync: (challengeId: string, payload: PhotoHuntPayload[]) => Promise<(import("../..").PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const verify: (id: string) => Promise<void>;
export declare const verifyCode: (challengeId: string, code: string) => Promise<import("../..").PhotoHunt & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const PhotoHuntService: {
    detail: (id: string) => Promise<import("../..").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    details: (challengeId: string) => Promise<(import("../..").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    sync: (challengeId: string, payload: PhotoHuntPayload[]) => Promise<(import("../..").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    verify: (id: string) => Promise<void>;
    verifyCode: (challengeId: string, code: string) => Promise<import("../..").PhotoHunt & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
export default PhotoHuntService;
