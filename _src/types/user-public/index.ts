import { Timestamps, ValueOf } from "~/helpers/types";
import { UserForeign } from "../user";
import { S3Foreign } from "../s3";

export const USER_PUBLIC_GENDER = {
  Male: "male",
  Female: "female",
  Panda: "panda",
} as const;

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

export interface UserPublic extends Timestamps {
  id: string;
  user: UserForeign | null;
  code: string;
  name: string;
  gender: UserPublicGender | null;
  dob: Date | null;
  photo: S3Foreign | null;
  phone: string;
  lastAccessedAt: Date;
}

export type UserPublicForeign = Pick<UserPublic, "id" | "name" | "code">;
