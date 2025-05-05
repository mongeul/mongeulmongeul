"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DiaryDetailContainer from "@/components/common/organisms/DiaryDetailContainer";
import { SharedDiary } from "@/lib/api/shared-diary";
import { Diary } from "@/types/diaryTypes";
import ShareDiaryControlButtons from "../molecules/ShareDiaryControlButtons";

const ShareDiaryDetail: React.FC = () => {
  const selectedSharedDiary = useSelector(
    (state: RootState) => state.calendar.selectedSharedDiary
  );

  if (!selectedSharedDiary) return null;

  const diary = {
    ...selectedSharedDiary,
    diaryId: selectedSharedDiary.shareDiaryId,
    privateStatus: "PUBLIC",
  };

  return (
    <div className="w-full">
      <DiaryDetailContainer diary={diary as Diary} />
      <ShareDiaryControlButtons />
    </div>
  );
};
export default ShareDiaryDetail;
