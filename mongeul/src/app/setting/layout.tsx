import ParellelLayoutProps from "@/components/layout/ParellelLayout";
import { ReactNode } from "react";

export default function Layout({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  return (
    <ParellelLayoutProps children={children} detail={detail} />
    // <div className="flex gap-4 h-screen">
    //   <div className="w-full md:w-1/2">{children}</div>
    //   <div className="w-full md:w-1/2">{detail}</div>
    // </div>
  );
}
