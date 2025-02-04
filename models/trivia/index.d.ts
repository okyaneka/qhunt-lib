import { Model, Schema } from "mongoose";
import { Trivia, TriviaForeign, TriviaForeignOption } from "../../types";
export declare const TriviaForeignOptionSchema: Schema<TriviaForeignOption, Model<TriviaForeignOption, any, any, any, import("mongoose").Document<unknown, any, TriviaForeignOption> & TriviaForeignOption & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TriviaForeignOption, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TriviaForeignOption>> & import("mongoose").FlatRecord<TriviaForeignOption> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const TriviaForeignSchema: Schema<TriviaForeign, Model<TriviaForeign, any, any, any, import("mongoose").Document<unknown, any, TriviaForeign> & Pick<Trivia, "id" | "question" | "allowMultiple"> & {
    options: TriviaForeignOption[];
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TriviaForeign, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TriviaForeign>> & import("mongoose").FlatRecord<TriviaForeign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const TriviaModel: Model<Trivia, {}, {}, {}, import("mongoose").Document<unknown, {}, Trivia> & Trivia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default TriviaModel;
//# sourceMappingURL=index.d.ts.map