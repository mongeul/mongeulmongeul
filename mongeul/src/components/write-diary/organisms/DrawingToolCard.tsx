import Card from "@/components/common/atoms/Card";
import BrushSizePalette from "../molecules/BrushSizePalette";
import ColorPalette from "../molecules/ColorPalette";
import UndoRedoButtons from "../molecules/UndoRedoButtons";

export default function DrawingToolCard() {
  return (
    <Card width="w-full" margin="">
      <div className="w-full flex justify-center items-center flex-col">
        <UndoRedoButtons />
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
