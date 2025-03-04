import ParellelLayout from "@/components/layout/ParellelLayout";
import { ReactNode } from "react";

export default function Layout({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  return <ParellelLayout children={children} detail={detail} />;
}
