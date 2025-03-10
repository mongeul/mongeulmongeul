import { Diary, Draft } from "@/types/diaryTypes";
import { formatDate } from "@/utils/formatDate";
import CloseIcon from "@/assets/icons/close.svg";
import { deleteDraft, fetchPictureLines } from "@/lib/api/write-diary";
import {
  setContent,
  setDate,
  setFeeling,
  setPrivateStatus,
  setTitle,
  setWeather,
  setPictureLines,
} from "@/store/diarySlice";
import { useDispatch } from "react-redux";
import { updateLines } from "@/store/pictureSlice";

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

  // 임시저장 일기 삭제
  const handleDelete = async (diaryId: number) => {
    try {
      await deleteDraft(diaryId);
      onDelete(diaryId);
    } catch (error) {
      console.error("일기 삭제 실패:", error);
    }
  };

  // 임시저장 일기 라인 조회
  const handlePictureLines = async (diaryId: number) => {
    try {
      const pictureLinesResponse = await fetchPictureLines(diaryId);
      console.log(pictureLinesResponse);

      if (pictureLinesResponse.pictureLines) {
        // diary Redux에 라인 저장
        dispatch(setPictureLines(pictureLinesResponse.pictureLines));

        // picture Redux에 라인 저장
        dispatch(updateLines(pictureLinesResponse.pictureLines));
      }
    } catch (error) {
      console.error("일기 라인 불러오기 실패", error);
    }
  };

  // 임시저장 일기 선택
  const onSelectDraft = (draft: Diary) => {
    handlePictureLines(draft.diaryId);
    dispatch(setTitle(draft.title));
    dispatch(setContent(draft.content));
    dispatch(setDate(draft.date));
    dispatch(setFeeling(draft.feeling));
    dispatch(setPrivateStatus(draft.privateStatus));
    dispatch(setWeather(draft.weather));

    onClose();
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
    </div>
  );
}
