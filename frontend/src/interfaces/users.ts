import type { BasicResponse } from "./common";

export interface UserLoginAuth {
  email: string;
  password: string;
}

export interface UserAuthType {
  access_token: string;
  expires_in: number;
}

export type UserAuthResponse = BasicResponse<UserAuthType>;

export interface UserRegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface UserRegisterType {
  id: string;
  email: string;
  username: string;
}

export type UserRegisterReponse = BasicResponse<UserRegisterType>;
