import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const interceptConfig = config;

  if (interceptConfig.headers) {
    const authCookie = {
      access_token: undefined, // ter um hook que insira o token aqui
    };

    interceptConfig.headers["Content-Type"] = "application/json";

    if (authCookie.access_token) {
      interceptConfig.headers.Authorization = `Bearer ${authCookie?.access_token}`;
    }
  }

  return interceptConfig;
});
