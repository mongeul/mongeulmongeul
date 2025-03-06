"use client";

import { usePathname } from "next/navigation";
import DefaultNavBar from "../molecules/DefaultNavBar";
import WriteDiaryNavBar from "@/components/write-diary/molecules/WriteDiaryNavBar";
import PictureNavBar from "@/components/write-diary/molecules/PictureNavBar";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full bg-white flex justify-center">
      <div className="w-full md:w-2/3 lg:w-1/2 flex p-2 justify-around">
        {pathname === "/write-diary" ? (
          <WriteDiaryNavBar />
        ) : pathname === "/write-diary/picture" ? (
          <PictureNavBar />
        ) : (
          <DefaultNavBar />
        )}
      </div>
    </div>
  );
}
