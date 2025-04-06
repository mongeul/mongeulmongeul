import Image from "next/image";
import Sunny from "@/assets/images/sunny.png";
import Cloudy from "@/assets/images/cloudy.png";
import Rainy from "@/assets/images/rainy.png";
import Snowy from "@/assets/images/Snowy.png";
import { Weather } from "@/types/diaryTypes";

interface WeatherIconProps {
  weather: Weather;
  size?: string;
}

const weatherIconMap: Record<Weather, { src: any; alt: string }> = {
  SUNNY: { src: Sunny, alt: "맑음" },
  CLOUDY: { src: Cloudy, alt: "흐림" },
  RAINY: { src: Rainy, alt: "비" },
  SNOWY: { src: Snowy, alt: "눈" },
};

export const weatherLabelMap: Record<Weather, string> = {
  SUNNY: "맑음",
  CLOUDY: "흐림",
  RAINY: "비",
  SNOWY: "눈",
};

export default function WeatherIcon({
  weather,
  size = "w-24 h-24",
}: WeatherIconProps) {
  const { src, alt } = weatherIconMap[weather] ?? weatherIconMap["SUNNY"];

  return (
    <div className={`relative ${size}`}>
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}
