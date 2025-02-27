"use client";

import { useMemo } from "react";
import RoundIcon from "@/components/common/atoms/RoundIcon";
import HappyIcon from "@/assets/icons/happy.svg";
import FeelIcon from "@/assets/icons/feel.svg";
import { Feeling } from "@/types/diaryTypes";

interface FeelingsIconProps {
  feeling: Feeling;
  size?: string;
}

export default function FeelingsIcon({
  feeling,
  size = "w-9 h-9",
}: FeelingsIconProps) {
  const status = useMemo(() => {
    switch (feeling) {
      case "HAPPY":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-400">
              <HappyIcon className={`text-white ${size}`} />
            </RoundIcon>
          ),
          label: "행복",
        };
      case "SOSO":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-300">
              <HappyIcon className={`text-white ${size}`} />
            </RoundIcon>
          ),
          label: "쏘쏘",
        };
      case "SAD":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-200">
              <HappyIcon className={`text-white ${size}`} />
            </RoundIcon>
          ),
          label: "슬픔",
        };
      default:
        return {
          icon: (
            <RoundIcon backgroundColor="bg-zinc-300">
              <FeelIcon className={`text-white ${size}`} />
            </RoundIcon>
          ),
          label: "기분 없음",
        };
    }
  }, [feeling, size]);

  return status;
}
