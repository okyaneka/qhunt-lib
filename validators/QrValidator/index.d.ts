import Joi from "joi";
import { QrDeleteBulkPayload, QrGeneratePayload, QrListParams, QrUpdatePayload } from "~/models/QrModel";
export declare const QrListParamsValidator: Joi.ObjectSchema<QrListParams>;
export declare const QrGeneratePayloadValidator: Joi.ObjectSchema<QrGeneratePayload>;
export declare const QrUpdatePayloadValidator: Joi.ObjectSchema<QrUpdatePayload>;
export declare const QrDeleteBulkPayloadValidator: Joi.ObjectSchema<QrDeleteBulkPayload>;
declare const QrValidator: {
    QrListParamsValidator: Joi.ObjectSchema<QrListParams>;
    QrGeneratePayloadValidator: Joi.ObjectSchema<QrGeneratePayload>;
    QrUpdatePayloadValidator: Joi.ObjectSchema<QrUpdatePayload>;
    QrDeleteBulkPayloadValidator: Joi.ObjectSchema<QrDeleteBulkPayload>;
};
export default QrValidator;
//# sourceMappingURL=index.d.ts.map