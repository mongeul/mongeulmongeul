"use client";

import { useRef } from "react";
import Canvas from "../organisms/Canvas";
import DrawingToolCard from "../organisms/DrawingToolCard";

export default function DrawingForm() {
  const stageRef = useRef<any>(null);

  return (
    <div className="max-w-[500px] h-full flex flex-col justiry-center items-center gap-4 m-2">
      <Canvas />
      <DrawingToolCard />
    </div>
  );
}
