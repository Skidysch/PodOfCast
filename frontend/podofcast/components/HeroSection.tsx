import Image from "next/image";
import DecorSpring from "/public/decor-hero-1.svg?url";
import DecorStars from "/public/decor-hero-2.png";

const HeroSection = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex w-full overflow-hidden relative items-center justify-center">
      <Image
        src={DecorSpring}
        width={630}
        height={592}
        alt="Decor image"
        className="absolute top-[-92px] left-[-303px]"
      />
      <Image
        src={DecorStars}
        width={120}
        height={167}
        alt="Decor image"
        className="absolute top-[72px] right-[-28px]"
      />
      {children}
    </section>
  );
};

export default HeroSection;
