"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ParellelLayout({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  const pathname = usePathname();

  // 병렬 경로(@detail)에 diaryId가 있을 때만 2열 구성
  const isDetailPage = pathname.includes("@detail/");

  if (!isDetailPage) {
    // 기본 진입: 센터에 children만
    return <>{children}</>;
  }

  // 상세 페이지 진입: 좌측 캘린더 + 우측 상세
  return (
    <div className="w-full flex flex-row gap-4 justify-center items-start max-w-7xl mx-auto px-4">
      <div className="flex-1">{children}</div>
      <div className="w-[500px] shrink-0">{detail}</div>
    </div>
  );
}
