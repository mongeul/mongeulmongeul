"use client";

import Button from "@/components/common/atoms/Button";
import { setDrawing, setDrawingImage } from "@/store/diarySlice";
import { resetDrawing } from "@/store/drawingSlice";
import { RootState } from "@/store/store";
import { stageRef } from "@/utils/stateRef";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function DrawingNavBar() {
  const dispatch = useDispatch();
  const { lines } = useSelector((state: RootState) => state.drawing);
  const router = useRouter();

  function saveDrawing() {
    if (lines.length === 0) {
      alert("저장할 그림이 없습니다!");
      return;
    }

    // JSON 저장
    const drawingJSON = JSON.stringify(lines);
    dispatch(setDrawing(drawingJSON));
    console.log("JSON 저장 완료:", drawingJSON);

    // 전역 변수에서 가져온 stageRef를 활용하여 이미지 저장
    if (stageRef) {
      const drawingImage = stageRef.toDataURL();
      dispatch(setDrawingImage(drawingImage));
      console.log("이미지 저장 완료:", drawingImage);
    } else {
      console.error("stageRef가 null입니다. 확인해주세요.");
    }

    router.back();
  }

  const clearDrawing = () => {
    dispatch(resetDrawing());
  };

  return (
    <div className="w-full px-6 flex flex-row gap-6">
      <Button
        text="저장하기"
        width="w-full"
        textColor="text-white"
        fontWeight="font-bold"
        onClick={saveDrawing}
      />
      <Button
        text="다시 그리기"
        width="w-full"
        borderColor="border border-theme-400"
        backgroundColor="bg-white"
        textColor="text-theme-400"
        fontWeight="font-bold"
        onClick={clearDrawing}
      />
    </div>
  );
}
