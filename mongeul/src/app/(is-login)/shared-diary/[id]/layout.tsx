// import ParellelLayout from "@/components/layout/ParellelLayout";
// import { ReactNode } from "react";

// export default function Layout({
//   children,
//   detail,
// }: {
//   children: ReactNode;
//   detail: ReactNode;
// }) {
//   return <ParellelLayout detail={detail}>{children}</ParellelLayout>;
// }
"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import ParellelLayout from "@/components/layout/ParellelLayout";

export default function Layout({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  const pathname = usePathname();

  // 병렬 경로(@detail)에 diaryId가 있을 때만 2열 구성
  const isDetailPage = /^\/shared-diary\/\d+\/\d+$/.test(pathname);

  if (!isDetailPage) {
    // 기본 진입: 센터에 children만
    return <>{children}</>;
  }

  // 상세 페이지 진입: 좌측 캘린더 + 우측 상세
  return <ParellelLayout detail={detail}>{children}</ParellelLayout>;
}
