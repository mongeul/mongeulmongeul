"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DiaryHeader from "../molecules/DiaryHeader";
import DiaryTitle from "../atoms/DiaryTitle";
import DiaryImage from "../atoms/DiaryImage";
import DiaryContent from "../atoms/DiaryContent";
import Card from "@/components/common/atoms/Card";
import { Diary as DiaryType } from "@/types/diaryTypes";

interface DiaryProps {
  diary?: DiaryType | null;
}

const Diary: React.FC<DiaryProps> = ({ diary }) => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  return (
    <div>
      {selectedDiary ? (
        <Card height="min-h-[200px] lg:min-h-[450px]">
          <div className="flex flex-col items-start w-full">
            <DiaryHeader />
            <DiaryTitle />
            <DiaryImage />
            <DiaryContent />
          </div>
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Diary;
