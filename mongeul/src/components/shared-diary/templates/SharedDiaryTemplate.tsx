"use client";

import Calendar from "@/components/calendar/organisms/Calendar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, useParams } from "next/navigation";
import {
  setSelectedDate,
  setSelectedDiary,
  setSharedDiaryEntries,
} from "@/store/calendarSlice";
import { setDate } from "@/store/diarySlice";
import { getSharedDiaryDates } from "@/lib/api/shared-diary";

export default function SharedDiaryTemplate() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedDate, currentMonth, selectedDiary } = useSelector(
    (state: RootState) => state.calendar
  );

  const sharedDiaryEntries = useSelector(
    (state: RootState) => state.shareDiary.sharedDiaryEntries
  );

  const [currentDiaryId, setCurrentDiaryId] = useState<number | null>(null);

  useEffect(() => {
    console.log("현재 선택된 월:", currentMonth);

    const fetchDiaryData = async () => {
      const diaries = await getSharedDiaryDates(
        Number(id),
        currentMonth.year,
        currentMonth.month
      );
      console.log("일기데이터", diaries);
      // dispatch(
      //   setSharedDiaryEntries(
      //     diaries.map((diary) => ({
      //       date: diary.date,
      //       diaryId: diary.diaryId,
      //       privateStatus: diary.privateStatus,
      //     }))
      //   )
      // );
    };

    fetchDiaryData();
  }, [currentMonth, dispatch]);

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
