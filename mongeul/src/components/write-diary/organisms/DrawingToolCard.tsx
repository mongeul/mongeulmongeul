"use client";

import Card from "@/components/common/atoms/Card";
import ColorPalette from "../molecules/ColorPalette";
import { useState } from "react";
import Canvas from "./Canvas";

export default function DrawingToolCard() {
  const [brushColor, setBrushColor] = useState("#000000");

  return (
    <Card width="w-full">
      <div className="flex flex-col gap-4 w-full">
        <Canvas brushColor={brushColor} />
        <ColorPalette
          selectedColor={brushColor}
          onSelectColor={setBrushColor}
        />
      </div>
    </Card>
  );
}
