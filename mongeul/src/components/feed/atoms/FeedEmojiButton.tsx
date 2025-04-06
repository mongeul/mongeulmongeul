import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";

interface FeedEmojiButtonProps {
  emoji: Feeling;
}

export default function FeedEmojiButton({ emoji }: FeedEmojiButtonProps) {
  const { icon } = FeelingsIcon({ feeling: emoji, size: "w-8 h-8" });

  return <div>{icon}</div>;
}
