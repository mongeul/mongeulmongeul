"use client";
import Link from "next/link";
import WriteButton from "../atoms/WriteButton";
import DiaryIcon from "@/assets/icons/diary.svg";
import FeedIcon from "@/assets/icons/feed.svg";
import SharedDiaryIcon from "@/assets/icons/shared-diary.svg";
import SettingIcon from "@/assets/icons/setting.svg";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full bg-white flex justify-center">
      <div className="w-full md:w-2/3 lg:w-1/2 flex p-4 justify-around">
        <Link href="/feed">
          <FeedIcon
            className={`w-7 h-7 ${
              pathname === "/feed" ? "text-theme-300" : "text-gray-300"
            }`}
          />
        </Link>
        <Link href="/diary">
          <DiaryIcon
            className={`w-7 h-7 ${
              pathname === "/diary" ? "text-theme-300" : "text-gray-300"
            }`}
          />
        </Link>
        <WriteButton />
        <Link href="/shared-diary">
          <SharedDiaryIcon
            className={`w-7 h-7 ${
              pathname === "/shared-diary" ? "text-theme-300" : "text-gray-300"
            }`}
          />
        </Link>
        <Link href="/setting">
          <SettingIcon
            className={`w-7 h-7 ${
              pathname === "/setting" ? "text-theme-300" : "text-gray-300"
            }`}
          />
        </Link>
      </div>
    </div>
  );
}
