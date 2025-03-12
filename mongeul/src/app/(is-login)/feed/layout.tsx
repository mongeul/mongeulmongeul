import ParellelLayout from "@/components/layout/ParellelLayout";
import { ReactNode } from "react";

export default function Layout({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  // eslint-disable-next-line react/no-children-prop
  return <ParellelLayout children={children} detail={detail} />;
}
