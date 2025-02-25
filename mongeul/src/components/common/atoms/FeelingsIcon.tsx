"use client";

import { useMemo } from "react";
import RoundIcon from "@/components/common/atoms/RoundIcon";
import HappyIcon from "@/assets/icons/happy.svg";
import FeelingIcon from "@/assets/icons/feeling.svg";
import { Feelings } from "@/types/diaryTypes";

interface FeelingsIconProps {
  feelings: Feelings;
}

export default function FeelingsIcon({ feelings }: FeelingsIconProps) {
  const status = useMemo(() => {
    switch (feelings) {
      case "HAPPY":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-400">
              <HappyIcon className="text-white w-9 h-9" />
            </RoundIcon>
          ),
          label: "행복",
        };
      case "SOSO":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-300">
              <HappyIcon className="text-white w-9 h-9" />
            </RoundIcon>
          ),
          label: "쏘쏘",
        };
      case "SAD":
        return {
          icon: (
            <RoundIcon backgroundColor="bg-theme-200">
              <HappyIcon className="text-white w-9 h-9" />
            </RoundIcon>
          ),
          label: "슬픔",
        };
      default:
        return {
          icon: (
            <RoundIcon backgroundColor="bg-zinc-300">
              <FeelingIcon className="text-white w-9 h-9" />
            </RoundIcon>
          ),
          label: "기분 없음",
        };
    }
  }, [feelings]);

  return status;
}
