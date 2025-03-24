import Button from "@/components/common/atoms/Button";
import { Feeling } from "@/types/diaryTypes";
import FeedEmojiButton from "./FeedEmojiButton";
import { toggleEmoji } from "@/store/feedSlice";
import { getEmojiId } from "@/utils/getEmojiId";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addEmoji, removeEmoji } from "@/lib/api/feed";

interface FeedEmojiCountButtonProps {
  emoji: Feeling;
  count: number;
  isSelected: boolean;
}

export default function FeedEmojiCountButton({
  emoji,
  count,
  isSelected,
}: FeedEmojiCountButtonProps) {
  const { id } = useParams();
  const diaryId = Number(id);
  const dispatch = useDispatch();
  const emojiId = getEmojiId(emoji);

  const toggleButton = async () => {
    if (!diaryId) return;

    // UI 상태 먼저 변경
    dispatch(toggleEmoji(emoji));

    try {
      if (isSelected) {
        await removeEmoji(diaryId, emojiId);
      } else {
        await addEmoji(diaryId, emojiId);
      }
    } catch (error) {
      console.error("이모지 업데이트 실패:", error);

      // 요청 실패 시 상태 롤백
      dispatch(toggleEmoji(emoji));
    }
  };

  const icon = <FeedEmojiButton emoji={emoji} />;
  const feelingCount = count >= 1000 ? "+999" : String(count);

  return (
    <Button
      text={feelingCount}
      borderColor="border border-theme-400"
      backgroundColor={isSelected ? "bg-theme-300" : "bg-theme-50"}
      padding="px-2 py-1"
      icon={icon}
      onClick={toggleButton}
    />
  );
}
