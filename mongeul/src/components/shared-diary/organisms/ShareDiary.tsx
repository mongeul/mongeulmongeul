"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import Card from "@/components/common/atoms/Card";
import ShareDiaryDetailHeader from "../molecules/ShareDiaryDetailHeader";
import ShareDiaryTitle from "../atoms/ShareDiaryTitle";
import ShareDiaryContent from "../atoms/ShareDiaryContent";
import ShareDiaryImage from "../atoms/ShareDiaryImage";
import ShareDiaryControlButtons from "../molecules/ShareDiaryControlButtons";

const Diary: React.FC = () => {
  const { selectedSharedDiary } = useSelector(
    (state: RootState) => state.calendar
  );
  console.log("현재 공유 일기 상태:", selectedSharedDiary);

  return (
    <div>
      {selectedSharedDiary ? (
        <div>
          <Card height="min-h-[200px] lg:min-h-[450px]">
            <div className="flex flex-col items-start w-full p-4">
              <ShareDiaryDetailHeader />
              <ShareDiaryTitle />
              <ShareDiaryImage />
              <ShareDiaryContent />
            </div>
          </Card>
          <ShareDiaryControlButtons />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Diary;
