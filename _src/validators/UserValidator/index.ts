import schema from "~/helpers/schema";
import { UserListQuery, UserPayload, UserRole } from "~/models/UserModel";
import { DefaultListQueryFields } from "..";

export const UserPayloadValidator = schema.generate<UserPayload>({
  email: schema.string({ required: true }).email(),
  password: schema.string({ required: true }),
});

export const UserListQueryValidator = schema.generate<UserListQuery>({
  ...DefaultListQueryFields,
  role: schema.string({ defaultValue: null }).valid(...Object.values(UserRole)),
});

const UserValidator = {
  UserPayloadValidator,
  UserListQueryValidator,
};

export default UserValidator;
