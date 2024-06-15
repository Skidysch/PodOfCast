"use client";

import Link from "next/link";
import { StyledLogo } from "./StyledSVG";
import { Button } from "./ui/button";
import { HeaderLinks } from "@/constants";

const Header = () => {
  return (
    <header className="fixed z-50 pt-6 bg-background rounded-bl-3xl rounded-br-3xl container mx-auto flex justify-between">
      <Link href="/">
        <StyledLogo />
      </Link>
      <ul className="flex gap-[60px] items-center leading-[1.6] font-bold">
        {HeaderLinks.map(item => (
          <Link
          href={item.link}
          className="hover:text-primary transition-colors duration-300 ease-in-out"
        >
          <li>{item.name}</li>
        </Link>
        ))}
      </ul>
      <div className="flex gap-5 items-center">
        <Button variant="outline" className="button--light" asChild>
          <Link href="#">RECENT EPISODES</Link>
        </Button>
        <Button className="button" asChild>
          <Link href="/sign-in">SIGN IN</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;