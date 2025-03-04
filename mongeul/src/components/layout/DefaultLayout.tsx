import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div className="flex w-full md:w-3/4 justify-center">{children}</div>;
}
