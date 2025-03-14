"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DiaryHeader from "../molecules/DiaryHeader";
import DiaryTitle from "../atoms/DiaryTitle";
import DiaryImage from "../atoms/DiaryImage";
import DiaryContent from "../atoms/DiaryContent";
import Card from "@/components/common/atoms/Card";

const Diary: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  return (
    <div>
      {selectedDiary ? (
        <Card height="min-h-[200px] lg:min-h-[450px]">
          <div className="flex flex-col items-start w-full p-4">
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
