import Bubble from "@/components/common/atoms/Bubble";
import FeedEmojiButton from "../atoms/FeedEmojiButton";
import { Feeling } from "@/types/diaryTypes";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteFeedEmoji, postFeedEmoji } from "@/actions/feed";
import { toggleEmoji } from "@/store/feedSlice";
import { getEmojiId } from "@/utils/getEmojiId";
import { useParams } from "next/navigation";

export default function FeedEmojiBubble() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const feedEmojis = useSelector(
    (state: RootState) => state.feed.feedDetailEmojis
  );

  const emojis: Feeling[] = ["HAPPY", "SAD", "ANGRY", "WOW", "SOSO"];

  const toggleButton = async (isSelected: boolean, emoji: Feeling) => {
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
