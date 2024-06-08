"use client";

import Link from "next/link";
import { StyledLogo } from "./StyledSVG";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="fixed top-6 container mx-auto flex justify-between">
      <Link href="/">
        <StyledLogo />
      </Link>
      <ul className="flex gap-[60px] items-center leading-[1.6] font-bold">
        <Link
          href="#"
          className="hover:text-primary transition-colors duration-300 ease-in-out"
        >
          <li>Podcasts</li>
        </Link>
        <Link
          href="#"
          className="hover:text-primary transition-colors duration-300 ease-in-out"
        >
          <li>About</li>
        </Link>
        <Link
          href="#"
          className="hover:text-primary transition-colors duration-300 ease-in-out"
        >
          <li>Blogs</li>
        </Link>
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
