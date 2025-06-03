"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getSharedDiaryDetail } from "@/lib/api/shared-diary";
import {
  setSelectedDiary,
  setSelectedSharedDiary,
} from "@/store/calendarSlice";
import useIsMobile from "@/hooks/useIsMobile";
import ShareDiary from "../organisms/ShareDiary";
import ShareDiaryDetail from "../organisms/ShareDiaryDetail";

export default function ShareDiaryDetailTemplate() {
  const { diaryId } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const selectedDiary = useSelector(
    (state: RootState) => state.calendar.selectedSharedDiary
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedDiary = async () => {
      try {
        const diary = await getSharedDiaryDetail(Number(diaryId));
        dispatch(setSelectedSharedDiary(diary));
      } catch (error) {
        console.error("공유일기 상세 조회 실패:", error);
        dispatch(setSelectedDiary(null));
      } finally {
        setLoading(false);
      }
    };

    if (diaryId) fetchSharedDiary();
  }, [diaryId, dispatch]);

  if (loading) return <div className="text-center mt-10">로딩 중...</div>;

  return isMobile ? (
    <div className="w-full flex flex-col items-center">
      <ShareDiaryDetail />
    </div>
  ) : (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="flex-1">
        <ShareDiary />
      </div>
    </div>
  );
}
