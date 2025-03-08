import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";
import { useParams } from "next/navigation";

interface FeedEmojiButtonProps {
  emoji: Feeling;
}

export default function FeedEmojiButton({ emoji }: FeedEmojiButtonProps) {
  const { id } = useParams();
  const { icon } = FeelingsIcon({ feeling: emoji, size: "w-4 h-4" });

  const submitEmoji = () => {
    console.log("이모지 버튼 클릭");
  };
  return <button onClick={submitEmoji}>{icon}</button>;
}
