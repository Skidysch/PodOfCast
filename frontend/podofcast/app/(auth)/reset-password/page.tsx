import HeroSection from "@/components/HeroSection";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function Home() {
  return (
    <main className="w-full mt-[162px]">
      <HeroSection>
        <ResetPasswordForm />
      </HeroSection>
    </main>
  );
}
