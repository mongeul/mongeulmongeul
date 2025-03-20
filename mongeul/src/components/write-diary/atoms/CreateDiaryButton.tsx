"use client";

import Button from "@/components/common/atoms/Button";
import {
  createDiaryEntry,
  createSharedDiaryEntry,
  deleteDiaryEntry,
  updateDiaryEntry,
  updateSharedDiaryEntry,
} from "@/lib/api/write-diary";
import { resetDiary } from "@/store/diarySlice";
import { resetPicture } from "@/store/pictureSlice";
import { RootState } from "@/store/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiarySubmitSpinner from "../molecules/DiarySubmitSpinner";
import { useRouter } from "next/navigation";

interface CreateDiaryButtonProps {
  diaryId: number | null;
  groupId: number | null;
}

export default function CreateDiaryButton({
  diaryId,
  groupId,
}: CreateDiaryButtonProps) {
  const router = useRouter();
  const isSubmittingRef = useRef<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    isDraft,
    draftId,
    title,
    content,
    picture,
    pictureLines,
    date,
    weather,
    feeling,
    privateStatus,
  } = useSelector((state: RootState) => state.diary);

  // API 요청 실행 후 상태 업데이트 및 페이지 이동
  async function handleSaveDiary(
    apiCall: () => Promise<any>,
    redirectPath: string
  ) {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      await apiCall();
      dispatch(resetDiary());
      dispatch(resetPicture());

      setTimeout(() => router.push(redirectPath), 50);
    } catch (error) {
      console.error("일기 저장 실패:", error);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  // 일기 데이터
  const diaryData = {
    title,
    content,
    picture: picture || "",
    pictureLines:
      typeof pictureLines === "string"
        ? JSON.parse(pictureLines)
        : pictureLines,
    date,
    weather,
    feeling,
    privateStatus,
  };

  // 제출 핸들러
  async function handleSubmit() {
    if (!title || !content || !date || !weather || !feeling || !privateStatus) {
      alert("필수 입력 항목을 모두 입력해주세요!");
      return;
    }

    if (diaryId && !groupId) {
      // 개인 일기 수정
      return handleSaveDiary(
        () => updateDiaryEntry(diaryData, diaryId),
        "/diary"
      );
    }

    if (!diaryId && !groupId) {
      // 개인 일기 작성
      return handleSaveDiary(async () => {
        await createDiaryEntry(diaryData);
        if (isDraft && draftId) await deleteDiaryEntry(draftId);
      }, "/diary");
    }

    if (!diaryId && groupId) {
      // 공유 일기 작성
      return handleSaveDiary(async () => {
        await createSharedDiaryEntry(diaryData, groupId);
        if (isDraft && draftId) await deleteDiaryEntry(draftId);
      }, "/shared-diary");
    }

    if (diaryId && groupId) {
      // 공유 일기 수정
      return handleSaveDiary(
        () => updateSharedDiaryEntry(diaryData, groupId, diaryId),
        "/shared-diary"
      );
    }
  }

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <DiarySubmitSpinner />
        </div>
      )}

      <Button
        text={diaryId ? "수정하기" : "작성하기"}
        width="w-full"
        textColor="text-white"
        fontWeight="font-bold"
        onClick={handleSubmit}
        disabled={isSubmitting}
        backgroundColor={isSubmitting ? "bg-gray-300" : "bg-theme-400"}
      />
    </>
  );
}
