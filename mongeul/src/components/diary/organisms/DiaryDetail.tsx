"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DiaryHeader from "../molecules/DiaryHeader";
import DiaryTitle from "../atoms/DiaryTitle";
import DiaryImage from "../atoms/DiaryImage";
import DiaryContent from "../atoms/DiaryContent";
import Card from "@/components/common/atoms/Card";
import DiaryDetailContainer from "@/components/common/organisms/DiaryDetailContainer";
import { Diary } from "@/types/diaryTypes";

const DiaryDetail: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  const diaryData = selectedDiary === "LOCK" ? null : (selectedDiary as Diary);
  return (
    <div>
      {diaryData ? <DiaryDetailContainer diary={diaryData} /> : <div></div>}
    </div>
  );
};

export default DiaryDetail;
