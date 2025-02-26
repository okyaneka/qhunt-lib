import { Timestamps, DefaultListParams } from "~";

export enum UserRole {
  Admin = "admin",
  Private = "private",
  Public = "public",
}

export interface UserListParams extends DefaultListParams {
  role: UserRole | null;
}

export interface UserPayload {
  name: string;
  email: string;
  password: string;
}

export type UserLoginPayload = Pick<User, "email" | "password">;

export type UserForeign = Pick<User, "id" | "name" | "email">;

export type Auth = Pick<User, "id" | "name" | "email"> & { token: string };

export interface User extends Timestamps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
