import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { logout } from "./reactQuery/authApi";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const refreshAccessToken = async (refresh: string | null) => {
  const response = await axiosInstance.post("/auth/jwt/refresh", {
    refresh,
  });
  return response.data;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const access = useAuthStore.getState().access;
    const refresh = useAuthStore.getState().refresh;
    const setAccess = useAuthStore.getState().setAccess;

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
      const { exp } = jwtDecode<{ exp: number }>(access as string);
      const isExpired = Date.now() >= exp * 1000;
      if (isExpired) {
        try {
          const data = await refreshAccessToken(refresh);
          setAccess(data.access);
          config.headers.Authorization = `Bearer ${data.access}`;
        } catch (error) {
          logout();
          throw error;
        }
      }
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
