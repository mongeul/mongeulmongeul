"use client";

import { submitDiaryDraft } from "@/lib/api/write-diary";
import { resetDiary } from "@/store/diarySlice";
import { resetDrawing } from "@/store/drawingSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function CreateDraftButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    title,
    content,
    date,
    drawingLines,
    weather,
    feeling,
    privateStatus,
  } = useSelector((state: RootState) => state.diary);

  const isDirty = !!(title || content || drawingLines || weather || feeling);

  // 임시저장
  async function handleSubmit() {
    if (!isDirty) {
      alert("작성한 일기가 없습니다.");
      return;
    }

    try {
      await submitDiaryDraft({
        title,
        content,
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
      console.error("일기 임시저장 실패:", error);
    }
  }
  return (
    <button className="w-full text-gray-500" onClick={handleSubmit}>
      임시저장
    </button>
  );
}
