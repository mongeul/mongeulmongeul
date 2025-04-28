"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import Card from "@/components/common/atoms/Card";
import Spinner from "@/components/common/atoms/Spinner";
import { useState } from "react";

const ShareDiaryImage: React.FC = () => {
  const { selectedSharedDiary } = useSelector(
    (state: RootState) => state.calendar
  );
  const [isLoading, setIsLoading] = useState(true);

  if (!selectedSharedDiary || !selectedSharedDiary.picture) return null;

  return (
    <Card width="w-full" className="relative">
      <div className="relative w-full aspect-[192/125]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/50">
            <Spinner />
          </div>
        )}
        <Image
          src={selectedSharedDiary.picture}
          alt="공유일기 이미지"
          fill
          className="object-cover"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </Card>
  );
};

export default ShareDiaryImage;
