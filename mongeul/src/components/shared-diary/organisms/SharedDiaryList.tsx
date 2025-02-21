"use client";

import { useEffect, useState } from "react";
import SharedDiaryCard from "@/components/shared-diary/molecules/SharedDiaryCard";

interface DiaryData {
  nickname: string;
  writer: string;
  date: string;
  day: number;
  count: number;
}

export default function DiaryList() {
  const [diaries, setDiaries] = useState<DiaryData[]>([
    // 임시 데이터 추가
    { nickname: "승탁이", writer: "승탁이", date: "오늘", day: 98, count: 3 },
    { nickname: "호주니", writer: "승미니", date: "어제", day: 120, count: 5 },
    { nickname: "joy", writer: "승미니", date: "4일 전", day: 45, count: 2 },
  ]);
  const [loading, setLoading] = useState(false); // 임시 데이터라 로딩 X

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/v1/friend/list");
        const data = await response.json();
        if (data.success) {
          const formattedData = data.data.content.map((item: any) => ({
            nickname: item.nickname,
            writer: item.nickname,
            date: "오늘",
            day: item.day,
            count: item.count,
          }));
          setDiaries(formattedData);
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  */

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="flex flex-col gap-4 px-4">
      {diaries.map((diary, index) => (
        <SharedDiaryCard key={index} {...diary} />
      ))}
    </div>
  );
}
