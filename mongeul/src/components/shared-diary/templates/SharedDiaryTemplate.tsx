"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, useParams } from "next/navigation";
import {
  setSelectedDate,
  setSelectedDiary,
  setSelectedSharedDiary,
  setSelectedFriendId,
} from "@/store/calendarSlice";
import { setSharedDiaryEntries } from "@/store/shareDiarySlice";
import { setDate } from "@/store/diarySlice";
import {
  getSharedDiaryDates,
  getSharedDiaryDetail,
} from "@/lib/api/shared-diary";
import useIsMobile from "@/utils/useIsMobile";
import ShareCalendar from "@/components/calendar/organisms/ShareCalendar";
import SharedDiaryPreview from "../organisms/SharedDiaryPreview";

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

  const isMobile = useIsMobile();

  const [currentDiaryId, setCurrentDiaryId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(setSelectedFriendId(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    console.log("현재 선택된 월:", currentMonth);

    const fetchDiaryData = async () => {
      const diaries = await getSharedDiaryDates(
        Number(id),
        currentMonth.year,
        currentMonth.month
      );
      console.log("일기데이터", diaries);
      dispatch(
        setSharedDiaryEntries(
          diaries.map((diary) => ({
            date: diary.date,
            diaryId: diary.shareDiaryId,
          }))
        )
      );
    };

    fetchDiaryData();
  }, [currentMonth, dispatch]);

  const handleDateSelect = async (date: string) => {
    dispatch(setSelectedDate(date));
    const entry = sharedDiaryEntries.find((entry) => entry.date === date);

    if (!entry) {
      dispatch(setSelectedDiary(null));
      dispatch(setDate(date));
      router.push(`/write-diary?groupid=${id}`);
      return;
    }
    if (!isMobile) {
      router.push(`/shared-diary/${id}/${entry.diaryId}`);
    } else {
      const diary = await getSharedDiaryDetail(entry.diaryId);
      dispatch(setSelectedSharedDiary(diary));
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <ShareCalendar onSelectDate={handleDateSelect} />
      {isMobile && <SharedDiaryPreview />}
    </div>
  );
}
