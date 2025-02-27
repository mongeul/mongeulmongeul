"use client";

import { useTheme } from "@/context/ThemeContext";
import Slider from "../atoms/Slider";

export default function FontSizeController() {
  const { fontSize, setFontSize } = useTheme();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
  };

  return (
    <div className="w-full flex pl-3 pr-2 items-center justify-between">
      <span className="text-[14px]">가</span>
      <div className="relative w-full mx-4">
        <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded-full transform -translate-y-1/2"></div>
        <Slider
          min={14}
          max={18}
          step={1}
          value={fontSize}
          onChange={onChange}
        />
      </div>
      <span className="text-[18px]">가</span>
    </div>
  );
}
