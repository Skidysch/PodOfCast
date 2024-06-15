"use client";

import HeroSection from "@/components/HeroSection";
import useAuthStore from "@/store/useAuthStore";
import { useRedirectIfAuthenticated } from "@/lib/hooks/useRedirectIfAuthenticated";


export default function Home() {
  useRedirectIfAuthenticated();
  const confirmationEmail = useAuthStore(state => state.confirmationEmail);

  return (
    <main className="w-full mt-[162px]">
      <HeroSection>
        <div className="max-w-[630px] min-h-[540px] flex flex-col justify-center gap-5">
          <h1 className="text-6xl text-center font-bold leading-tight tracking-tight">
            Thank you for joining us!
          </h1>
          <p className="text-2xl text-destruction text-center font-medium leading-relaxed ">
            We sent you an email confirmation to {confirmationEmail}. Please, check
            your inbox and activate your account.
          </p>
        </div>
      </HeroSection>
    </main>
  );
}
