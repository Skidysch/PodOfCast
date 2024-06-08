import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
          "min-h-screen bg-background font-sans antialiased",
          montserratAlternates.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
