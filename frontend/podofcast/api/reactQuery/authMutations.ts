"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  User,
  UserActivation,
  UserLogin,
  OAuthLogin,
  OAuthAuthenticate,
  UserRegister,
  UserResetPassword,
  UserRestorePassword,
  OAuthLoginResponse,
} from "@/types/auth";
import {
  activation,
  login,
  oAuthLogin,
  logout,
  register,
  resetPassword,
  restorePassword,
  oAuthAuthenticate,
} from "@/api/reactQuery/authApi";
import useAuthStore from "@/store/useAuthStore";
import { AxiosError } from "axios";

export const useRegister = () => {
  const router = useRouter();
  const { setConfirmationEmail, setErrorMessage } = useAuthStore();

  return useMutation({
    mutationFn: (data: UserRegister) => register(data),
    onMutate: () => {
      console.log("register mutate");
    },
    onError: () => {
      console.log("register error");
    },
    onSuccess: async (data: User) => {
      console.log("register success");
      try {
        setConfirmationEmail(data.email);
        router.push("/sign-up/confirm");
      } catch (error) {
        throw error;
      }
    },
    onSettled: (_, error: AxiosError | null) => {
      console.log("register settle");
      if (error) {
        const errorMessage = Object.values(
          JSON.parse(error?.request.response)
        )[0] as string;
        console.log(error);
        setErrorMessage(errorMessage);
      }
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setErrorMessage } = useAuthStore();

  return useMutation({
    mutationFn: (data: UserLogin) => login(data),
    onMutate: () => {
      console.log("login mutate");
    },
    onSuccess: () => {
      console.log("login success");
      setIsAuthenticated(true);
    },
    onError: () => {
      console.log("login error");
    },
    onSettled: async (_, error: AxiosError | null) => {
      console.log("login settle");
      if (error) {
        const errorMessage = Object.values(
          JSON.parse(error?.request.response)
        )[0] as string;
        setErrorMessage(errorMessage);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      }
    },
  });
};

export const useOAuthLogin = () => {
  const { setProvider } = useAuthStore();
  return useMutation({
    mutationFn: (data: OAuthLogin) => oAuthLogin(data),
    onSuccess: (data: OAuthLoginResponse) => {
      console.log("oauth login success");
      setProvider(data.provider);
      window.location.href = data.authorizationUrl;
    },
    onError: () => {
      console.log("oauth login error");
    },
  });
};

export const useOAuthAuthenticate = () => {
  const queryClient = useQueryClient();
  const { setIsAuthenticated, clearProvider } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: OAuthAuthenticate) => oAuthAuthenticate(data),
    onSuccess: () => {
      console.log("oauth authenticate success");
      setIsAuthenticated(true);
      router.push("/");
    },
    onError: () => {
      console.log("oauth authenticate error");
    },
    onSettled: async (_, error) => {
      console.log("oauth authenticate settle");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
        clearProvider();
      }
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log("logout success");
      router.push("/sign-in");
    },
  });
};

export const useActivation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UserActivation) => activation(data),
    onMutate: () => {
      console.log("activation mutate");
    },
    onSuccess: () => {
      console.log("activation success");
      router.push("/activation/done");
    },
  });
};

export const useRestorePassword = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setErrorMessage, setConfirmationEmail } = useAuthStore();

  return useMutation({
    mutationFn: (data: UserRestorePassword) => restorePassword(data),
    onSuccess: (data: UserRestorePassword) => {
      console.log("restore password success");
      setConfirmationEmail(data.email);
      router.push("/restore-password/done");
    },
    onError: () => {
      console.log("restore password error");
    },
    onSettled: (_, error: AxiosError | null) => {
      console.log("restore password settle");
      if (error) {
        const errorMessage = Object.values(
          JSON.parse(error?.request.response)
        )[0] as string;
        setErrorMessage(errorMessage);
      } else {
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
      }
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setErrorMessage } = useAuthStore();

  return useMutation({
    mutationFn: (data: UserResetPassword) => resetPassword(data),
    onSuccess: () => {
      console.log("reset password success");
      router.push("/password/reset/done");
    },
    onError: () => {
      console.log("reset password error");
    },
    onSettled: (_, error: AxiosError | null) => {
      console.log("reset password settle");
      if (error) {
        const errorMessage = Object.values(
          JSON.parse(error?.request.response)
        )[0] as string;
        setErrorMessage(errorMessage);
      } else {
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
      }
    },
  });
};
