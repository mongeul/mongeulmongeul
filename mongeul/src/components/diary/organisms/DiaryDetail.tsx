"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DiaryDetailContainer from "@/components/common/organisms/DiaryDetailContainer";
import { Diary } from "@/types/diaryTypes";
import DiaryControlButtons from "../molecules/DiaryControlButtons";

const DiaryDetail: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  const diaryData = selectedDiary === "LOCK" ? null : (selectedDiary as Diary);
  return (
    <div className="w-full">
      {diaryData ? <DiaryDetailContainer diary={diaryData} /> : <div></div>}
      <DiaryControlButtons />
    </div>
  );
};

export default DiaryDetail;
