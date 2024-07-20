"use client";

import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile/me");
    }
  }, [isAuthenticated, router]);
};

export const useRedirectIfNotAuthenticated = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, router]);
};
