import HeroSection from "@/components/HeroSection";
import SignInForm from "@/components/SignInForm";

export default function Home() {

  return (
    <main className="w-full mt-[162px]">
      <HeroSection>
        <SignInForm />
      </HeroSection>
    </main>
  );
}
