import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addLine, removeLine, updateLines } from "@/store/drawingSlice";
import Card from "@/components/common/atoms/Card";
import { setStageRef } from "@/utils/stateRef";

export default function KonvaCanvas() {
  const dispatch = useDispatch();
  const { lines, selectedBrush } = useSelector(
    (state: RootState) => state.drawing
  );

  const stageRef = useRef<any>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    if (stageRef.current) {
      setStageRef(stageRef.current);
    }
  }, []);

  // 그림 그리기 시작
  const handleMouseDown = (e: any) => {
    if (selectedBrush === "eraser") {
      handleErase(e);
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

  // TODO 드래그도중에 지우기 유지
  const handleErase = (e: any) => {
    if (selectedBrush !== "eraser") return;

    const stage = stageRef.current;
    const clickedPosition = stage.getPointerPosition();

    const clickedLineIndex = lines.findIndex((line) =>
      line.points.some(
        (_, i) =>
          i % 2 === 0 &&
          Math.abs(line.points[i] - clickedPosition.x) < 10 &&
          Math.abs(line.points[i + 1] - clickedPosition.y) < 10
      )
    );

    if (clickedLineIndex !== -1) {
      dispatch(removeLine(clickedLineIndex));
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
