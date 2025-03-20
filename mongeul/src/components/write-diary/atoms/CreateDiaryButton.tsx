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

  async function handleSubmit() {
    if (!title || !content || !date || !weather || !feeling || !privateStatus) {
      alert("필수 입력 항목을 모두 입력해주세요!");
      return;
    }

    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      if (diaryId && groupId === null) {
        // 개인 일기 수정
        await updateDiaryEntry(
          {
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
          },
          diaryId
        );
      } else if (diaryId === null && groupId === null) {
        // 개인 일기 작성
        await createDiaryEntry({
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
        });

        if (isDraft && typeof draftId === "number") {
          await deleteDiaryEntry(draftId);
        }
      } else if (diaryId === null && groupId) {
        // 공유 일기 작성
        await createSharedDiaryEntry(
          {
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
          },
          groupId
        );

        if (isDraft && typeof draftId === "number") {
          await deleteDiaryEntry(draftId);
        }
      } else if (diaryId !== null && groupId) {
        // 공유 일기 수정
        await updateSharedDiaryEntry(
          {
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
          },
          diaryId,
          groupId
        );
      }

      // 상태 초기화 및 페이지 이동
      dispatch(resetDiary());
      dispatch(resetPicture());
      if (groupId !== null) {
        router.push("/diary");
      } else {
        router.push("/shared-diary");
      }
    } catch (error) {
      console.error("일기 작성 실패:", error);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
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
