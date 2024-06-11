import { StaticImageData } from "next/image";
import { ReactElement } from "react";

export interface LinkProps {
  "link": string;
  "name": string;
}

export interface SocialListProps {
  "link": string;
  "item": ReactElement;
}

export interface PlatformProps {
  "link": string;
  "name": string;
  "src": StaticImageData;
}