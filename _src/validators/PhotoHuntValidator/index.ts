import schema from "~/helpers/schema";
import { PhotoHuntPayload } from "~/models/PhotoHuntModel";

export const PhotoHuntPayloadValidator = schema.array(
  schema.generate<PhotoHuntPayload>({
    id: schema.string(),
    hint: schema.string({ required: true }),
    score: schema.number({ required: true }),
    feedback: schema.string({ defaultValue: "" }),
  }),
  { required: true }
);

const PhotoHuntValidator = { PhotoHuntPayloadValidator };

export default PhotoHuntValidator;
