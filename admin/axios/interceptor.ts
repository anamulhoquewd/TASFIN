import { createCookie, deleteCookie } from "@/app/actions";
import axios from "axios";

const DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:4000";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/api/v1";

const baseURL = `${DOMAIN}${BASE_PATH}` || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }

        deleteCookie({ name: "accessToken" });
        deleteCookie({ name: "refreshToken" });

        return Promise.reject(new Error("Session expired please login again"));
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${baseURL}/admins/refresh`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.data.success && response.data.tokens?.accessToken) {
      createCookie({
        name: "accessToken",
        value: response.data.tokens.accessToken,
        maxAgeAsSeconds: 60 * 15, // 15m
      });
      return response.data.tokens.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Failed to refresh token: ", error);
    return null;
  }
};

export default api;
