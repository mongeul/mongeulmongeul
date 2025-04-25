import { throttle } from "lodash";
import { useCallback, useMemo } from "react";
import Button from "@/components/common/atoms/Button";
import { Feeling } from "@/types/diaryTypes";
import FeedEmojiButton from "./FeedEmojiButton";
import { toggleEmoji } from "@/store/feedSlice";
import { getEmojiId } from "@/utils/getEmojiId";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addEmoji, removeEmoji } from "@/lib/api/feed";

interface FeedEmojiCountButtonProps {
  emoji: Feeling;
  count: number;
  isSelected: boolean;
}

export default function FeedEmojiCountButton({
  emoji,
  count,
  isSelected,
}: FeedEmojiCountButtonProps) {
  const { id } = useParams();
  const diaryId = Number(id);
  const dispatch = useDispatch();
  const emojiId = getEmojiId(emoji);

  // toggle 핸들러 (throttle 내부용)
  const handleToggle = useCallback(async () => {
    if (!diaryId) return;

    // UI 먼저 업데이트
    dispatch(toggleEmoji(emoji));

    try {
      if (isSelected) {
        await removeEmoji(diaryId, emojiId);
      } else {
        await addEmoji(diaryId, emojiId);
      }
    } catch (error) {
      console.error("이모지 업데이트 실패:", error);
      dispatch(toggleEmoji(emoji)); // 실패시 롤백
    }
  }, [diaryId, dispatch, emoji, emojiId, isSelected]);

  // handleToggle을 throttle로 감싸서 과도한 요청 방지
  // useMemo로 감싸서 리렌더링 때마다 새로 생성되지 않게 함
  const throttledToggle = useMemo(
    () => throttle(handleToggle, 1000), // 1초에 1번 제한
    [handleToggle]
  );

  const icon = <FeedEmojiButton emoji={emoji} />;
  const feelingCount = count >= 1000 ? "+999" : String(count);

  return (
    <Button
      text={feelingCount}
      borderColor="border border-theme-400"
      backgroundColor={isSelected ? "bg-theme-300" : "bg-theme-50"}
      padding="px-2 py-1"
      icon={icon}
      onClick={throttledToggle}
    />
  );
}
