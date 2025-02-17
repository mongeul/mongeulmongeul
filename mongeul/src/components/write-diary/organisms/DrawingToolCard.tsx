"use client";

import Card from "@/components/common/atoms/Card";
import ColorPalette from "../molecules/ColorPalette";
import { useState } from "react";

export default function DrawingToolCard() {
  const [brushColor, setBrushColor] = useState("#000000");

  return (
    <Card width="w-full">
      <ColorPalette selectedColor={brushColor} onSelectColor={setBrushColor} />
    </Card>
  );
}
