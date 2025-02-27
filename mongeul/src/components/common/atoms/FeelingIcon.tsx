"use client";

import { useMemo } from "react";
import RoundIcon from "@/components/common/atoms/RoundIcon";
import HappyIcon from "@/assets/icons/happy.svg";
import FeelingIcon from "@/assets/icons/feeling.svg";
import { Feeling } from "@/types/diaryTypes";

interface FeelingIconProps {
  feeling: Feeling;
  size?: string;
}

export default function FeelingIcon({
  feeling,
  size = "w-9 h-9",
}: FeelingIconProps) {
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
              <FeelingIcon className={`text-white ${size}`} />
            </RoundIcon>
          ),
          label: "기분 없음",
        };
    }
  }, [feeling, size]);

  return status;
}
