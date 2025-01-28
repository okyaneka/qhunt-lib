import { Challenge } from "../../models/ChallengeModel";
import { TriviaPayload } from "../../models/TriviaModel";
export declare const sync: (challenge: Challenge, items: TriviaPayload[]) => Promise<string[]>;
export declare const content: (challenge: Challenge) => Promise<(import("../../models/TriviaModel").Trivia & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const detail: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../models/TriviaModel").Trivia> & import("../../models/TriviaModel").Trivia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const verify: (id: string) => Promise<void>;
declare const TriviaService: {
    sync: (challenge: Challenge, items: TriviaPayload[]) => Promise<string[]>;
    content: (challenge: Challenge) => Promise<(import("../../models/TriviaModel").Trivia & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    detail: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../models/TriviaModel").Trivia> & import("../../models/TriviaModel").Trivia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    verify: (id: string) => Promise<void>;
};
export default TriviaService;
//# sourceMappingURL=index.d.ts.map