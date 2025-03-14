"use client"; // 🚀 클라이언트 컴포넌트로 변경

import { useParams } from "next/navigation";
import DiaryDetailTemplate from "@/components/diary/templates/DiaryDetailTemplate";

export default function Page() {
  const { id } = useParams();
  console.log("📌 Diary Detail Page - ID:", id); // ✅ 로그 확인

  return <DiaryDetailTemplate />;
}
