"use client";

import { RootState } from "@/store/store";
import Card from "@/components/common/atoms/Card";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Stage, Layer, Line } from "react-konva";
import { DrawingLine } from "@/types/drawingTypes";

export default function DrawingCard() {
  const drawingData = useSelector((state: RootState) => state.diary.drawing);

  const lines: DrawingLine[] = drawingData ? JSON.parse(drawingData) : [];

  return (
    <div className="w-full h-full">
      <Link href="/write-diary/drawing">
        {lines.length > 0 ? (
          <Card padding="">
            <Stage width={500} height={500}>
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.stroke}
                    strokeWidth={line.strokeWidth}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                  />
                ))}
              </Layer>
            </Stage>
          </Card>
        ) : (
          <Card>
            <div className="w-full h-full flex justify-center text-zinc-400">
              오늘 하루를 그림으로 남겨보세요
            </div>
          </Card>
        )}
      </Link>
    </div>
  );
}
