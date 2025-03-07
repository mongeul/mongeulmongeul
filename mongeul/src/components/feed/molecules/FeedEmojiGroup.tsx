import { Emoji } from "@/types/feedTypes";
import FeedEmojiCountButton from "../atoms/FeedEmojiCountButton";

interface FeedEmojiGroupProps {
  emojis: Emoji[];
}

export default function FeedEmojiGroup({ emojis }: FeedEmojiGroupProps) {
  return (
    <div>
      {emojis.map((emoji) => {
        return (
          <FeedEmojiCountButton emoji={emoji.emojiType} count={emoji.count} />
        );
      })}
    </div>
  );
}
