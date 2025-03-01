"use client";

import Button from "@/components/common/atoms/Button";
import { submitDiary } from "@/lib/api/write-diary";
import { resetDiary } from "@/store/diarySlice";
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
