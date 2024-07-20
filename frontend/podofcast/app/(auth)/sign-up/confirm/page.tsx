"use client";

import { useRedirectIfAuthenticated } from "@/hooks/useRedirect";
import useAuthStore from "@/store/useAuthStore";

export default function Home() {
  useRedirectIfAuthenticated();
  const confirmationEmail = useAuthStore((state) => state.confirmationEmail);

  return (
    <div className="max-w-full md:max-w-[630px] min-h-96 md:min-h-[540px] px-4 backdrop-blur mx-auto flex flex-col justify-center items-center gap-5 md:gap-10">
      <h1 className="max-w-[400px] md:max-w-full text-4xl md:text-6xl text-center font-bold leading-tight tracking-tight">
        Thank you for joining us!
      </h1>
      <p className="max-w-[400px] md:max-w-full md:text-2xl text-destruction text-center font-medium leading-relaxed ">
        We sent you an email confirmation to {confirmationEmail}. Please, check
        your inbox and activate your account.
      </p>
    </div>
  );
}
