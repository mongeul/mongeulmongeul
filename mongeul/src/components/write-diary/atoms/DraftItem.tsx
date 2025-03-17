"use client";

import { Diary, Draft } from "@/types/diaryTypes";
import { formatDate } from "@/utils/formatDate";
import CloseIcon from "@/assets/icons/close.svg";
import {
  deleteDiaryEntry,
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
  onDelete: (diaryId: number) => void;
  onClose: () => void;
}

export default function DraftItem({
  draft,
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
      await deleteDiaryEntry(diaryId);
      onDelete(diaryId);
    } catch (error) {
      console.error("일기 삭제 실패:", error);
    }
  };

  // 임시저장 일기 라인 조회 후 이미지 변환
  const handlePictureLines = async (diaryId: number) => {
    console.log("임시저장 일기 불러오기");
    try {
      const pictureLinesResponse = await fetchPictureLines(diaryId);
      console.log(pictureLinesResponse);

      if (
        pictureLinesResponse.data.pictureLines &&
        pictureLinesResponse.data.pictureLines.length > 0
      ) {
        // Redux 상태 업데이트
        dispatch(setPictureLines(pictureLinesResponse.data.pictureLines));
        dispatch(updateLines(pictureLinesResponse.data.pictureLines));

        // 캔버스를 만들고 이미지 변환 후 Redux 저장
        const imageDataUrl = await convertLinesToImage(
          pictureLinesResponse.data.pictureLines
        );
        dispatch(setPicture(imageDataUrl));
      }
    } catch (error) {
      console.error("일기 라인 불러오기 실패", error);
    }
  };

  // 임시저장 일기 선택
  const onSelectDraft = async (draft: Diary) => {
    const isDiary = await verifyDiaryEntry(draft.date);

    if (isDiary?.data) {
      // 이미 작성된 날짜의 임시저장 일기라면 모달 표시
      setPendingDiaryId(isDiary.data);
      setIsModalOpen(true);
    } else {
      // 새롭게 작성하는 경우
      proceedToEdit(draft);
    }
  };

  // 확인 버튼을 눌렀을 때만 페이지 이동
  const proceedToEdit = (draft: Diary) => {
    handlePictureLines(draft.diaryId);
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
      router.push(`/write-diary?id=${pendingDiaryId}`);
      setPendingDiaryId(null);
    }
  };

  return (
    <div className="w-full flex flex-row gap-2 p-4 border-b border-gray-100 last:border-b-0 relative">
      {/* 제목, 날짜, 내용 클릭 가능 영역 */}
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
