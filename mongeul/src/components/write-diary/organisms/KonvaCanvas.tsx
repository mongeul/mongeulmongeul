"use client";

import React, { useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addLine, removeLine, updateLines } from "@/store/drawingSlice";
import Card from "@/components/common/atoms/Card";

export default function KonvaCanvas() {
  const stageRef = useRef<any>(null);
  const dispatch = useDispatch();
  const { lines, selectedBrush } = useSelector(
    (state: RootState) => state.drawing
  );
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // 그림 그리기 시작
  const handleMouseDown = (e: any) => {
    if (selectedBrush === "eraser") {
      handleErase(e); // 지우개 모드일 때는 선 삭제 실행
      return;
    }

    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    dispatch(addLine({ points: [pos.x, pos.y] }));
  };

  // 그리는중
  const handleMouseMove = (e: any) => {
    if (!isDrawing || selectedBrush === "eraser") return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    const newLines = lines.map((line, index) =>
      index === lines.length - 1
        ? { ...line, points: [...line.points, point.x, point.y] }
        : line
    );

    dispatch(updateLines(newLines));
  };

  // 지우기 (특정 선 삭제)
  const handleErase = (e: any) => {
    if (selectedBrush !== "eraser") return;

    const stage = stageRef.current;
    const clickedPosition = stage.getPointerPosition();

    // 클릭한 좌표에서 가장 가까운 선 찾기
    const clickedLineIndex = lines.findIndex((line) =>
      line.points.some(
        (_, i) =>
          i % 2 === 0 &&
          Math.abs(line.points[i] - clickedPosition.x) < 10 && // X 좌표 근접 체크
          Math.abs(line.points[i + 1] - clickedPosition.y) < 10 // Y 좌표 근접 체크
      )
    );

    if (clickedLineIndex !== -1) {
      dispatch(removeLine(clickedLineIndex)); // Redux에서 해당 선 삭제
    }
  };

  // 그리기 종료
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <Card padding="">
      <div>
        <Stage
          width={500}
          height={500}
          ref={stageRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
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
      </div>
    </Card>
  );
}
