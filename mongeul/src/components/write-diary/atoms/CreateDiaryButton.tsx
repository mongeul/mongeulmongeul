"use client";

import Button from "@/components/common/atoms/Button";
import { submitDiary, submitUpdateDiary } from "@/lib/api/write-diary";
import { resetDiary } from "@/store/diarySlice";
import { resetDrawing } from "@/store/drawingSlice";
import { RootState } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateDiaryButton() {
  const searchParams = useSearchParams();
  const diaryId: number | null = Number(searchParams.get("id")) || null;

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        if (diaryId) {
          // 수정
          await submitUpdateDiary(
            {
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
            },
            diaryId
          );
        } else {
          // 새로 작성
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
        }

        await Promise.all([dispatch(resetDiary()), dispatch(resetDrawing())]);

        router.push("/diary");
      } catch (error) {
        console.error("일기 작성 실패:", error);
      } finally {
        setTimeout(() => setIsSubmitting(false), 500);
      }
    });
  }

  return (
    <Button
      text={diaryId ? "수정하기" : "작성하기"}
      width="w-full"
      textColor="text-white"
      fontWeight="font-bold"
      onClick={handleSubmit}
      disabled={isSubmitting}
      backgroundColor={isSubmitting ? "bg-gray-300" : "bg-theme-400"}
    />
  );
}
