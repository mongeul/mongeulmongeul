import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import FeedEmojiCountButton from "../atoms/FeedEmojiCountButton";

export default function FeedEmojiGroup() {
  const emojis = useSelector((state: RootState) => state.feed.feedDetailEmojis);

  return (
    <div className="flex flex-row gap-2">
      {emojis.map((emoji) => {
        return (
          <FeedEmojiCountButton
            key={emoji.emojiType}
            emoji={emoji.emojiType}
            count={emoji.count}
            isSelected={emoji.isSelected}
          />
        );
      })}
    </div>
  );
}
