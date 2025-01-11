import { TriviaForeign, TriviaOption, TriviaPayload } from "../../models/TriviaModel";
export declare const TriviaOptionValidator: import("joi").ObjectSchema<TriviaOption>;
export declare const TriviaOptionsValidator: import("joi").ArraySchema<TriviaOption>;
export declare const TriviaPayloadValidator: import("joi").ObjectSchema<TriviaPayload>;
export declare const TriviaItemsPayloadValidator: import("joi").ObjectSchema<{
    items: TriviaPayload[];
}>;
export declare const TriviaForeignValidator: import("joi").ObjectSchema<TriviaForeign>;
declare const TriviaValidator: {
    TriviaOptionValidator: import("joi").ObjectSchema<TriviaOption>;
    TriviaOptionsValidator: import("joi").ArraySchema<TriviaOption>;
    TriviaPayloadValidator: import("joi").ObjectSchema<TriviaPayload>;
    TriviaItemsPayloadValidator: import("joi").ObjectSchema<{
        items: TriviaPayload[];
    }>;
    TriviaForeignValidator: import("joi").ObjectSchema<TriviaForeign>;
};
export default TriviaValidator;
//# sourceMappingURL=index.d.ts.map