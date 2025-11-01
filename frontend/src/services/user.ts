import type {
  UserAuthResponse,
  UserLoginAuth,
  UserRegisterPayload,
  UserRegisterReponse,
} from "../interfaces/users";
import { api } from "./api";

const BASE_URL = "/api";

// TODO : Convert to authService
export const loginService = async (
  data: UserLoginAuth
): Promise<UserAuthResponse> => {
  return await api.post(`${BASE_URL}/auth/login`, data);
};

export const UserService = {
  regiser: async (data: UserRegisterPayload): Promise<UserRegisterReponse> => {
    const response = await api.post(`${BASE_URL}/users`, data);
    console.log(123123, { response });

    return response.data;
  },
};
