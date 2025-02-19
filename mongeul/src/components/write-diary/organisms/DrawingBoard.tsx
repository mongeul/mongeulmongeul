"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import ColorPalette from "../molecules/ColorPalette";
import Card from "@/components/common/atoms/Card";
import BrushSizePalette from "../molecules/BrushSizePalette";

const KonvaCanvas = dynamic(() => import("./KonvaCanvas"), { ssr: false });

export default function DrawingBoard() {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedBrushSize, setSelectedBrushSize] = useState(10);

  return (
    <Card width="w-full">
      <div className="w-full h-full flex flex-col items-center gap-4">
        <KonvaCanvas />
        <div className="flex flex-row gap-6">
          <ColorPalette />
          <BrushSizePalette />
        </div>
      </div>
    </Card>
  );
}
