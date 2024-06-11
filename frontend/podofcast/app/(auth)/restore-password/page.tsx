import HeroSection from "@/components/HeroSection";
import RestorePasswordForm from "@/components/RestorePasswordForm";

export default function Home() {
  return (
    <main className="w-full mt-[162px]">
      <HeroSection>
        <RestorePasswordForm />
      </HeroSection>
    </main>
  );
}
