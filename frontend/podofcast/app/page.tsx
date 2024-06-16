"use client";

import { useOAuthAuthenticate } from "@/api/reactQuery/authMutations";
import useAuthStore from "@/store/useAuthStore";
import { OAuthAuthenticate } from "@/types/auth";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { mutate } = useOAuthAuthenticate();
  const { provider } = useAuthStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  useEffect(() => {
    if (state && code) {
      const data: OAuthAuthenticate = {
        state: state,
        code: code,
        provider: provider,
      };
      mutate(data);
    }
  }, [pathname]);

  return <main className="mt-[162px]">Main Page</main>;
}
