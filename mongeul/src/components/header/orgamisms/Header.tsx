"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MobileHeader from "../molecules/MobileHeader";
import WebHeader from "../molecules/WebHeader";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const alwaysShowWebHeader = ["/diary", "/feed", "/setting", "/shared-diary"];
  const shouldShowWebHeader = alwaysShowWebHeader.includes(pathname);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-3/4 flex justify-between p-4">
        {shouldShowWebHeader || !isMobile ? <WebHeader /> : <MobileHeader />}
      </div>
    </div>
  );
}
