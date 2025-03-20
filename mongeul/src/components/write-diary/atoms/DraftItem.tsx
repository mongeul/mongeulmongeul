"use client";

import { Diary, Draft } from "@/types/diaryTypes";
import { formatDate } from "@/utils/formatDate";
import CloseIcon from "@/assets/icons/close.svg";
import {
  deleteDiaryEntry,
  deleteSharedDiaryEntry,
  fetchPictureLines,
  verifyDiaryEntry,
} from "@/lib/api/write-diary";
import {
  setContent,
  setDate,
  setFeeling,
  setPrivateStatus,
  setTitle,
  setWeather,
  setPictureLines,
  setIsDraft,
  setDraftId,
  setPicture,
} from "@/store/diarySlice";
import { useDispatch } from "react-redux";
import { updateLines } from "@/store/pictureSlice";
import { convertLinesToImage } from "@/utils/convertLinesToImage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpdateAlertModal from "../molecules/UpdateAlertModal";

interface DraftItemProps {
  draft: Draft;
  groupId: number | null;
  onDelete: (diaryId: number) => void;
  onClose: () => void;
}

export default function DraftItem({
  draft,
  groupId,
  onDelete,
  onClose,
}: DraftItemProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDiaryId, setPendingDiaryId] = useState<number | null>(null);

  // 임시저장 일기 삭제
  const handleDelete = async (diaryId: number) => {
    try {
      await (groupId
        ? deleteSharedDiaryEntry(diaryId)
        : deleteDiaryEntry(diaryId));
      onDelete(diaryId);
    } catch (error) {
      console.error("일기 삭제 실패:", error);
    }
  };

  // 임시저장 일기 라인 조회 후 이미지 변환
  const handlePictureLines = async (diaryId: number) => {
    try {
      const response = await fetchPictureLines(diaryId);
      const pictureLines = response.data.pictureLines;

      if (pictureLines?.length > 0) {
        dispatch(setPictureLines(pictureLines));
        dispatch(updateLines(pictureLines));

        // 캔버스를 만들고 이미지 변환 후 Redux 저장
        const imageDataUrl = await convertLinesToImage(pictureLines);
        dispatch(setPicture(imageDataUrl));
      }
    } catch (error) {
      console.error("일기 라인 불러오기 실패", error);
    }
  };

  // 임시저장 일기 선택
  const onSelectDraft = async (draft: Diary) => {
    try {
      const isDiary = await verifyDiaryEntry(draft.date);

      if (isDiary?.data) {
        // 이미 작성된 날짜의 임시저장 일기라면 모달 표시
        setPendingDiaryId(isDiary.data);
        setIsModalOpen(true);
      } else {
        proceedToEdit(draft);
      }
    } catch (error) {
      console.error("일기 존재 여부 확인 실패", error);
    }
  };

  // 확인 버튼을 눌렀을 때만 페이지 이동
  const proceedToEdit = async (draft: Diary) => {
    await handlePictureLines(draft.diaryId);
    dispatch(setTitle(draft.title));
    dispatch(setContent(draft.content));
    dispatch(setDate(draft.date));
    dispatch(setFeeling(draft.feeling));
    dispatch(setPrivateStatus(draft.privateStatus));
    dispatch(setWeather(draft.weather));
    dispatch(setIsDraft(true));
    dispatch(setDraftId(draft.diaryId));

    onClose();
    if (pendingDiaryId) {
      router.push(`/write-diary?id=${pendingDiaryId ?? draft.diaryId}`);
      setPendingDiaryId(null);
    }
  };

  return (
    <div className="w-full flex flex-row gap-2 p-4 border-b border-gray-100 last:border-b-0 relative">
      {/* 클릭 가능 영역 */}
      <div
        className="w-full flex flex-col gap-2 cursor-pointer"
        onClick={() => onSelectDraft(draft)}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-600 truncate">
            {draft.title || "제목없음"}
          </span>
          <span className="text-2xs text-gray-400">
            {formatDate(draft.date)}
          </span>
        </div>
        {/* 내용 */}
        <div className="w-full text-xs text-gray-500 line-clamp-2 overflow-hidden">
          {draft.content || "내용없음"}
        </div>
      </div>
      {/* 삭제버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 부모 클릭 이벤트 방지
          handleDelete(draft.diaryId);
        }}
        className="absolute top-2 right-2"
      >
        <CloseIcon className="h-4 w-4 text-gray-300" />
      </button>
      {isModalOpen && (
        <UpdateAlertModal
          closeModal={() => setIsModalOpen(false)}
          onConfirm={() => proceedToEdit(draft)}
          date={formatDate(draft.date)}
        />
      )}
    </div>
  );
}
