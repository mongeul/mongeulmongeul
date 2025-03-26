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

  // 🔒 LOCK
  if (selectedDiary === "LOCK") {
    return (
      <div className="">
        <Card height="min-h-[200px]">
          <div className="flex flex-col items-start w-full p-4">
            <p className="text-gray-600 mb-4 text-base">
              🔒 일기가 잠겨있습니다.
            </p>
            <Button text="일기 보기" onClick={handleClick} />
          </div>
        </Card>
      </div>
    );
  }

  // 📖 일반 공개 일기
  if (!selectedDiary) return null;

  return (
    <div className="">
      <Card height="min-h-[200px]">
        <div className="flex flex-row">
          <div className="flex flex-col items-start justify-center w-full p-4">
            <DiaryHeader />
            <DiaryTitle />
            <DiaryImage />
            <DiaryContent />
            <Button text="자세히 보기" onClick={handleClick} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DiaryPriview;
