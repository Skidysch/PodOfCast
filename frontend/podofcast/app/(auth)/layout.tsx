import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Pod of Cast - Authentication",
  description: "Authentication actions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full mt-[162px]">
      <HeroSection>{children}</HeroSection>
    </main>
  );
}
