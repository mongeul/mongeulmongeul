"use client";
import Calendar from "@/components/calendar/organisms/Calendar";
import { fetchDiaries, fetchMyDiary } from "@/lib/api/diary";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setSelectedDate,
  setSelectedDiary,
  setDiaryEntries,
  setLockedDiaryId,
} from "@/store/calendarSlice";
import { useRouter } from "next/navigation";
import { setDate } from "@/store/diarySlice";
import useIsMobile from "@/utils/useIsMobile";
import DiaryPriview from "../organisms/DiaryPreview";

export default function DiaryTemplate() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentMonth } = useSelector((state: RootState) => state.calendar);
  const { diaryEntries = [] } = useSelector(
    (state: RootState) => state.calendar
  );
  // const [currentDiaryId, setCurrentDiaryId] = useState<number | null>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    console.log("현재 선택된 월:", currentMonth);

    const fetchDiaryData = async () => {
      const diaries = await fetchDiaries(currentMonth.year, currentMonth.month);
      console.log("일기데이터", diaries);
      dispatch(
        setDiaryEntries(
          diaries.map((diary) => ({
            date: diary.date,
            diaryId: diary.diaryId,
            privateStatus: diary.privateStatus,
            feeling: diary.feeling,
            picture: diary.picture,
          }))
        )
      );
    };

    fetchDiaryData();
  }, [currentMonth, dispatch]);

  const handleDateSelect = async (date: string) => {
    const selectedDateStr = date;
    const todayStr = new Date().toISOString().split("T")[0];

    if (selectedDateStr > todayStr) {
      return;
    }

    console.log(`${date} 날짜 클릭됨 / API 요청 실행`);
    dispatch(setSelectedDate(date));

    const entry = diaryEntries.find((entry) => entry.date === date);
    if (!entry) {
      dispatch(setSelectedDiary(null));
      dispatch(setDate(date));
      router.push("/write-diary");
      return;
    }

    dispatch(setSelectedDiary(null));

    if (entry.privateStatus === "LOCK") {
      dispatch(setSelectedDiary("LOCK"));
      dispatch(setLockedDiaryId(entry.diaryId));
      if (!isMobile) {
        router.push(`/diary/${entry.diaryId}`);
      }
    } else {
      if (!isMobile) {
        router.push(`/diary/${entry.diaryId}`);
      } else {
        const diary = await fetchMyDiary(entry.diaryId);
        dispatch(setSelectedDiary(diary));
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-6">
      <Calendar onSelectDate={handleDateSelect} />
      {isMobile && <DiaryPriview />}
    </div>
  );
}
