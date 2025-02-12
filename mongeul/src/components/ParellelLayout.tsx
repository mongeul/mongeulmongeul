import { ReactNode } from "react";

interface ParellelLayoutProps {
  children: ReactNode;
  detail: ReactNode;
}

export default function ParellelLayoutProps({
  children,
  detail,
}: ParellelLayoutProps) {
  return (
    <div className="flex gap-4 w-full justify-center">
      <div className="w-full md:w-1/2">{children}</div>
      <div className="w-full md:w-1/2">{detail}</div>
    </div>
  );
}
