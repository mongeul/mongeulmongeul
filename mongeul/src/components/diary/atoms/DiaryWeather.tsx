"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import WeatherIcon from "@/components/common/atoms/WeatherIcon";

const DiaryWeather: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  if (selectedDiary === "LOCK" || !selectedDiary?.weather) return null;

  return (
    <div className="w-6 h-6">
      <WeatherIcon weather={selectedDiary.weather} size="w-6 h-6" />
    </div>
  );
};

export default DiaryWeather;
