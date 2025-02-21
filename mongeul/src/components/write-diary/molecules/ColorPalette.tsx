"use client";

import ColorButton from "../atoms/ColorButton";
import { setColor } from "@/store/drawingSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const colors = [
  "#FF0000", // 빨강
  "#FF7700", // 주황
  "#FFF705", // 노랑
  "#A8E063", // 연두
  "#34C759", // 초록
  "#6FE2FF", // 하늘
  "#007AFF", // 파랑
  "#9F50FF", // 보라
  "#FF86CD", // 핑크
  "#8B4513", // 갈색
  "#898A8D", // 갈색
  "#FFFFFF", // 하양
  "#000000", // 검정
];

export default function ColorPalette() {
  const dispatch = useDispatch();
  const selectedColor = useSelector(
    (state: RootState) => state.drawing.selectedColor
  );

  return (
    <div className="w-full h-10 overflow-x-auto scrollbar-hide">
      <div className="flex min-w-max h-10 items-center gap-3 px-6 py-4">
        {colors.map((color) => (
          <ColorButton
            key={color}
            color={color}
            selected={selectedColor === color}
            onClick={() => dispatch(setColor(color))}
          />
        ))}
      </div>
    </div>
  );
}
