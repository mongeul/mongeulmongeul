"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import WeatherIcon from "@/components/common/atoms/WeatherIcon";
import { Weather } from "@/types/diaryTypes";

const ShareDiaryWeather: React.FC = () => {
  const { selectedSharedDiary } = useSelector(
    (state: RootState) => state.calendar
  );

  if (!selectedSharedDiary?.weather) return null;

  return (
    <div className="w-6 h-6">
      <WeatherIcon
        weather={selectedSharedDiary.weather as Weather}
        size="w-6 h-6"
      />
    </div>
  );
};

export default ShareDiaryWeather;
