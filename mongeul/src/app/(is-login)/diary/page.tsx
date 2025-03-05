"use client";
import Calendar from "@/components/calendar/organisms/Calendar";
import Diary from "@/components/diary/organisms/Diary";
import { fetchDiaries, fetchMyDiary } from "@/lib/api/diary";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setSelectedDate,
  setSelectedDiary,
  setCurrentMonth,
  setDiaryEntries,
} from "@/store/calendarSlice";

export default function Page() {
  const dispatch = useDispatch();
  const { selectedDate, currentMonth, selectedDiary } = useSelector(
    (state: RootState) => state.calendar
  );
  const { diaryEntries = [] } = useSelector(
    (state: RootState) => state.calendar
  );
  const [currentDiaryId, setCurrentDiaryId] = useState<number | null>(null);

  useEffect(() => {
    console.log("현재 선택된 월:", currentMonth);

    const fetchDiaryData = async () => {
      const diaries = await fetchDiaries(currentMonth.year, currentMonth.month);
      // console.log("일기데이터", diaries);
      dispatch(
        setDiaryEntries(
          diaries.map((diary) => ({
            date: diary.date,
            diaryId: diary.diaryId,
            privateStatus: diary.privateStatus,
          }))
        )
      );
    };

    fetchDiaryData();
  }, [currentMonth, dispatch]);

  const handleDateSelect = async (date: string) => {
    console.log(`${date} 날짜 클릭됨 / API 요청 실행`);
    dispatch(setSelectedDate(date));

    const entry = diaryEntries.find((entry) => entry.date === date);
    if (!entry) {
      dispatch(setSelectedDiary(null));
      return;
    }

    // 잠긴 일기 일때
    if (entry.privateStatus === "LOCK") {
      dispatch(setSelectedDiary("LOCK"));
      setCurrentDiaryId(entry.diaryId);
    } else {
      const diary = await fetchMyDiary(entry.diaryId);
      dispatch(setSelectedDiary(diary));
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    if (!currentDiaryId) return;

    const diary = await fetchMyDiary(currentDiaryId, password);
    dispatch(setSelectedDiary(diary));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 min-h-screen">
      <div className="flex-1 justify-center items-start">
        <Calendar onSelectDate={handleDateSelect} />
      </div>
      <div className="flex-1 justify-center items-start">
        {/* {selectedDiary ? <Diary diary={selectedDiary} /> : <div></div>} */}
        <Diary onPasswordSubmit={handlePasswordSubmit} />
      </div>
    </div>
  );
}
