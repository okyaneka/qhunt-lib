import { TriviaPayload } from "../../index";
export declare const detail: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../index").Trivia> & import("../../index").Trivia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const details: (challengeId: string) => Promise<(import("../../index").Trivia & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const sync: (challengeId: string, payload: TriviaPayload[]) => Promise<(import("../../index").Trivia & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const verify: (id: string) => Promise<void>;
declare const TriviaService: {
    detail: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../index").Trivia> & import("../../index").Trivia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    details: (challengeId: string) => Promise<(import("../../index").Trivia & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    sync: (challengeId: string, payload: TriviaPayload[]) => Promise<(import("../../index").Trivia & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    verify: (id: string) => Promise<void>;
};
export default TriviaService;
//# sourceMappingURL=index.d.ts.map