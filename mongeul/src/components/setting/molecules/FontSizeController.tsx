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
      <span className="text-sm">가</span>
      <div className="relative w-full mx-4">
        <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded-full transform -translate-y-1/2"></div>
        <Slider
          min={12}
          max={20}
          step={2}
          value={fontSize}
          onChange={onChange}
        />
        <datalist id="font-sizes">
          <option value="12"></option>
          <option value="14"></option>
          <option value="16"></option>
          <option value="18"></option>
          <option value="20"></option>
        </datalist>
      </div>
      <span className="text-xl">가</span>
    </div>
  );
}
