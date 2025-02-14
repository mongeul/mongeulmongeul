import { ReactNode } from "react";
import DefaultLayout from "./DefaultLayout";

interface ParellelLayoutProps {
  children: ReactNode;
  detail: ReactNode;
}

export default function ParellelLayoutProps({
  children,
  detail,
}: ParellelLayoutProps) {
  // TODO 모바일 반응형 children / detail 하나만 보이기, 헤더 뒤로가기 추가
  return (
    <div className="flex gap-4 w-full justify-center">
      <div className="w-full md:w-1/2">
        <DefaultLayout>{children}</DefaultLayout>
      </div>
      <div className="w-full md:w-1/2">
        <DefaultLayout>{detail}</DefaultLayout>
      </div>
    </div>
  );
}
