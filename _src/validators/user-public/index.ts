import schema from "~/helpers/schema";
import { UserPublicForeign } from "~/types";

export const UserPublicForeignValidator = schema.generate<UserPublicForeign>({
  id: schema.string({ required: true }),
  code: schema.string({ required: true }),
  name: schema.string({ required: true, allow: "" }),
});

const UserPublicValidator = { UserPublicForeignValidator };

export default UserPublicValidator;
