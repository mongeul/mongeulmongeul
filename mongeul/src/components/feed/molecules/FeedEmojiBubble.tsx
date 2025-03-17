import Bubble from "@/components/common/atoms/Bubble";
import FeedEmojiButton from "../atoms/FeedEmojiButton";
import { Feeling } from "@/types/diaryTypes";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleEmoji } from "@/store/feedSlice";
import { getEmojiId } from "@/utils/getEmojiId";
import { useParams } from "next/navigation";
import { addEmoji, removeEmoji } from "@/lib/api/feed";

export default function FeedEmojiBubble() {
  const { id } = useParams();
  const diaryId = Number(id);
  const dispatch = useDispatch();

  const feedEmojis = useSelector(
    (state: RootState) => state.feed.feedDetailEmojis
  );

  const emojis: Feeling[] = ["HAPPY", "SAD", "ANGRY", "WOW", "SOSO"];

  const toggleButton = async (isSelected: boolean, emoji: Feeling) => {
    if (!diaryId) return;
    const emojiId = getEmojiId(emoji);
    dispatch(toggleEmoji(emoji));

    try {
      if (isSelected) {
        await removeEmoji(diaryId, emojiId);
      } else {
        await addEmoji(diaryId, emojiId);
      }
    } catch (error) {
      console.error("이모지 업데이트 실패:", error);
      dispatch(toggleEmoji(emoji));
    }
  };

  return (
    <Bubble>
      {emojis.map((emoji) => {
        const isSelected = feedEmojis.some(
          (e) => e.emojiType === emoji && e.isSelected
        );

        return (
          <button key={emoji} onClick={() => toggleButton(isSelected, emoji)}>
            <FeedEmojiButton emoji={emoji} />
          </button>
        );
      })}
    </Bubble>
  );
}
