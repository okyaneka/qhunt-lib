import Joi from "joi";
import schema from "~/helpers/schema";
import {
  QrContent,
  QrContentType,
  QrDeleteBulkPayload,
  QrGeneratePayload,
  QrListParams,
  QrLocation,
  QrStatus,
  QrStatusValues,
  QrUpdatePayload,
} from "~/models/QrModel";
import { DefaultListParamsFields } from "~/helpers/validator";

export const QrListParamsValidator = schema.generate<QrListParams>({
  ...DefaultListParamsFields,
  code: schema.string({ allow: "" }),
  status: schema.string({ allow: "" }).valid(...Object.values(QrStatusValues)),
});

export const QrGeneratePayloadValidator = schema.generate<QrGeneratePayload>({
  amount: schema.number({ required: true }),
});

const QrContentValidator = schema.generate<QrContent>({
  refId: schema.string({ required: true }),
  type: schema
    .string({ required: true })
    .valid(...Object.values(QrContentType)),
});

const QrLocationValidator = schema.generate<QrLocation>({
  label: schema.string({ required: true, allow: "" }),
  longitude: schema.number({ required: true }),
  latitude: schema.number({ required: true }),
});

export const QrUpdatePayloadValidator = schema.generate<QrUpdatePayload>({
  status: schema
    .string({ required: true })
    .valid(...Object.values(QrStatusValues)),
  content: QrContentValidator.allow(null).default(null),
  location: QrLocationValidator.allow(null).default(null),
});

export const QrDeleteBulkPayloadValidator =
  schema.generate<QrDeleteBulkPayload>({
    ids: schema.array(Joi.string(), { required: true }),
  });

const QrValidator = {
  QrListParamsValidator,
  QrGeneratePayloadValidator,
  QrUpdatePayloadValidator,
  QrDeleteBulkPayloadValidator,
};

export default QrValidator;
