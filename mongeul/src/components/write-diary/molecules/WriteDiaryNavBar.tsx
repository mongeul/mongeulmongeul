"use client";

import Button from "@/components/common/atoms/Button";
import { resetDiary } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { createDiary } from "@/actions/diary/createDiary";
import { startTransition } from "react";
import router from "next/router";

export default function WriteDiaryNavBar() {
  const dispatch = useDispatch();
  const {
    title,
    content,
    drawing,
    drawingLines,
    date,
    weather,
    feelings,
    privateStatus,
  } = useSelector((state: RootState) => state.diary);

  async function handleSubmit() {
    if (
      !title ||
      !content ||
      !date ||
      !weather ||
      !feelings ||
      !privateStatus
    ) {
      alert("필수 입력 항목을 모두 입력해주세요!");
      return;
    }

    startTransition(async () => {
      try {
        await createDiary({
          title,
          content,
          picture: drawing || "",
          pictureLines: drawingLines ? JSON.parse(drawingLines) : [],
          date,
          weather: weather,
          feelings: feelings,
          privateStatus: privateStatus,
        });

        clearDiary();
        router.push("/diary"); // 일기 목록 페이지로 이동
      } catch (error) {
        console.error("일기 작성 실패:", error);
      }
    });
  }

  const clearDiary = () => {
    dispatch(resetDiary());
  };

  return (
    <div className="w-full px-6 flex flex-row gap-6">
      <Button
        text="작성하기"
        width="w-full"
        textColor="text-white"
        fontWeight="font-bold"
        onClick={handleSubmit}
      />
      <Button
        text="새로 쓰기"
        width="w-full"
        borderColor="border border-theme-400"
        backgroundColor="bg-white"
        textColor="text-theme-400"
        fontWeight="font-bold"
        onClick={clearDiary}
      />
    </div>
  );
}
