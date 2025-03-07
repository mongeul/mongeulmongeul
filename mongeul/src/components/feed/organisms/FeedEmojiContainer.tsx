import { Emoji } from "@/types/feedTypes";
import FeedEmojiGroup from "../molecules/FeedEmojiGroup";
import FeedLikeButton from "../atoms/FeedLikeButton";

interface FeedEmojiContainerProps {
  emojis: Emoji[];
}

export default function FeedEmojiContainer({
  emojis,
}: FeedEmojiContainerProps) {
  return (
    <div className="flex flex-row gap-2 h-auto">
      <FeedLikeButton />
      <FeedEmojiGroup emojis={emojis} />
    </div>
  );
}
