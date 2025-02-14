import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayoutProps({ children }: DefaultLayoutProps) {
  return <div className="flex w-full justify-center">{children}</div>;
}
