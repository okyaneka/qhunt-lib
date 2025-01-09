import { IdName, Timestamps } from "~/helpers";

export enum UserPublicGender {
  Male = "male",
  Female = "female",
  Panda = "panda",
}

export interface UserPublicPayload {
  name: string;
  gender: UserPublicGender | null;
  dob: Date | null;
  phone: string;
}

export interface UserPublic extends Timestamps {
  id: string;
  user: IdName;
  code: string;
  name: string;
  gender: UserPublicGender | null;
  dob: Date | null;
  phone: string;
  lastAccessedAt: Date;
}

export type UserPublicForeign = Pick<UserPublic, "id" | "name" | "code">;
