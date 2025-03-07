import Button from "@/components/common/atoms/Button";
import { Feeling } from "@/types/diaryTypes";
import FeedEmojiButton from "./FeedEmojiButton";

interface FeedEmojiCountButtonProps {
  emoji: Feeling;
  count: number;
}

export default function FeedEmojiCountButton({
  emoji,
  count,
}: FeedEmojiCountButtonProps) {
  const toggleButton = () => {
    console.log("이모티콘 클릭");
  };

  const icon = <FeedEmojiButton emoji={emoji} />;

  return <Button text={String(count)} icon={icon} onClick={toggleButton} />;
}
