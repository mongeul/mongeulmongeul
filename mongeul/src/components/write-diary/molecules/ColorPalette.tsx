import { useState } from "react";
import ColorButton from "../atoms/ColorButton";

const colors = [
  "#FF3B30", // 빨강
  "#FF9500", // 주황
  "#FFF705", // 노랑
  "#A8E063", // 연두
  "#34C759", // 초록
  "#87CEEB", // 하늘
  "#007AFF", // 파랑
  "#003366", // 남색
  "#AF52DE", // 보라
  "#FF86CD", // 핑크
  "#8B4513", // 갈색
  "#FFFFFF", // 하양
  "#000000", // 검정
];

interface ColorPaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export default function ColorPalette({
  selectedColor,
  onSelectColor,
}: ColorPaletteProps) {
  return (
    <div className="flex flex-row w-full justify-center gap-3">
      {colors.map((color) => (
        <ColorButton
          key={color}
          color={color}
          selected={selectedColor === color}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
}
