"use client";

import React, { useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addLine, updateLines } from "@/store/drawingSlice";
import Card from "@/components/common/atoms/Card";

export default function KonvaCanvas() {
  const stageRef = useRef<any>(null);
  const dispatch = useDispatch();
  const { lines } = useSelector((state: RootState) => state.drawing);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // 그림그리기 시작
  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    dispatch(addLine({ points: [pos.x, pos.y] }));
  };

  // 그리는중
  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    const newLines = lines.map((line, index) =>
      index === lines.length - 1
        ? { ...line, points: [...line.points, point.x, point.y] }
        : line
    );

    dispatch(updateLines(newLines));
  };

  // 그리기 종료
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <Card margin="">
      <Stage
        width={500}
        height={500}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
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
  );
}
