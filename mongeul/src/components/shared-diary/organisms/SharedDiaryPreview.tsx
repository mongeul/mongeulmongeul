"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ShareDiaryDetailHeader from "../molecules/ShareDiaryDetailHeader";
import Card from "@/components/common/atoms/Card";
import Button from "@/components/common/atoms/Button";
import { useRouter } from "next/navigation";
import ShareDiaryTitle from "../atoms/ShareDiaryTitle";
import ShareDiaryImage from "../atoms/ShareDiaryImage";
import ShareDiaryContent from "../atoms/ShareDiaryContent";

const SharedDiaryPreview: React.FC = () => {
  const router = useRouter();
  const { selectedSharedDiary } = useSelector(
    (state: RootState) => state.calendar
  );

  const handleClick = () => {
    if (selectedSharedDiary?.shareDiaryId) {
      router.push(`/shared-diary/${selectedSharedDiary.shareDiaryId}`);
    }
  };

  if (!selectedSharedDiary) return null;

  return (
    <div className="">
      <Card height="min-h-[200px]">
        <div className="flex flex-row">
          <div className="flex flex-col items-start justify-center w-full p-4">
            <ShareDiaryDetailHeader />
            <ShareDiaryTitle />
            <ShareDiaryImage />
            <ShareDiaryContent />
            <Button text="자세히 보기" onClick={handleClick} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SharedDiaryPreview;
