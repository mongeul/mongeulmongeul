"use client";

import { useMemo } from "react";
import RoundIcon from "./RoundIcon";
import WeatherSvgIcon from "@/assets/icons/weather.svg";
import { Weather } from "@/types/diaryTypes";

interface WeatherIconProps {
  weather: Weather;
}

export default function WeatherIcon({ weather }: WeatherIconProps) {
  const status = useMemo(() => {
    switch (weather) {
      case "SUNNY":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-200">
              <WeatherSvgIcon className="text-white h-9 w-9" />
            </RoundIcon>
          ),
          label: "맑음",
        };
      case "CLOUDY":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-300">
              <WeatherSvgIcon className="text-white h-9 w-9" />
            </RoundIcon>
          ),
          label: "흐림",
        };
      case "RAINY":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-400">
              <WeatherSvgIcon className="text-white h-9 w-9" />
            </RoundIcon>
          ),
          label: "비",
        };
      default:
        return {
          icon: (
            <RoundIcon backgroundColor="bg-zinc-300">
              <WeatherSvgIcon className="text-white h-9 w-9" />
            </RoundIcon>
          ),
          label: "날씨 없음",
        };
    }
  }, [weather]);

  return status;
}
