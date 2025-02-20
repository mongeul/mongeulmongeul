"use client";

import { useRef } from "react";
import Button from "@/components/common/atoms/Button";
import Canvas from "../organisms/Canvas";
import DrawingToolCard from "../organisms/DrawingToolCard";
import { setDrawing, setDrawingImage } from "@/store/diarySlice";
import { resetDrawing } from "@/store/drawingSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function DrawingForm() {
  const dispatch = useDispatch();
  const { lines } = useSelector((state: RootState) => state.drawing);
  const stageRef = useRef<any>(null);
  const router = useRouter();

  function saveDrawing() {
    // TODO line 없으면 저장 버튼 비활성화
    if (lines.length === 0) {
      alert("저장할 그림이 없습니다!");
      return;
    }

    // 제이슨 데이터 저장
    const drawingJSON = JSON.stringify(lines);
    dispatch(setDrawing(drawingJSON));
    console.log("그림 저장 완료", drawingJSON);

    // Image 저장
    if (stageRef.current) {
      const drawingImage = stageRef.current.toDataURL();
      dispatch(setDrawingImage(drawingImage));
      console.log("그림과 이미지 저장 완료", drawingImage);
    }

    router.back();
  }

  const reset = () => {
    dispatch(resetDrawing());
  };

  return (
    <div className="max-w-[500px] h-full flex flex-col justiry-center items-center gap-4 m-2">
      <Canvas stageRef={stageRef} />
      <DrawingToolCard />
      <div className="flex flex-row h-auto justiry-center items-center gap-4">
        <Button
          text={"저장하기"}
          textColor="text-white"
          fontWeight="font-bold"
          borderColor="border border-theme-400"
          onClick={saveDrawing}
        />
        <Button
          text={"다시그리기"}
          textColor="text-theme-400"
          fontWeight="font-bold"
          borderColor="border border-theme-400"
          backgroundColor="bg-white"
          onClick={reset}
        />
      </div>
    </div>
  );
}
