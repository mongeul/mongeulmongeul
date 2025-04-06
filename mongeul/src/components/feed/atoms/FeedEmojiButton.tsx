import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";

interface FeedEmojiButtonProps {
  emoji: Feeling;
}

export default function FeedEmojiButton({ emoji }: FeedEmojiButtonProps) {
  return (
    <div>
      <FeelingsIcon feeling={emoji} size="w-8 h-8" />
    </div>
  );
}
