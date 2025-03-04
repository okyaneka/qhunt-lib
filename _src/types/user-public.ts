import { Timestamps, ValueOf } from "~/index";
import { UserForeign, UserForeignFull } from "./user";
import { USER_PUBLIC_GENDER } from "~/constants";

export type UserPublicGender = ValueOf<typeof USER_PUBLIC_GENDER>;

export interface UserPublicPayload {
  name: string;
  gender: UserPublicGender | null;
  dob: Date | null;
  phone: string;
}

export interface UserPublicPhotoPayload {
  file: File;
}

export type UserPublicFull = Omit<UserPublic, "user"> & {
  user: UserForeignFull | null;
};

export interface UserPublic extends Timestamps {
  id: string;
  user: UserForeign | null;
  code: string;
  name: string;
  gender: UserPublicGender | null;
  dob: Date | null;
  phone: string;
  lastAccessedAt: Date;
}

export type UserPublicForeign = Pick<UserPublic, "id" | "name" | "code">;
