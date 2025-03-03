"use client";
import Calendar from "@/components/calendar/organisms/Calendar";
import Diary from "@/components/diary/organisms/Diary";
import { fetchDiaries } from "@/lib/api/diary";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setSelectedDate,
  setSelectedDiary,
  setCurrentMonth,
  setDiaryDates,
} from "@/store/calendarSlice";

export default function Page() {
  const dispatch = useDispatch();
  const { selectedDate, currentMonth, selectedDiary } = useSelector(
    (state: RootState) => state.calendar
  );

  useEffect(() => {
    console.log("현재 선택된 월:", currentMonth);

    const fetchDiaryData = async () => {
      const diaries = await fetchDiaries(currentMonth.year, currentMonth.month);
      console.log("일기데이터", diaries);
      dispatch(setDiaryDates(diaries.map((diary) => diary.date)));
    };

    fetchDiaryData();
  }, [currentMonth, dispatch]);

  const handleDateSelect = (date: string) => {
    console.log(`${date} 날짜 클릭됨 / API 요청 실행`);

    // 연도와 월 추출
    const [year, month] = date.split("-").map(Number);

    fetchDiaries(year, month).then((diaries) => {
      if (diaries.length > 0) {
        dispatch(setSelectedDiary(diaries[0]));
      } else {
        dispatch(setSelectedDiary(null));
      }
    });

    dispatch(setSelectedDate(date));
  };

  return (
    <div className="flex flex-col xl:flex-row w-full gap-4 min-h-screen">
      <div className="flex-1 justify-center items-start">
        <Calendar onSelectDate={handleDateSelect} />
      </div>
      <div className="flex-1 justify-center items-start">
        {selectedDiary ? <Diary diary={selectedDiary} /> : <div></div>}
      </div>
    </div>
  );
}
