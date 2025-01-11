import { Challenge } from "../../models/ChallengeModel";
import { TriviaPayload } from "../../models/TriviaModel";
export declare const sync: (challenge: Challenge, items: TriviaPayload[]) => Promise<string[]>;
export declare const content: (challenge: Challenge) => Promise<any[]>;
export declare const detail: (id: string) => Promise<void>;
export declare const verify: (id: string) => Promise<void>;
declare const TriviaService: {
    sync: (challenge: Challenge, items: TriviaPayload[]) => Promise<string[]>;
    content: (challenge: Challenge) => Promise<any[]>;
    detail: (id: string) => Promise<void>;
    verify: (id: string) => Promise<void>;
};
export default TriviaService;
//# sourceMappingURL=index.d.ts.map