"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DiaryHeader from "../molecules/DiaryHeader";
import DiaryTitle from "../atoms/DiaryTitle";
import DiaryImage from "../atoms/DiaryImage";
import DiaryContent from "../atoms/DiaryContent";
import Card from "@/components/common/atoms/Card";
import Button from "@/components/common/atoms/Button";
import { useRouter } from "next/navigation";

const DiaryPriview: React.FC = () => {
  const router = useRouter();
  const { selectedDiary, lockedDiaryId } = useSelector(
    (state: RootState) => state.calendar
  );

  const handleClick = () => {
    const diaryId =
      selectedDiary === "LOCK" ? lockedDiaryId : selectedDiary?.diaryId;

    if (diaryId) {
      router.push(`/diary/${diaryId}`);
    }
  };

  // 잠긴 일기
  if (selectedDiary === "LOCK") {
    return (
      <div>
        <Card height="min-h-[200px]">
          <div className="flex flex-col justify-center items-center w-full p-4">
            <p className="text-gray-600 mb-4 text-base">일기가 잠겨있습니다.</p>
            <Button text="일기 보기" onClick={handleClick} />
          </div>
        </Card>
      </div>
    );
  }

  // 일반 일기
  if (!selectedDiary) return null;

  return (
    <div>
      <Card className="p-4 min-h-[200px]">
        <div className="flex flex-col w-full gap-2 px-4">
          <div>
            <DiaryHeader />
            <DiaryTitle />
            <DiaryContent />
          </div>

          <div className="flex justify-center w-full">
            <Button text="자세히 보기" onClick={handleClick} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DiaryPriview;
