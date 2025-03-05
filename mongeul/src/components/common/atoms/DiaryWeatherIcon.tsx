import WeatherIcon from "@/components/common/atoms/WeatherIcon";
import { Weather } from "@/types/diaryTypes";

interface DiaryWeatherIconProps {
  weather: Weather;
}

export default function DiaryWeatherIcon({ weather }: DiaryWeatherIconProps) {
  const { icon } = WeatherIcon({ weather, size: "h-4 w-4" });

  return icon;
}
