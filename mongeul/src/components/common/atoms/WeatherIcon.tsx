"use client";

import { useMemo } from "react";
import RoundIcon from "./RoundIcon";
import WeatherSvgIcon from "@/assets/icons/weather.svg";
import { Weather } from "@/types/diaryTypes";

interface WeatherIconProps {
  weather: Weather;
  size?: string;
}

export default function WeatherIcon({
  weather,
  size = "w-9 h-9",
}: WeatherIconProps) {
  const status = useMemo(() => {
    switch (weather) {
      case "SUNNY":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-200">
              <WeatherSvgIcon className={`text-white ${size}`} />
            </RoundIcon>
          ),
          label: "맑음",
        };
      case "CLOUDY":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-300">
              <WeatherSvgIcon className={`text-white ${size}`} />
            </RoundIcon>
          ),
          label: "흐림",
        };
      case "RAINY":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-400">
              <WeatherSvgIcon className={`text-white ${size}`} />
            </RoundIcon>
          ),
          label: "비",
        };
      case "SNOWY":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-500">
              <WeatherSvgIcon className={`text-white ${size}`} />
            </RoundIcon>
          ),
          label: "눈",
        };
      default:
        return {
          icon: (
            <RoundIcon backgroundColor="bg-zinc-300">
              <WeatherSvgIcon className={`text-white ${size}`} />
            </RoundIcon>
          ),
          label: "날씨 없음",
        };
    }
  }, [weather, size]);

  return status;
}
