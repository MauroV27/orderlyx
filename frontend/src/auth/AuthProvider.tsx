import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginService } from "../services/user";
import type { UserLoginAuth } from "../interfaces/users";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  // Carrega token salvo ao iniciar o app
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (loginData: UserLoginAuth) => {
    const res = await loginService(loginData);
    const { access_token, expires_in } = res.data;

    // Salva no localStorage
    localStorage.setItem("access_token", access_token);
    localStorage.setItem(
      "token_expiration",
      String(Date.now() + expires_in * 1000)
    );

    setToken(access_token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiration");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
