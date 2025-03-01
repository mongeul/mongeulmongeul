"use client";

import Button from "@/components/common/atoms/Button";
import { submitDiary } from "@/lib/api/write-diary";
import { resetDiary, setIsSubmit } from "@/store/diarySlice";
import { resetDrawing } from "@/store/drawingSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateDiaryButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    title,
    content,
    drawing,
    drawingLines,
    date,
    weather,
    feeling,
    privateStatus,
  } = useSelector((state: RootState) => state.diary);

  async function handleSubmit() {
    if (!title || !content || !date || !weather || !feeling || !privateStatus) {
      alert("필수 입력 항목을 모두 입력해주세요!");
      return;
    }

    startTransition(async () => {
      try {
        await submitDiary({
          title,
          content,
          picture: drawing || "",
          pictureLines:
            typeof drawingLines === "string"
              ? JSON.parse(drawingLines)
              : drawingLines,
          date,
          weather,
          feeling,
          privateStatus,
        });

        dispatch(resetDiary());
        dispatch(resetDrawing());

        // Redux 상태 변경 후 반영될 시간을 확보
        await new Promise((resolve) => setTimeout(resolve, 0));

        router.push("/diary");
      } catch (error) {
        console.error("일기 작성 실패:", error);
      }
    });
  }

  return (
    <Button
      text="작성하기"
      width="w-full"
      textColor="text-white"
      fontWeight="font-bold"
      onClick={handleSubmit}
    />
  );
}
