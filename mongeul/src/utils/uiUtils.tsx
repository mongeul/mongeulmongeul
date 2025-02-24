import RoundIcon from "@/components/common/atoms/RoundIcon";
import PublicIcon from "@/assets/icons/public.svg";
import UnlockedIcon from "@/assets/icons/unlocked.svg";
import LockedIcon from "@/assets/icons/locked.svg";
import HappyIcon from "@/assets/icons/happy.svg";
import FeelingsIcon from "@/assets/icons/feelings.svg";
import WeatherIcon from "@/assets/icons/weather.svg";
import { Weather } from "@/types/diaryTypes";
import { Feelings } from "@/types/diaryTypes";
import { PrivateStatus } from "@/types/diaryTypes";

export function getPrivateStatusIcon(privateStatus: PrivateStatus) {
  switch (privateStatus) {
    case "PUBLIC":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-600">
            <PublicIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "전체 공개",
      };

    case "PRIVATE":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-500">
            <UnlockedIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "나만 보기",
      };

    case "LOCK":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-zinc-300">
            <LockedIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "잠금 일기",
      };

    default:
      return {
        icon: (
          <RoundIcon backgroundColor="bg-zinc-300">
            <PublicIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "전체 공개",
      };
  }
}

export function getFeelingsIcon(feelings: Feelings) {
  switch (feelings) {
    case "HAPPY":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-400">
            <HappyIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "행복",
      };

    case "SOSO":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-300">
            <HappyIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "쏘쏘",
      };

    case "SAD":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-200">
            <HappyIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "슬픔",
      };

    default:
      return {
        icon: (
          <RoundIcon backgroundColor="bg-zinc-300">
            <FeelingsIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "기분 없음",
      };
  }
}

export function getWeatherIcon(weather: Weather) {
  switch (weather) {
    case "SUNNY":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-200">
            <WeatherIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "맑음",
      };

    case "CLOUDY":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-300">
            <WeatherIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "흐림",
      };

    case "RAINY":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-400">
            <WeatherIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "비",
      };

    default:
      return {
        icon: (
          <RoundIcon backgroundColor="bg-zinc-300">
            <WeatherIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "날씨 없음",
      };
  }
}
