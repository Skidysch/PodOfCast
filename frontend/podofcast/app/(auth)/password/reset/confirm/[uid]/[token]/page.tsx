import HeroSection from "@/components/HeroSection";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function Home({
  params,
}: {
  params: { uid: string; token: string };
}) {
  return (
    <main className="w-full mt-[162px]">
      <HeroSection>
        <ResetPasswordForm params={params} />
      </HeroSection>
    </main>
  );
}
