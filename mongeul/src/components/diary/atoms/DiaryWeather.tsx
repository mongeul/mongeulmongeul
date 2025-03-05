"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import WeatherIcon from "@/components/common/atoms/WeatherIcon";

const DiaryWeather: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  if (!selectedDiary || !selectedDiary.weather) return null;

  const { icon } = WeatherIcon({
    weather: selectedDiary.weather,
  });

  return <div className="w-6 h-6">{icon}</div>;
};

export default DiaryWeather;
