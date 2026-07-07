import axios from "axios";

const DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:4000";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/api/v1";

const API_BASE_URL = `${DOMAIN}${BASE_PATH}` || "http://localhost:4000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("[API Error]", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
