"use client";

import Button from "@/components/common/atoms/Button";
import Canvas from "../organisms/Canvas";
import DrawingToolCard from "../organisms/DrawingToolCard";

export default function DrawingForm() {
  const saveDrawing = (): void => {
    console.log("그림 저장 버튼 클릭");
  };
  return (
    <div className="max-w-[500px] h-full flex flex-col items-center gap-4 m-2">
      <Canvas />
      <DrawingToolCard />
      <Button
        text={"저장하기"}
        textColor="text-white"
        fontWeight="font-bold"
        onClick={saveDrawing}
      />
    </div>
  );
}
