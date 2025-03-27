"use client";

import { useParams } from "next/navigation";
import DiaryDetailTemplate from "@/components/diary/templates/DiaryDetailTemplate";

export default function Page() {
  const { id } = useParams();

  return <DiaryDetailTemplate />;
}
