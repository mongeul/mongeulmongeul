"use client";

import {
  createDiaryDraft,
  createDiaryEntry,
  updateDiaryEntry,
} from "@/lib/api/write-diary";
import { resetDiary } from "@/store/diarySlice";
import { resetPicture } from "@/store/pictureSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function CreateDraftButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    isDraft,
    draftId,
    title,
    content,
    date,
    pictureLines,
    weather,
    feeling,
    privateStatus,
  } = useSelector((state: RootState) => state.diary);

  const isDirty = !!(title || content || pictureLines || weather || feeling);

  // 임시저장
  async function handleSubmit() {
    if (!isDirty) {
      alert("작성한 일기가 없습니다.");
      return;
    }

    // 임시저장 수정
    if (isDraft && draftId) {
      try {
        await updateDiaryEntry(
          {
            title,
            content,
            pictureLines:
              typeof pictureLines === "string"
                ? JSON.parse(pictureLines)
                : pictureLines,
            date,
            weather,
            feeling,
            privateStatus,
          },
          draftId
        );
        dispatch(resetDiary());
        dispatch(resetPicture());

        // Redux 상태 변경 후 반영될 시간을 확보
        await new Promise((resolve) => setTimeout(resolve, 0));

        router.push("/diary");
      } catch (error) {
        console.error("일기 임시저장 수정 실패:", error);
      }
    } else {
      // 임시저장 생성
      try {
        await createDiaryDraft({
          title,
          content,
          pictureLines:
            typeof pictureLines === "string"
              ? JSON.parse(pictureLines)
              : pictureLines,
          date,
          weather,
          feeling,
          privateStatus,
        });
        dispatch(resetDiary());
        dispatch(resetPicture());

        // Redux 상태 변경 후 반영될 시간을 확보
        await new Promise((resolve) => setTimeout(resolve, 0));

        router.push("/diary");
      } catch (error) {
        console.error("일기 임시저장 실패:", error);
      }
    }
  }
  return (
    <button className="w-full text-gray-500" onClick={handleSubmit}>
      임시저장
    </button>
  );
}
