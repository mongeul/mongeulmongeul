"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DefaultLayout from "./DefaultLayout";
import { motion, AnimatePresence } from "framer-motion";

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
  const isBaseRoute = showChildrenFirstRoutes.some(
    (route) => pathname === route
  );

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
    <div className="flex w-full justify-center overflow-hidden">
      {isBaseRoute ? (
        <div className="flex justify-center w-full lg:w-1/2">
          <DefaultLayout>{children}</DefaultLayout>
        </div>
      ) : !isMobile ? (
        <AnimatePresence mode="sync">
          {/* 새로운 화면 */}
          <div className="flex justify-center w-full lg:w-1/2">
            <DefaultLayout>{children}</DefaultLayout>
          </div>

          {/* 새로운 화면 */}
          <motion.div
            key={`${pathname}-detail`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex justify-center w-full lg:w-1/2"
          >
            <DefaultLayout>{detail}</DefaultLayout>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="flex justify-center w-full">
          <DefaultLayout>
            {shouldShowChildrenFirst ? children : detail}
          </DefaultLayout>
        </div>
      )}
    </div>
  );
}
