"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DiaryHeader from "../molecules/DiaryHeader";
import DiaryTitle from "../atoms/DiaryTitle";
import DiaryImage from "../atoms/DiaryImage";
import DiaryContent from "../atoms/DiaryContent";

const Diary: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
      {selectedDiary ? (
        <>
          <DiaryHeader />
          <DiaryTitle />
          <DiaryImage />
          <DiaryContent />
        </>
      ) : (
        <div className="text-center text-gray-400">
          📭 선택한 날짜에 일기가 없습니다.
        </div>
      )}
    </div>
  );
};

export default Diary;
