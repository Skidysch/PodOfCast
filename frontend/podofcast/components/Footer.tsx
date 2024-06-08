"use client";

import Link from "next/link";
import Image from "next/image";
import {
  StyledLogo,
  StyledInstagramIcon,
  StyledTiktokIcon,
  StyledTwitterIcon,
} from "@/components/StyledSVG";
import GooglePodcastBanner from "/public/google-podcast-banner.png";
import SpotifyBanner from "/public/spotify-banner.png";
import YoutubeBanner from "/public/youtube-banner.png";
import AppleStoreIcon from "/public/apple-store-icon.png";
import GooglePlayIcon from "/public/google-play-icon.png";
import { SocialListProps } from "@/types/types";

const Footer = () => {
  const FooterLinks = [
    "About",
    "Episodes",
    "Testimonials",
    "Pricing",
    "Features",
    "Blog",
  ];

  const SocialList: SocialListProps[] = [
    {
      link: "https://twitter.com",
      item: <StyledTwitterIcon />,
    },
    {
      link: "https://instagram.com",
      item: <StyledInstagramIcon />,
    },
    {
      link: "https://tiktok.com",
      item: <StyledTiktokIcon />,
    },
  ];

  return (
    <footer className="pt-[140px] pb-20 container bg flex flex-col gap-32 justify-between">
      <div className="flex justify-between">
        <div className="flex flex-col gap-10 max-w-[250px]">
          <div className="flex gap-6 items-baseline">
            <Link href="/">
              <StyledLogo />
            </Link>
            <p className="text-xs text-destructive">©2024</p>
          </div>
          <p className="text-sm text-destructive">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="flex gap-6">
            {SocialList.map((socialItem) => (
              <Link
                className="w-6 h-6 flex justify-center items-center"
                href={socialItem.link}
              >
                {socialItem.item}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-y-5 gap-x-24 font-medium grid-cols-2 h-fit">
          {FooterLinks.map((link) => (
            <Link
              className="self-start hover:text-primary transition-colors duration-300 ease-in-out"
              href="#"
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-[60px]">
          <div className="flex flex-col gap-5">
            <p className="font-medium text-destructive">
              Listen episodes on your fav platform:
            </p>
            <div className="flex gap-10">
              <Link
                href="#"
                className="hover:scale-90 transition-transform duration-300 ease-in-out"
              >
                <Image
                  width={120}
                  height={22}
                  src={GooglePodcastBanner}
                  alt="Google Podcasts"
                />
              </Link>
              <Link
                href="#"
                className="hover:scale-90 transition-transform duration-300 ease-in-out"
              >
                <Image
                  width={80}
                  height={22}
                  src={SpotifyBanner}
                  alt="Spotify"
                />
              </Link>
              <Link
                href="#"
                className="hover:scale-90 transition-transform duration-300 ease-in-out"
              >
                <Image
                  width={90}
                  height={22}
                  src={YoutubeBanner}
                  alt="Youtube"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-medium text-destructive">App available on:</p>
            <div className="flex gap-5">
              <Link
                href="#"
                className="hover:scale-90 transition-transform duration-300 ease-in-out"
              >
                <Image
                  src={AppleStoreIcon}
                  width={36}
                  height={36}
                  alt="Apple Store"
                />
              </Link>
              <Link
                href="#"
                className="hover:scale-90 transition-transform duration-300 ease-in-out"
              >
                <Image
                  src={GooglePlayIcon}
                  width={36}
                  height={36}
                  alt="Google Play"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-destructive pt-5 text-xs text-destructive font-medium">
        <div className="flex justify-between">
          <p>
            ©2024. All Rights Reserved.{" "}
            <span className="text-primary">Pod of Cast</span>
          </p>
          <div className="flex gap-[10px]">
            <Link className="hover:text-primary transition-colors duration-300 ease-in-out" href="#">
              Terms
            </Link>
            •
            <Link className="hover:text-primary transition-colors duration-300 ease-in-out" href="#">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
