import Bubble from "@/components/common/atoms/Bubble";
import FeedEmojiButton from "../atoms/FeedEmojiButton";
import { Feeling } from "@/types/diaryTypes";

export default function FeedEmojiBubble() {
  const emojis: {
    emojiId: number;
    label: Feeling;
  }[] = [
    { emojiId: 1, label: "HAPPY" },
    { emojiId: 2, label: "SAD" },
    { emojiId: 3, label: "WOW" },
    { emojiId: 4, label: "SOSO" },
    { emojiId: 5, label: "ANGRY" },
  ];
  return (
    <Bubble>
      {emojis.map((emoji) => (
        <FeedEmojiButton key={emoji.emojiId} emoji={emoji.label} />
      ))}
    </Bubble>
  );
}
