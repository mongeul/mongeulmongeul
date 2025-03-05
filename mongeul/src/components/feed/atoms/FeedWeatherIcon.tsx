import WeatherIcon from "@/components/common/atoms/WeatherIcon";
import { Weather } from "@/types/diaryTypes";

interface FeedWeatherIconProps {
  weather: Weather;
}

export default function FeedWeatherIcon({ weather }: FeedWeatherIconProps) {
  const { icon } = WeatherIcon({ weather, size: "h-4 w-4" });

  return icon;
}
