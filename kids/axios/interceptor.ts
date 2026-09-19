import axios from "axios";

const DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:4000";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/api/v1";

const api = axios.create({
  baseURL: `${DOMAIN}${BASE_PATH}`,
  withCredentials: true,
});

export default api;
