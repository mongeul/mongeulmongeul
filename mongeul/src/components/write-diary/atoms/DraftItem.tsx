import Image from "next/image";
import { Diary } from "@/types/diaryTypes";
import { formatDate } from "@/utils/formatDate";
import CloseIcon from "@/assets/icons/close.svg";

interface DraftItemProps {
  draft: Diary;
}

export default function DraftItem({ draft }: DraftItemProps) {
  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full flex flex-col p-4 gap-2">
        <div className="flex flex-row w-full justify-between">
          {/* 제목 및 날짜 */}
          <div className="w-full flex gap-2 items-center">
            <span className="text-sm font-semibold text-gray-600 truncate">
              {draft.title || "제목없음"}
            </span>
            <span className="text-2xs text-gray-400">
              {formatDate(draft.date)}
            </span>
          </div>
          {/* 삭제 버튼 */}
          <CloseIcon className="h-4 w-4 text-gray-300" />
        </div>
        <div>
          {/* 내용 */}
          <div className="w-full text-xs text-gray-500 line-clamp-2 overflow-hidden">
            {draft.content || "내용없음"}
          </div>
          {/* 사진 */}
          {draft.picture && (
            <div className="w-full flex justify-center items-stretch">
              <div className="w-full h-auto max-h-[120px] flex items-center">
                <Image
                  src={draft.picture}
                  alt="임시 저장된 그림"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-auto h-full rounded-md object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
