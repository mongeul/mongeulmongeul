import Image from "next/image";
import { Diary } from "@/types/diaryTypes";
import { formatDate } from "@/utils/formatDate";

interface DraftItemProps {
  draft: Diary;
}

export default function DraftItem({ draft }: DraftItemProps) {
  return (
    <div className="w-full flex flex-col p-4">
      <div className="w-full flex gap-2 items-center">
        <span className="text-sm font-semibold text-gray-600 truncate">
          {draft.title || "제목없음"}
        </span>
        <span className="text-2xs text-gray-400">{formatDate(draft.date)}</span>
      </div>
      <div className="text-xs text-gray-500 truncate whitespace-nowrap overflow-hidden text-ellipsis">
        {draft.content || "내용없음"}
      </div>

      <div className="w-full flex justify-center items-stretch">
        {draft.picture && (
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
        )}
      </div>
    </div>
  );
}
