"use client";

import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import UndoRedoButton from "../atoms/UndoRedoButton";
import UndoIcon from "@/assets/icons/undo.svg";
import RedoIcon from "@/assets/icons/redo.svg";

interface KonvaCanvasProps {
  selectedColor: string;
  selectedBrushSize: number;
}

interface DrawingLine {
  points: number[];
  stroke: string;
  strokeWidth: number;
}

export default function KonvaCanvas({
  selectedColor,
  selectedBrushSize,
}: KonvaCanvasProps) {
  const stageRef = useRef<any>(null);
  const [lines, setLines] = useState<DrawingLine[]>([]);
  const [history, setHistory] = useState<DrawingLine[][]>([]);
  const [redoStack, setRedoStack] = useState<DrawingLine[][]>([]);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // 그림그리기 시작
  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(lines))]); // 현재 상태 저장
    setRedoStack([]); // 새로운 선을 그리면 redo 스택 초기화
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

  // Undo
  const undo = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const lastState = newHistory.pop() as DrawingLine[];

      if (lastState) {
        setRedoStack((prev) => [...prev, JSON.parse(JSON.stringify(lines))]);
        setLines(lastState);
        setHistory(newHistory);
      }
    }
  };

  // Redo
  const redo = () => {
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack];
      const redoState = newRedoStack.pop() as DrawingLine[];

      if (redoState) {
        setHistory((prev) => [...prev, JSON.parse(JSON.stringify(lines))]);
        setLines(redoState);
        setRedoStack(newRedoStack);
      }
    }
  };

  // Undo/Redo 가능 여부 상태 업데이트
  useEffect(() => {
    setCanUndo(history.length > 0);
    setCanRedo(redoStack.length > 0);
  }, [history, redoStack]);

  return (
    <div>
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
      <div className="flex gap-2 mt-4">
        <UndoRedoButton onClick={undo} disabled={!canUndo}>
          <UndoIcon />
        </UndoRedoButton>
        <UndoRedoButton onClick={redo} disabled={!canRedo}>
          <RedoIcon />
        </UndoRedoButton>
      </div>
    </div>
  );
}
