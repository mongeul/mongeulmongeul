"use client";

import React, { useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";

interface KonvaCanvasProps {
  selectedColor: string;
  selectedBrushSize: number;
}

export default function KonvaCanvas({
  selectedColor,
  selectedBrushSize,
}: KonvaCanvasProps) {
  const stageRef = useRef<any>(null);
  const [lines, setLines] = useState<
    { points: number[]; stroke: string; strokeWidth: number }[]
  >([]);
  const [history, setHistory] = useState<
    { points: number[]; stroke: string }[][]
  >([]);
  const [redoStack, setRedoStack] = useState<
    { points: number[]; stroke: string }[][]
  >([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // 그림그리기 시작
  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(lines))]); // 현재 상태 저장
    setLines([
      ...lines,
      {
        points: [pos.x, pos.y],
        stroke: selectedColor,
        strokeWidth: selectedBrushSize,
      },
    ]);
  };

  // 그리는중
  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = [...lastLine.points, point.x, point.y];
    setLines([...lines.slice(0, lines.length - 1), lastLine]);
  };

  // 그리기 종료
  const handleMouseUp = () => {
    setIsDrawing(false);
    setRedoStack([]); // 새로 그릴 때 redo stack 초기화
  };

  return (
    <Stage
      width={500}
      height={500}
      ref={stageRef}
      className="border"
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
  );
}
