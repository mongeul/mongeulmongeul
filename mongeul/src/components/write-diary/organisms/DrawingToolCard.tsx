import Card from "@/components/common/atoms/Card";
import BrushSizePalette from "../molecules/BrushSizePalette";
import ColorPalette from "../molecules/ColorPalette";
import UndoRedoButtons from "../molecules/UndoRedoButtons";
import BrushSelectPalette from "../molecules/BrushSelectPalette";

export default function DrawingToolCard() {
  return (
    <Card width="w-full" padding="">
      <div className="w-full flex justify-center items-center flex-col">
        <div className="w-full flex justify-center items-center flex-row">
          <UndoRedoButtons />
          <div className="border border-gray-50 h-full" />
          <BrushSelectPalette />
        </div>
        <div className="border border-gray-50 w-full" />
        <div className="w-full flex justify-center items-center flex-row">
          <ColorPalette />
          <div className="border border-gray-50 h-full" />
          <BrushSizePalette />
        </div>
      </div>
    </Card>
  );
}
