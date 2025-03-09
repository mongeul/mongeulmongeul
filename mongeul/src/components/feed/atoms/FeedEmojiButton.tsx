import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";

interface FeedEmojiButtonProps {
  emoji: Feeling;
}

export default function FeedEmojiButton({ emoji }: FeedEmojiButtonProps) {
  const { icon } = FeelingsIcon({ feeling: emoji, size: "w-2 h-2" });

  return <div>{icon}</div>;
}
