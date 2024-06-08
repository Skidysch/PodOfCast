import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: "Pod of Cast",
  description: "Your daily Pod of Cast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen max-w-content mx-auto font-sans antialiased",
          montserratAlternates.variable
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
