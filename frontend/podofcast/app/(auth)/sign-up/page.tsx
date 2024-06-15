import HeroSection from "@/components/HeroSection";
import SignUpForm from "@/components/SignUpForm";

export default function Home() {
  
  return (
    <main className="w-full mt-[162px]">
      <HeroSection>
        <SignUpForm />
      </HeroSection>
    </main>
  );
}