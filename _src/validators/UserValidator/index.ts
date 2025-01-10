import schema from "~/helpers/schema";
import { DefaultListParamsFields } from "~/helpers/validator";
import { UserListParams, UserPayload, UserRole } from "~/models/UserModel";

export const UserPayloadValidator = schema.generate<UserPayload>({
  email: schema.string({ required: true }).email(),
  password: schema.string({ required: true }),
});

export const UserListParamsValidator = schema.generate<UserListParams>({
  ...DefaultListParamsFields,
  role: schema.string({ defaultValue: null }).valid(...Object.values(UserRole)),
});

const UserValidator = {
  UserPayloadValidator,
  UserListParamsValidator,
};

export default UserValidator;
