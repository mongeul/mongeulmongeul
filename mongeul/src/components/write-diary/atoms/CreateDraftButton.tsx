"use client";

import {
  createDiaryDraft,
  createSharedDiaryDraft,
  updateDiaryEntry,
  updateSharedDiaryEntry,
} from "@/lib/api/write-diary";
import { resetDiary } from "@/store/diarySlice";
import { resetPicture } from "@/store/pictureSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

interface CreateDraftButtonProps {
  groupId: number | null;
}

export default function CreateDraftButton({ groupId }: CreateDraftButtonProps) {
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

  // API 요청 실행 후 상태 업데이트 및 페이지 이동
  async function handleSaveDiary(
    apiCall: () => Promise<any>,
    redirectPath: string
  ) {
    try {
      const response = await apiCall(); // API 응답 받기
      console.log("API 응답:", response);

      dispatch(resetDiary());
      dispatch(resetPicture());

      setTimeout(() => router.push(redirectPath), 50);
    } catch (error) {
      console.error("일기 임시저장 실패:", error);
    }
  }

  // 임시 저장 핸들러
  async function handleSubmit() {
    if (!isDirty) {
      alert("작성한 일기가 없습니다.");
      return;
    }

    const diaryData = {
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
    };

    // 개인 임기저장 일기 수정
    if (isDraft && draftId) {
      return handleSaveDiary(
        () => updateDiaryEntry(diaryData, draftId),
        "/diary"
      );
    }

    // 새로운 임시저장 (개인 일기)
    if (!groupId && !isDraft && !draftId) {
      return handleSaveDiary(() => createDiaryDraft(diaryData), "/diary");
    }

    // 새로운 임시저장 (공유 일기)
    if (groupId && !isDraft && !draftId) {
      return handleSaveDiary(
        () => createSharedDiaryDraft(diaryData, groupId),
        "/shared-diary"
      );
    }

    // 공유 임시저장 일기 수정
    if (groupId && isDraft && draftId) {
      return handleSaveDiary(
        () => updateSharedDiaryEntry(diaryData, groupId, draftId),
        "/shared-diary"
      );
    }
  }

  return (
    <button className="w-full text-gray-500" onClick={handleSubmit}>
      임시저장
    </button>
  );
}
