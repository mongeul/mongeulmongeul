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
  const { selectedDate, currentMonth } = useSelector(
    (state: RootState) => state.calendar
  );

  useEffect(() => {
    const fetchDiaryData = async () => {
      const formattedDate = `${currentMonth.year}-${String(
        currentMonth.month
      ).padStart(2, "0")}`;
      const diaries = await fetchDiaries(formattedDate);
      dispatch(setDiaryDates(diaries.map((diary) => diary.date)));
    };

    fetchDiaryData();
  }, [currentMonth, dispatch]);

  const handleDateSelect = (date: string) => {
    console.log(`${date} 날짜 클릭됨 / API 요청 실행`);

    fetchDiaries(date).then((diaries) => {
      if (diaries.length > 0) {
        dispatch(setSelectedDiary(diaries[0]));
      } else {
        dispatch(setSelectedDiary(null));
      }
    });

    dispatch(setSelectedDate(date));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <div className="flex w-full lg:w-1/2 justify-center lg:justify-start flex-grow">
        <Calendar />
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center p-4">
        <Diary />
      </div>
    </div>
  );
}
