import Joi from "joi";
import { QrDeleteBulkPayload, QrGeneratePayload, QrListQuery, QrUpdatePayload } from "~/models/QrModel";
export declare const QrListQueryValidator: Joi.ObjectSchema<QrListQuery>;
export declare const QrGeneratePayloadValidator: Joi.ObjectSchema<QrGeneratePayload>;
export declare const QrUpdatePayloadValidator: Joi.ObjectSchema<QrUpdatePayload>;
export declare const QrDeleteBulkPayloadValidator: Joi.ObjectSchema<QrDeleteBulkPayload>;
declare const QrValidator: {
    QrListQueryValidator: Joi.ObjectSchema<QrListQuery>;
    QrGeneratePayloadValidator: Joi.ObjectSchema<QrGeneratePayload>;
    QrUpdatePayloadValidator: Joi.ObjectSchema<QrUpdatePayload>;
    QrDeleteBulkPayloadValidator: Joi.ObjectSchema<QrDeleteBulkPayload>;
};
export default QrValidator;
//# sourceMappingURL=index.d.ts.map