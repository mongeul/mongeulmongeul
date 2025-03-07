import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";

interface FeedEmojiButtonProps {
  emoji: Feeling;
}

export default function FeedEmojiButton({ emoji }: FeedEmojiButtonProps) {
  const { icon } = FeelingsIcon({ feeling: emoji });
  return <button>{icon}</button>;
}
