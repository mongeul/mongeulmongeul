import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addLine, updateLines } from "@/store/pictureSlice";
import Card from "@/components/common/atoms/Card";
import { setStageRef } from "@/utils/stateRef";

export default function KonvaCanvas() {
  const dispatch = useDispatch();
  const { lines, selectedBrush } = useSelector(
    (state: RootState) => state.picture
  );

  const stageRef = useRef<any>(null);
  const [isPicture, setIsPicture] = useState<boolean>(false);

  useEffect(() => {
    if (stageRef.current) {
      setStageRef(stageRef.current);
    }
  }, []);

  const changeOpacity = (color: string, opacity: number) => {
    if (color.startsWith("rgba")) return color;
    if (color.startsWith("#")) {
      const r = parseInt(color.substring(1, 3), 16);
      const g = parseInt(color.substring(3, 5), 16);
      const b = parseInt(color.substring(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  };

  // 그림 그리기 시작
  const handleMouseDown = (e: any) => {
    if (selectedBrush === "eraser") {
      setIsPicture(true);
      handleErase(e); // 마우스를 누르자마자 바로 지우기 실행
      return;
    }

    setIsPicture(true);
    const pos = e.target.getStage().getPointerPosition();
    if (!pos) return;

    dispatch(
      addLine({
        points: [[pos.x, pos.y] as [number, number]],
      })
    );
  };

  // 그리는 중 or 지우는 중
  const handleMouseMove = (e: any) => {
    if (!isPicture) return;
    if (selectedBrush === "eraser") {
      handleErase(e);
      return;
    }

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (!point) return;

    const newLines = lines.map((line, index) =>
      index === lines.length - 1
        ? {
            ...line,
            points: [...line.points, [point.x, point.y] as [number, number]],
            stroke:
              selectedBrush === "highlighter"
                ? changeOpacity(line.stroke, 0.6)
                : line.stroke,
            strokeWidth: line.strokeWidth,
          }
        : line
    );

    dispatch(updateLines(newLines));
  };

  // 지우개
  const handleErase = (e: any) => {
    const stage = stageRef.current;
    if (!stage) return;

    // 현재 마우스 위치
    const erasedPosition = stage.getPointerPosition();
    if (!erasedPosition) return;

    // 마우스가 지나간 위치 근처의 선을 찾아서 삭제
    const newLines = lines.filter(
      (line) =>
        !line.points.some(
          ([x, y]) =>
            Math.abs(x - erasedPosition.x) < 15 &&
            Math.abs(y - erasedPosition.y) < 15
        )
    );

    dispatch(updateLines(newLines));
  };

  // 그리기 또는 지우기 종료
  const handleMouseUp = () => {
    setIsPicture(false);
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
