import Joi from "joi";
import { StageForeign, StageListParams, StagePayload } from "../../models/StageModel";
export declare const StageSettingsValidator: Joi.ObjectSchema<import("../../models/StageModel").StageSettings>;
export declare const StageListParamsValidator: Joi.ObjectSchema<StageListParams>;
export declare const StagePayloadValidator: Joi.ObjectSchema<StagePayload>;
export declare const StageForeignValidator: Joi.ObjectSchema<StageForeign>;
declare const StageValidator: {
    StageSettingsValidator: Joi.ObjectSchema<import("../../models/StageModel").StageSettings>;
    StageListParamsValidator: Joi.ObjectSchema<StageListParams>;
    StagePayloadValidator: Joi.ObjectSchema<StagePayload>;
    StageForeignValidator: Joi.ObjectSchema<StageForeign>;
};
export default StageValidator;
//# sourceMappingURL=index.d.ts.map