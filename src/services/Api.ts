import axios, {AxiosError} from 'axios';
import {ApiResponse, Token} from "../interfaces/AuthInterface";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

type ApiError = {
  status: false;
  message: string;
  error?: string;
};

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

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

const tokenRefresh = async (): Promise<string> => {
  const refresh_token = localStorage.getItem("REFRESH_TOKEN");
  if (!refresh_token) throw new Error("No refresh token");

  const {data} = await api.post<ApiResponse<Token>>("/auth/refresh", {
    token: refresh_token,
  });
  if (!data || !data.status) {
    throw new Error(data?.message || "Token refresh failed!");
  }
  const accessToken = data.response.accessToken;
  const refreshToken = data.response.refreshToken;

  localStorage.setItem("ACCESS_TOKEN", accessToken);
  localStorage.setItem("REFRESH_TOKEN", refreshToken);

  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  return accessToken;
};


api.interceptors.response.use(
    response => response,
    async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest) {
        if (originalRequest._retry) {
          Logout();
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers!.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await tokenRefresh();
          processQueue(null, newToken);

          originalRequest.headers!.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          processQueue(err, null);
          Logout();
          return Promise.reject({
            status: false,
            message: "Сесія завершена. Увійдіть знову!",
          });
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject({
        status: false,
        message: error.response?.data?.message || error.response?.data?.error || "Помилка сервера!",
      });
    }
);


function Logout() {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
  window.location.href = "/login";
}

export default api;