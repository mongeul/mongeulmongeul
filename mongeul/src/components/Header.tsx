"use client";

import Link from "next/link";
import NotificationIcon from "@/assets/icons/notification.svg";

export default function Header() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-3/4 flex justify-between p-4">
        <Link href="/">몽글몽글</Link>
        <Link href="/notification">
          <NotificationIcon
            className="w-6 h-6 text-zinc-400"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  );
}
