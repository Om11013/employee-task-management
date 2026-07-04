import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";
import { toast } from "sonner";
import {
  getAccessToken,
  saveAccessToken,
  clearAuth,
} from "../utils/auth.utils";

export const rest = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

rest.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

rest.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          `${rest.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = refreshResponse.data.accessToken;
        saveAccessToken(newAccessToken, true);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return rest(originalRequest);
      } catch (refreshError) {
        clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.data) {
      const data = error.response.data as { message?: string };
      if (data.message && originalRequest.url !== "/auth/me") {
        toast.error(data.message);
      } else if (originalRequest.url !== "/auth/me") {
        toast.error("An unexpected error occurred");
      }
    } else {
      toast.error("Network error");
    }

    return Promise.reject(error);
  },
);

export const requestV1 = async <RequestPayload, ResponsePayload>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: RequestPayload,
  config?: AxiosRequestConfig,
): Promise<ResponsePayload> => {
  const response: AxiosResponse<ResponsePayload> = await rest({
    method,
    url,
    data,
    ...config,
  });
  return response.data;
};
