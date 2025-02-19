"use client";

import Button from "@/components/common/atoms/Button";
import Canvas from "../organisms/Canvas";
import DrawingToolCard from "../organisms/DrawingToolCard";
import { setDrawing } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function DrawingForm() {
  const dispatch = useDispatch();
  const { lines } = useSelector((state: RootState) => state.drawing);

  const saveDrawing = () => {
    if (lines.length === 0) {
      alert("저장할 그림이 없습니다!");
      return;
    }

    const drawingJSON = JSON.stringify(lines); // JSON 문자열로 변환
    dispatch(setDrawing(drawingJSON)); // Redux Store에 저장
    console.log("그림 저장 완료", drawingJSON);
  };

  return (
    <div className="max-w-[500px] h-full flex flex-col items-center gap-4 m-2">
      <Canvas />
      <DrawingToolCard />
      <Button
        text={"저장하기"}
        textColor="text-white"
        fontWeight="font-bold"
        onClick={saveDrawing}
      />
    </div>
  );
}
