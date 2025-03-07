import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";

interface FeedEmojiButtonProps {
  emoji: Feeling;
}

export default function FeedEmojiButton({ emoji }: FeedEmojiButtonProps) {
  const { icon } = FeelingsIcon({ feeling: emoji, size: "w-4 h-4" });
  return <button>{icon}</button>;
}
