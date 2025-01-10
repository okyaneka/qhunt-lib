import schema from "~/helpers/schema";
import { UserPublicForeign } from "~/models/UserPublicModel";

export const UserPublicForeignValidator = schema.generate<UserPublicForeign>({
  id: schema.string({ required: true }),
  code: schema.string({ required: true }),
  name: schema.string({ required: true, allow: "" }),
});

const UserPublicValidator = { UserPublicForeignValidator };

export default UserPublicValidator;
