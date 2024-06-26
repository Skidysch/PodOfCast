import axiosInstance from "@/api/api";
import useAuthStore from "@/store/useAuthStore";
import {
  AuthResponse,
  User,
  UserLogin,
  UserRegister,
  UserActivation,
  UserRestorePassword,
  UserResetPassword,
  OAuthLogin,
  OAuthLoginResponse,
  OAuthAuthenticate,
  OAuthParams,
} from "@/types/auth";
import { AxiosError } from "axios";

export const register = async (data: UserRegister): Promise<User> => {
  const response = await axiosInstance.post<User>("/auth/users/", data);

  if (response.status !== 201) {
    throw new AxiosError("User registration failed");
  }
  return response.data;
};

export const activation = async (data: UserActivation): Promise<void> => {
  try {
    await axiosInstance.post("/auth/users/activation/", data);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data: UserLogin): Promise<void> => {
  const setAccess = useAuthStore.getState().setAccess;
  const setRefresh = useAuthStore.getState().setRefresh;
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/jwt/create/",
      data
    );
    const { access, refresh } = response.data;

    setAccess(access);
    setRefresh(refresh);
  } catch (error) {
    throw error;
  }

  try {
    const userResponse = await axiosInstance.get<User>("/auth/users/me/");

    useAuthStore.getState().setUser(userResponse.data);
  } catch (error) {
    throw error;
  }
};

export const oAuthLogin = async (data: OAuthLogin) => {
  const response = await axiosInstance.get(
    `/auth/o/${data.provider}/?redirect_uri=http://localhost:3000`,
  );
  const responseData: OAuthLoginResponse = {
    authorizationUrl: response.data.authorization_url,
    provider: data.provider,
  };

  return responseData;
};

export const oAuthAuthenticate = async (data: OAuthAuthenticate) => {
  const access = useAuthStore.getState().access;
  const setAccess = useAuthStore.getState().setAccess;
  const setRefresh = useAuthStore.getState().setRefresh;
  if (data.state && data.code && !access) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const details: OAuthParams = {
      state: data.state,
      code: data.code,
    };
    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) +
          "=" +
          encodeURIComponent(details[key as keyof OAuthParams])
      )
      .join("&");
    try {
      const response = await axiosInstance.post(
        `/auth/o/${data.provider}/?${formBody}`,
        config
      );
      const { access, refresh } = response.data;

      setAccess(access);
      setRefresh(refresh);
    } catch (error) {
      throw error;
    }
    try {
      const userResponse = await axiosInstance.get<User>("/auth/users/me/");

      useAuthStore.getState().setUser(userResponse.data);
    } catch (error) {
      throw error;
    }
  }
};

export const logout = (): Promise<void> => {
  const clearAccess = useAuthStore.getState().clearAccess;
  const clearRefresh = useAuthStore.getState().clearRefresh;
  const clearUser = useAuthStore.getState().clearUser;
  const setIsAuthenticated = useAuthStore.getState().setIsAuthenticated;

  return new Promise((resolve) => {
    clearAccess();
    clearRefresh();
    clearUser();
    setIsAuthenticated(false);
    resolve();
  });
};

export const restorePassword = async (
  data: UserRestorePassword
): Promise<UserRestorePassword> => {
  try {
    await axiosInstance.post("/auth/users/reset_password/", data);
    // for storing confirmation email
    return data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data: UserResetPassword): Promise<void> => {
  try {
    await axiosInstance.post("/auth/users/reset_password_confirm/", data);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const access = useAuthStore.getState().access;
  if (!access) return null;

  try {
    const response = await axiosInstance.get<User>("/auth/users/me/");
    useAuthStore.getState().setUser(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    logout();
    return null;
  }
};

export const fetchUser = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/api/users/${id}/`);
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};
