"use client";

import { usePathname } from "next/navigation";
import DefaultNavBar from "../molecules/DefaultNavBar";
import WriteDiaryNavBar from "@/components/write-diary/molecules/WriteDiaryNavBar";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full bg-white flex justify-center">
      <div className="w-full md:w-2/3 lg:w-1/2 flex p-4 justify-around">
        {pathname === "/write-diary" ? <WriteDiaryNavBar /> : <DefaultNavBar />}
      </div>
    </div>
  );
}
