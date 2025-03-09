import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleEmoji } from "@/store/feedSlice"; // Redux 액션 사용
import { postFeedEmoji, deleteFeedEmoji } from "@/actions/feed"; // API 함수 호출
import { getEmojiId } from "@/utils/getEmojiId";

interface FeedEmojiButtonProps {
  emoji: Feeling;
  isSelected: boolean;
}

export default function FeedEmojiButton({
  emoji,
  isSelected,
}: FeedEmojiButtonProps) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { icon } = FeelingsIcon({ feeling: emoji, size: "w-2 h-2" });

  const handleClick = async () => {
    if (!id) return;

    dispatch(toggleEmoji(emoji));

    try {
      if (isSelected) {
        await deleteFeedEmoji(Number(id), getEmojiId(emoji));
      } else {
        await postFeedEmoji(Number(id), getEmojiId(emoji));
      }
    } catch (error) {
      console.error("이모지 업데이트 실패:", error);
    }
  };

  return <div onClick={handleClick}>{icon}</div>;
}
