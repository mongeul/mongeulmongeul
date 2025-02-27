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
    if (!pos) return;

    dispatch(
      addLine({
        points: [[pos.x, pos.y] as [number, number]],
      })
    );
  };

  // 그리는중
  const handleMouseMove = (e: any) => {
    if (!isDrawing || selectedBrush === "eraser") return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (!point) return; // 포인터 없으면 리턴

    const newLines = lines.map((line, index) =>
      index === lines.length - 1
        ? {
            ...line,
            points: [...line.points, [point.x, point.y] as [number, number]],
          }
        : line
    );

    dispatch(updateLines(newLines));
  };

  // 드래그 도중에 지우기
  const handleErase = (e: any) => {
    if (selectedBrush !== "eraser") return;

    const stage = stageRef.current;
    const clickedPosition = stage.getPointerPosition(); // 마우스 클릭 위치
    if (!clickedPosition) return; // 클릭 위치가 없으면 종료

    // 클릭한 위치와 가까운 점을 찾아서 지우기
    const clickedLineIndex = lines.findIndex((line) =>
      line.points.some((point: [number, number], i: number) => {
        const x = point[0]; // x좌표
        const y = point[1]; // y좌표

        // 마우스 클릭 위치와 가까운지 체크
        return (
          Math.abs(x - clickedPosition.x) < 10 &&
          Math.abs(y - clickedPosition.y) < 10
        );
      })
    );

    if (clickedLineIndex !== -1) {
      // 해당 라인을 제거
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
                points={line.points.flat()}
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
