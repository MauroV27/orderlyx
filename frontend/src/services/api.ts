import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const interceptConfig = config;

  if (interceptConfig.headers) {
    const authCookie = {
      access_token: localStorage.getItem("access_token"),
    };

    interceptConfig.headers["Content-Type"] = "application/json";

    if (authCookie.access_token) {
      interceptConfig.headers.Authorization = `Bearer ${authCookie?.access_token}`;
    }
  }

  return interceptConfig;
});
