import Joi from "joi";
import schema from "~/helpers/schema";
import {
  QrContent,
  QrContentType,
  QrDeleteBulkPayload,
  QrGeneratePayload,
  QrListQuery,
  QrLocation,
  QrStatus,
  QrUpdatePayload,
} from "~/models/Qr";
import { DefaultListParamsFields } from "~/validators";

export const QrListQueryValidator = schema.generate<QrListQuery>({
  ...DefaultListParamsFields,
  code: schema.string({ allow: "" }),
  status: schema.string({ allow: "" }).valid(...Object.values(QrStatus)),
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
  status: schema.string({ required: true }).valid(...Object.values(QrStatus)),
  content: QrContentValidator.allow(null).default(null),
  location: QrLocationValidator.allow(null).default(null),
});

export const QrDeleteBulkPayloadValidator =
  schema.generate<QrDeleteBulkPayload>({
    ids: schema.array(Joi.string(), { required: true }),
  });

const QrValidator = {
  QrListQueryValidator,
  QrGeneratePayloadValidator,
  QrUpdatePayloadValidator,
  QrDeleteBulkPayloadValidator,
};

export default QrValidator;
