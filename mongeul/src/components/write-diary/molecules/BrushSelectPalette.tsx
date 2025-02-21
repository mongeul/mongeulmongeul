"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setBrushType } from "@/store/drawingSlice";
import BrushSelectButton from "../atoms/BrushSelectButton";
import { Brush } from "@/types/drawingTypes";
import PencilIcon from "@/assets/icons/pencil.svg";
import PenIcon from "@/assets/icons/pen.svg";
import EraserIcon from "@/assets/icons/eraser.svg";

const brushes: Brush[] = ["pen", "pencil", "eraser"];
// const brushes: Brush[] = ["pen", "eraser"];

export default function BrushSelectPalette() {
  const dispatch = useDispatch();
  const selectedBrush = useSelector(
    (state: RootState) => state.drawing.selectedBrush
  );

  const getBrushIcon = (brush: Brush) => {
    switch (brush) {
      case "pen":
        return <PenIcon className="w-7 h-7" />;
      case "pencil":
        return <PencilIcon className="w-7 h-7" />;
      case "eraser":
        return <EraserIcon className="w-6 h-6" />;
    }
  };

  return (
    <div className="flex items-center w-auto justify-center gap-5 px-6 py-4">
      {brushes.map((brush: Brush) => (
        <BrushSelectButton
          key={brush}
          onClick={() => dispatch(setBrushType(brush as Brush))}
          selected={selectedBrush === brush}
        >
          {getBrushIcon(brush)}
        </BrushSelectButton>
      ))}
    </div>
  );
}
