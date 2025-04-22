"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import Card from "@/components/common/atoms/Card";
import Spinner from "@/components/common/atoms/Spinner";
import { useState } from "react";

const DiaryImage: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ 타입 가드로 "LOCK" 처리
  if (!selectedDiary || selectedDiary === "LOCK" || !selectedDiary.picture) {
    return null;
  }

  return (
    <Card width="w-full" className="relative">
      <div className="relative w-full aspect-[192/125]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/50">
            <Spinner />
          </div>
        )}
        <Image
          src={selectedDiary.picture}
          alt="일기 이미지"
          fill
          className="object-cover"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </Card>
  );
};

export default DiaryImage;
