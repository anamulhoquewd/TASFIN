import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.API_DOMAIN || "http://localhost:4000"}/api/v1`,
  withCredentials: true,
  //   headers: {
  //     Authorization: `Bearer ${getStorage("accessToken")}`,
  //   },
});

export default api;
