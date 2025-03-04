"use client";

import Link from "next/link";
import NotificationButton from "../atoms/NotificationButton";

export default function WebHeader() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-3/4 flex justify-between">
        <Link href="/">몽글몽글</Link>
        <NotificationButton />
      </div>
    </div>
  );
}
