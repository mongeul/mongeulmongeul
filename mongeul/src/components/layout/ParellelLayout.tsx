"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DefaultLayout from "./DefaultLayout";

interface ParellelLayoutProps {
  children: ReactNode;
  detail: ReactNode;
}

export default function ParellelLayout({
  children,
  detail,
}: ParellelLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const showChildrenFirstRoutes = [
    "/diary",
    "/feed",
    "/setting",
    "/shared-diary",
  ];
  const shouldShowChildrenFirst = showChildrenFirstRoutes.includes(pathname);

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
    <div className="flex w-full justify-center gap-10">
      {!isMobile ? (
        <>
          <div className="w-full lg:w-1/2">
            <DefaultLayout>{children}</DefaultLayout>
          </div>
          <div className="w-full lg:w-1/2">
            <DefaultLayout>{detail}</DefaultLayout>
          </div>
        </>
      ) : (
        <div className="w-full">
          <DefaultLayout>
            {shouldShowChildrenFirst ? children : detail}
          </DefaultLayout>
        </div>
      )}
    </div>
  );
}
