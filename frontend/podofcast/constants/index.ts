import GooglePodcastBanner from "/public/google-podcast-banner.png";
import SpotifyBanner from "/public/spotify-banner.png";
import YoutubeBanner from "/public/youtube-banner.png";
import AppleStoreIcon from "/public/apple-store-icon.png";
import GooglePlayIcon from "/public/google-play-icon.png";
import { LinkProps, PlatformProps } from "@/types";

export const HeaderLinks: LinkProps[] = [
  {
    "link": "#",
    "name": "Podcasts",
  },
  {
    "link": "#",
    "name": "About",
  },
  {
    "link": "#",
    "name": "Blogs",
  },
];

export const FooterLinks: LinkProps[] = [
  {
    "link": "#",
    "name": "About",
  },
  {
    "link": "#",
    "name": "Episodes",
  },
  {
    "link": "#",
    "name": "Testimonials",
  },
  {
    "link": "#",
    "name": "Pricing",
  },
  {
    "link": "#",
    "name": "Features",
  },
  {
    "link": "#",
    "name": "Blog",
  },
];

export const PlatformFooterList: PlatformProps[] = [
  {
    link: "#",
    name: "Google Podcasts",
    src: GooglePodcastBanner,
  },
  {
    link: "#",
    name: "Spotify",
    src: SpotifyBanner,
  },
  {
    link: "#",
    name: "Youtube",
    src: YoutubeBanner,
  },
];

export const PlayMarketFooterList: PlatformProps[] = [
  {
    link: "#",
    name: "Apple Store",
    src: AppleStoreIcon,
  },
  {
    link: "#",
    name: "Google Play",
    src: GooglePlayIcon,
  },
]

