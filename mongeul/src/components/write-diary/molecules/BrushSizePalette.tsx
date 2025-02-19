"use client";

import { useDispatch, useSelector } from "react-redux";
import BrushSizeButton from "../atoms/BrushSizeButton";
import { RootState } from "@/store/store";
import { setBrushSize } from "@/store/drawingSlice";

const sizes = [5, 20, 35];

export default function BrushSizePalette() {
  const dispatch = useDispatch();
  const selectedBrushSize = useSelector(
    (state: RootState) => state.drawing.selectedBrushSize
  );

  return (
    <div className="flex flex-center items-center w-auto justify-center gap-5 px-6 py-4">
      {sizes.map((size) => (
        <BrushSizeButton
          key={size}
          size={size}
          selected={selectedBrushSize === size}
          onClick={() => dispatch(setBrushSize(size))}
        />
      ))}
    </div>
  );
}
