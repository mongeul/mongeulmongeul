"use client";

import Calendar from "@/components/calendar/organisms/Calendar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, useParams } from "next/navigation";
import { setSelectedDate, setSelectedDiary } from "@/store/calendarSlice";
import { setDate } from "@/store/diarySlice";
import { setSharedDiaryEntries } from "@/store/shareDiarySlice";
import { getSharedDiaryDates } from "@/lib/api/shared-diary";

export default function SharedDiaryTemplate() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();

  const selectedDate = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );
  const sharedDiaryEntries = useSelector(
    (state: RootState) => state.shareDiary.sharedDiaryEntries
  );

  const [currentDiaryId, setCurrentDiaryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDiaryData = async () => {
      if (!id) return;
      try {
        const diaryDates = await getSharedDiaryDates(
          Number(id),
          new Date().getFullYear(),
          new Date().getMonth() + 1
        );

        dispatch(
          setSharedDiaryEntries(
            diaryDates.map((date) => ({
              date: date,
              diaryId: 0,
              privateStatus: "PUBLIC", // 여기 뭔가 이상하니까 수정하기 ;;
            }))
          )
        );
      } catch (error) {
        console.error("❌ 공유일기 날짜 조회 실패:", error);
      }
    };

    fetchDiaryData();
  }, [id, dispatch]);

  const handleDateSelect = (date: string) => {
    dispatch(setSelectedDate(date));
    const entry = sharedDiaryEntries.find((entry) => entry.date === date);

    if (!entry) {
      dispatch(setSelectedDiary(null));
      dispatch(setDate(date));
      router.push(`/shared-diary/${id}/write`);
      return;
    }

    dispatch(setSelectedDiary(null));
    setCurrentDiaryId(entry.diaryId);
    router.push(`/shared-diary/${id}/diary/${entry.diaryId}`);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <Calendar onSelectDate={handleDateSelect} />
    </div>
  );
}
