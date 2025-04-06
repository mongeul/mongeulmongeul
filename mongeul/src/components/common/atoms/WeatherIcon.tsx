import Image from "next/image";
import Sunny from "@/assets/images/sunny.png";
import Cloudy from "@/assets/images/cloudy.png";
import Rainy from "@/assets/images/rainy.png";
import Snowy from "@/assets/images/Snowy.png";
import { Weather } from "@/types/diaryTypes";
import { useMemo } from "react";

interface WeatherIconProps {
  weather: Weather;
  size?: string;
}

export default function WeatherIcon({
  weather,
  size = "w-24 h-24",
}: WeatherIconProps) {
  const status = useMemo(() => {
    switch (weather) {
      case "SUNNY":
        return {
          icon: <Image src={Sunny} alt="맑음" className={size} />,
          label: "맑음",
        };
      case "CLOUDY":
        return {
          icon: <Image src={Cloudy} alt="흐림" className={size} />,
          label: "흐림",
        };
      case "RAINY":
        return {
          icon: <Image src={Rainy} alt="비" className={size} />,
          label: "비",
        };
      case "SNOWY":
        return {
          icon: <Image src={Snowy} alt="눈" className={size} />,
          label: "눈",
        };
      default:
        return {
          icon: <Image src={Sunny} alt="맑음" className={size} />,
          label: "날씨 없음",
        };
    }
  }, [weather, size]);

  return status;
}
