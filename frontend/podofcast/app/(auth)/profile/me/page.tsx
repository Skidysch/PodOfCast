"use client";

import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";
import avatarPlaceholder from "@/public/avatar-placeholder.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  StyledInstagramIcon,
  StyledTiktokIcon,
  StyledTwitterIcon,
} from "@/components/StyledSVG";
import { useRedirectIfNotAuthenticated } from "@/hooks/useRedirect";
import { SocialListProps } from "@/types";
import { formatRelativeDateTime } from "@/lib/utils";

const page = () => {
  useRedirectIfNotAuthenticated();
  const { user } = useAuthStore();
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
    <div className="container grid grid-cols-12 grid-rows-3 gap-5">
      <div className="p-8 bg-profile-header-gradient col-span-full rounded-2xl flex justify-between items-end">
        <div className="flex flex-col">
          <div className="w-[120px] h-[120px] overflow-hidden rounded-full border-2 border-background flex items-center justify-center">
            <Image
              width={120}
              height={120}
              src={user?.profile_images?.[1]?.url || avatarPlaceholder}
              alt="Avatar image"
              className="object-cover object-center"
            />
          </div>
          <div className="mt-4 flex gap-5 items-center">
            <h3 className="font-bold text-4xl">
              {user?.first_name} {user?.last_name}
            </h3>
            <Button className="button button--small">CHANGE</Button>
          </div>
          <ul className="flex gap-4 mt-1">
            {SocialList.map((socialItem) => (
              <Link
                className="w-6 h-6 flex justify-center items-center"
                href={socialItem.link}
              >
                {socialItem.item}
              </Link>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-[auto, auto] grid-rows-4 gap-x-6 grid-flow-col">
          <p className="text-sm font-medium text-desctruction">Email</p>
          <p className="text-sm font-medium text-desctruction">Date of Birth</p>
          <p className="text-sm font-medium text-desctruction">
            Podofcaster since
          </p>
          <p className="text-sm font-medium text-desctruction">Absent since</p>
          <p className="font-bold text-sm text-primary">{user?.email}</p>
          <p className="font-bold text-sm text-primary">
            {user?.date_of_birth
              ? formatRelativeDateTime(user?.date_of_birth)
              : "Not set"}
          </p>
          <p className="font-bold text-sm text-primary">
            {user?.date_joined
              ? formatRelativeDateTime(user?.date_joined)
              : "Not set"}
          </p>
          <p className="font-bold text-sm text-primary">
            {user?.last_visit
              ? formatRelativeDateTime(user?.last_visit)
              : "Not set"}
          </p>
        </div>
        <Button className="button button--alert">DELETE USER</Button>
      </div>
      <div className="p-5 col-span-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl flex flex-col gap-3">
        <div className="flex justify-between">
          <h4 className="font-bold text-2xl">Bio</h4>
          <Button className="button button--small">CHANGE</Button>
        </div>
        <p className="font-medium text-sm text-destruction">
          {user?.bio || "Write some info about you there"}
        </p>
      </div>
      <div className="p-8 col-span-8 row-span-2 bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl">
        Dashboard goes here
      </div>
      <div className="p-5 col-span-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl">
        <div className="flex justify-between">
          <h4 className="font-bold text-2xl">Notifications</h4>
        </div>
      </div>
    </div>
  );
};

export default page;
