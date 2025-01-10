import Joi from "joi";
import { Periode } from "../types";
export declare const PeriodeValidator: Joi.ObjectSchema<Periode>;
export declare const DefaultListParamsFields: {
    page: Joi.NumberSchema<number>;
    limit: Joi.NumberSchema<number>;
    search: Joi.StringSchema<string>;
};
declare const validator: {
    PeriodeValidator: Joi.ObjectSchema<Periode>;
    DefaultListParamsFields: {
        page: Joi.NumberSchema<number>;
        limit: Joi.NumberSchema<number>;
        search: Joi.StringSchema<string>;
    };
};
export default validator;
//# sourceMappingURL=index.d.ts.map