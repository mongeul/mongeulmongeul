"use client";
import CalendarCard from "@/components/calendar/templat/CalendarCard";
import { fetchDiaries } from "@/lib/api/diary";
import { useEffect, useState } from "react";
import { Diary } from "@/types/diaryTypes";

export default function Page() {
  const [diaryDates, setDiaryDates] = useState<string[]>([]);
  const [selectedDiary, setSelectedDiary] = useState<Diary[] | null>(null);
  const [currentDate, setCurrentDate] = useState({ year: 2025, month: 2 });

  // 특정 월의 일기 데이터 가져오기
  useEffect(() => {
    const fetchDiaryData = async () => {
      const formattedDate = `${currentDate.year}-${String(
        currentDate.month
      ).padStart(2, "0")}`;
      const diaries: Diary[] = await fetchDiaries(formattedDate);

      // 날짜 배열만 저장 (예: ["2025-02-03", "2025-02-12"])
      setDiaryDates(diaries.map((diary) => diary.date));
    };

    fetchDiaryData();
  }, [currentDate]);

  const handleDateSelect = (date: string) => {
    console.log(`${date} 날짜 클릭됨 / API 요청 실행`);

    fetchDiaries(date).then((diaries) => {
      setSelectedDiary(diaries);
    });
  };

  return (
    <div>
      <CalendarCard
        diaryDates={diaryDates}
        onDateSelect={handleDateSelect}
        onMonthChange={setCurrentDate}
      />

      {/* selectedDiary가 null이 아닐 때만 렌더링 */}
      {selectedDiary && selectedDiary.length > 0 && (
        <div className="mt-4 p-4 border rounded-lg bg-white">
          <h2 className="text-lg font-bold">
            {selectedDiary[0]?.title || "제목 없음"}
          </h2>
          <p>{selectedDiary[0]?.content || "내용 없음"}</p>
        </div>
      )}
    </div>
  );
}
