"use client";

import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { RootState } from "@/store/store";
import { Feeling } from "@/types/diaryTypes";
import { useSelector } from "react-redux";

const ShareDiaryFeeling: React.FC = () => {
  const { selectedSharedDiary } = useSelector(
    (state: RootState) => state.calendar
  );

  if (!selectedSharedDiary) return null;

  const { feeling } = selectedSharedDiary;

  return (
    <div className="flex items-center space-x-2">
      <FeelingsIcon feeling={feeling as Feeling} size="w-10 h-10" />
    </div>
  );
};

export default ShareDiaryFeeling;
