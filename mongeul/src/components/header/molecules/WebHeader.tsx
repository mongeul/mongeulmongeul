"use client";

import Link from "next/link";
import NotificationButton from "../atoms/NotificationButton";
import Logo from "@/assets/images/text_logo.png";
import Image from "next/image";

export default function WebHeader() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-3/4 flex justify-between">
        <Link href="/">
          <Image src={Logo} alt="mongeulmongeul" className="h-12 w-12" />
        </Link>
        <NotificationButton />
      </div>
    </div>
  );
}
