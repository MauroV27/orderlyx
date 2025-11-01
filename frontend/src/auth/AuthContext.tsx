import { createContext } from "react";
import type { UserLoginAuth } from "../interfaces/users";

interface AuthContextType {
  token: string | null;
  login: (loginData: UserLoginAuth) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});
