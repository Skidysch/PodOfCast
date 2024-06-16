import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Burger from "@/components/Burger";
import { HeaderLinks } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import UserMenuButton from "@/components/UserMenuButton";
import { useLogout } from "@/lib/reactQuery/authMutations";

const MobileNav = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { mutate } = useLogout();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLogout = () => {
    setIsDropdownVisible(false);
    mutate();
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Burger />
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] gap-20 flex flex-col justify-center items-center">
        <ul className="flex flex-col gap-10 items-center leading-[1.6] font-bold">
          {HeaderLinks.map((item) => (
            <SheetClose asChild>
              <Link
                key={item.name}
                href={item.link}
                className="hover:text-primary transition-colors duration-300 ease-in-out"
              >
                <li>{item.name}</li>
              </Link>
            </SheetClose>
          ))}
        </ul>
        <div className="flex flex-col gap-5 items-center">
          {isAuthenticated ? (
            <div className="relative">
              <Button
                className="button"
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              >
                {user?.name || user?.email}
              </Button>
              <div
                className={`overflow-hidden w-full absolute right-0 top-16 p-5 bg-secondary rounded-lg transition-all duration-300 ease-in-out ${
                  isDropdownVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-full pointer-events-none"
                }`}
              >
                <ul className="flex flex-col gap-4 items-center">
                  <li>
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className={`button--light transition-transform duration-300 ease-in-out delay-50 ${
                          isDropdownVisible
                            ? "translate-x-0"
                            : "translate-x-[200%]"
                        }`}
                        onClick={() => setIsDropdownVisible(false)}
                        asChild
                      >
                        <Link href="/profile/me">Profile</Link>
                      </Button>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className={`button--light transition-transform duration-300 ease-in-out delay-100 ${
                          isDropdownVisible
                            ? "translate-x-0"
                            : "translate-x-[200%]"
                        }`}
                        onClick={() => setIsDropdownVisible(false)}
                        asChild
                      >
                        <Link href="#">RECENT EPISODES</Link>
                      </Button>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className={`button--light transition-transform duration-300 ease-in-out delay-150 ${
                          isDropdownVisible
                            ? "translate-x-0"
                            : "translate-x-[200%]"
                        }`}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </SheetClose>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <SheetClose asChild>
              <Button className="button" asChild>
                <Link href="/sign-in">SIGN IN</Link>
              </Button>
            </SheetClose>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
