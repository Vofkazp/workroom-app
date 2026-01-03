import axios, {AxiosResponse} from 'axios';
import {Token} from "../interfaces/AuthInterface";

const api = axios.create({
  baseURL: "http://127.0.1.0:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const tokenRefresh = async (originalRequest: any) => {
  try {
    const refresh_token: string | null = localStorage.getItem("REFRESH_TOKEN");
    const response: AxiosResponse<Token> = await axios.post(
        "http://127.0.1.0:5000/api/auth/refresh",
        {token: refresh_token}
    );
    if (response.status === 200) {
      localStorage.setItem("ACCESS_TOKEN", response.data.response.accessToken);
      localStorage.setItem("REFRESH_TOKEN", response.data.response.refreshToken);

      api.defaults.headers.Authorization = `Bearer ${response.data.response.accessToken}`;

      originalRequest.headers.Authorization = `Bearer ${response.data.response.accessToken}`;

      return api(originalRequest);
    }
  } catch (e) {
    Logout();
  }
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true;
        return tokenRefresh(error.config);
      }
      return Promise.reject(error);
    }
);

function Logout() {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
  window.location.href = "/login";
}

export default api;