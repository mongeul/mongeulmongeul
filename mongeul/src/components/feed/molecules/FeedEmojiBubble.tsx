import Bubble from "@/components/common/atoms/Bubble";
import FeedEmojiButton from "../atoms/FeedEmojiButton";
import { Feeling } from "@/types/diaryTypes";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function FeedEmojiBubble() {
  const feedEmojis = useSelector(
    (state: RootState) => state.feed.feedDetailEmojis
  );

  const emojis: Feeling[] = ["HAPPY", "SAD", "ANGRY", "WOW", "SOSO"];

  return (
    <Bubble>
      {emojis.map((emoji) => {
        const isSelected = feedEmojis.some(
          (e) => e.emojiType === emoji && e.isSelected
        );

        return (
          <FeedEmojiButton key={emoji} emoji={emoji} isSelected={isSelected} />
        );
      })}
    </Bubble>
  );
}
