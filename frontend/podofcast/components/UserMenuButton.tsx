import { useLogout } from "@/api/reactQuery/authMutations";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

const UserMenuButton = () => {
  const { user } = useAuthStore();
  const { mutate } = useLogout();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div className="relative">
      <Button
        className="button min-w-[220px]"
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        {user?.first_name || user?.email}
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
            <Button
              variant="outline"
              className={`button button--light transition-transform duration-300 ease-in-out delay-50 ${
                isDropdownVisible ? "translate-x-0" : "translate-x-[200%]"
              }`}
              asChild
            >
              <Link href="/profile/me">Profile</Link>
            </Button>
          </li>
          <li>
            <Button
              variant="outline"
              className={`button button--light transition-transform duration-300 ease-in-out delay-100 ${
                isDropdownVisible ? "translate-x-0" : "translate-x-[200%]"
              }`}
              asChild
            >
              <Link href="#">RECENT EPISODES</Link>
            </Button>
          </li>
          <li>
            <Button
              variant="outline"
              className={`button button--light transition-transform duration-300 ease-in-out delay-150 ${
                isDropdownVisible ? "translate-x-0" : "translate-x-[200%]"
              }`}
              onClick={() => mutate()}
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenuButton;
