"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import ColorPalette from "../molecules/ColorPalette";
import Card from "@/components/common/atoms/Card";

const KonvaCanvas = dynamic(() => import("./KonvaCanvas"), { ssr: false });

export default function CanvasWrapper() {
  const [selectedColor, setSelectedColor] = useState("#000000");

  return (
    <Card width="w-full">
      <div className="w-full h-full flex flex-col items-center gap-4">
        <KonvaCanvas selectedColor={selectedColor} />
        <ColorPalette
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      </div>
    </Card>
  );
}
