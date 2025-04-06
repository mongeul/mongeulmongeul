"use client";

import Link from "next/link";
import NotificationIcon from "@/assets/icons/notification.svg";

export default function BackButton() {
  return (
    <Link href="/notification" className="flex justify-center items-center">
      <NotificationIcon
        className="w-6 h-6 text-zinc-400 flex justify-center items-center"
        width={24}
        height={24}
      />
    </Link>
  );
}
