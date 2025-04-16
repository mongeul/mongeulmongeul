"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import WeatherIcon from "@/components/common/atoms/WeatherIcon";

const DiaryWeather: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  if (selectedDiary === "LOCK" || !selectedDiary?.weather) return null;

  return (
    <div>
      <WeatherIcon weather={selectedDiary.weather} size="w-10 h-10" />
    </div>
  );
};

export default DiaryWeather;
