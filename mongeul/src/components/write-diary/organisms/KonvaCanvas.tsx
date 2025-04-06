import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addLine,
  setStageRef,
  updateLines,
  updateLinesWithHistory,
} from "@/store/pictureSlice";
import Card from "@/components/common/atoms/Card";
import { Stage, Layer, Line } from "react-konva";
import { PictureLine } from "@/types/pictureTypes";

const KonvaCanvas = () => {
  const dispatch = useDispatch();
  const { lines, selectedBrush } = useSelector(
    (state: RootState) => state.picture
  );

  const stageRef = useRef<any>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const prevLinesBeforeErase = useRef<PictureLine[] | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    const waitForStage = () => {
      if (stageRef.current) {
        dispatch(setStageRef(stageRef.current));
        console.log("stageRef Redux 저장 완료", stageRef.current);
      } else {
        requestAnimationFrame(waitForStage);
      }
    };

    waitForStage();
  }, [dispatch]);

  if (!isClient) return null;

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
    setIsDrawing(true);

    if (selectedBrush === "eraser") {
      prevLinesBeforeErase.current = [...lines];
      handleErase(e, false);
      return;
    }

    const pos = e.target.getStage().getPointerPosition();
    if (!pos) return;

    dispatch(
      addLine({
        points: [[pos.x, pos.y] as [number, number]],
      })
    );
  };

  // 그리는 중
  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;

    if (selectedBrush === "eraser") {
      handleErase(e, false);
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

  // 지우기
  const handleErase = (e: any, shouldSaveHistory: boolean) => {
    const stage = stageRef.current;
    if (!stage) return;

    const erasedPosition = stage.getPointerPosition();
    if (!erasedPosition) return;

    const newLines = lines.filter(
      (line) =>
        !line.points.some(
          ([x, y]) =>
            Math.abs(x - erasedPosition.x) < 15 &&
            Math.abs(y - erasedPosition.y) < 15
        )
    );

    if (shouldSaveHistory) {
      dispatch(
        updateLinesWithHistory({
          newLines,
          beforeLines: prevLinesBeforeErase.current || [],
        })
      );
      prevLinesBeforeErase.current = null;
    } else {
      dispatch(updateLines(newLines));
    }
  };

  // 그리기 또는 지우기 종료
  const handleMouseUp = (e: any) => {
    if (isDrawing && selectedBrush === "eraser") {
      handleErase(e, true);
    }
    setIsDrawing(false);
  };

  return (
    <Card padding="">
      <div
        className="w-full overflow-x-auto"
        style={{ touchAction: isDrawing ? "none" : "auto" }}
      >
        <div className="w-[768px] flex-shrink-0">
          <Stage
            width={768}
            height={500}
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
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
      </div>
    </Card>
  );
};

// 서버 사이드 렌더링 방지
export default dynamic(() => Promise.resolve(KonvaCanvas), { ssr: false });
