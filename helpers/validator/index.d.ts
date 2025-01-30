import Joi from "joi";
import { Feedback, Periode } from "../types";
export declare const PeriodeValidator: Joi.ObjectSchema<Periode>;
export declare const DefaultListParamsFields: {
    page: Joi.NumberSchema<number>;
    limit: Joi.NumberSchema<number>;
    search: Joi.StringSchema<string>;
};
export declare const FeedbackValidator: Joi.ObjectSchema<Feedback>;
declare const validator: {
    PeriodeValidator: Joi.ObjectSchema<Periode>;
    DefaultListParamsFields: {
        page: Joi.NumberSchema<number>;
        limit: Joi.NumberSchema<number>;
        search: Joi.StringSchema<string>;
    };
    FeedbackValidator: Joi.ObjectSchema<Feedback>;
};
export default validator;
//# sourceMappingURL=index.d.ts.map