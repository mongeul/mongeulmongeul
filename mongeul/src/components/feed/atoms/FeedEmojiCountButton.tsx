import { throttle } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

import Button from "@/components/common/atoms/Button";
import FeedEmojiButton from "./FeedEmojiButton";
import { getEmojiId } from "@/utils/getEmojiId";
import { toggleEmoji } from "@/store/feedSlice";
import { addEmoji, removeEmoji } from "@/lib/api/feed";
import { Feeling } from "@/types/diaryTypes";
import { RootState } from "@/store/store";

interface FeedEmojiCountButtonProps {
  emoji: Feeling;
}

export default function FeedEmojiCountButton({
  emoji,
}: FeedEmojiCountButtonProps) {
  const { id } = useParams();
  const diaryId = Number(id);
  const dispatch = useDispatch();
  const emojiId = getEmojiId(emoji);
  const [isLoading, setIsLoading] = useState(false);

  // 현재 이모지 상태
  const emojiState = useSelector((state: RootState) =>
    state.feed.feedDetailEmojis.find((e) => e.emojiType === emoji)
  );
  const count = emojiState?.count ?? 0;
  const isSelected = emojiState?.isSelected ?? false;

  // stale closure 문제 방지 -> useRef로 최신 상태 추적
  const isSelectedRef = useRef(isSelected);
  useEffect(() => {
    isSelectedRef.current = isSelected;
  }, [isSelected]);

  // throttled 함수: 1초에 한 번만 실행되도록 제한
  const throttledToggle = useRef(
    throttle(async () => {
      if (!diaryId || isLoadingRef.current) return;

      setIsLoading(true);
      dispatch(toggleEmoji(emoji));

      try {
        if (isSelectedRef.current) {
          await removeEmoji(diaryId, emojiId);
        } else {
          await addEmoji(diaryId, emojiId);
        }
      } catch (err) {
        dispatch(toggleEmoji(emoji));
        console.error("이모지 업데이트 실패:", err);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
        isLoadingRef.current = false;
      }
    }, 1000)
  ).current;

  const isLoadingRef = useRef(isLoading);
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    return () => {
      throttledToggle.cancel();
    };
  }, [throttledToggle]);

  const icon = <FeedEmojiButton emoji={emoji} />;
  const displayCount = count >= 1000 ? "+999" : String(count);

  return (
    <Button
      text={displayCount}
      borderColor="border border-theme-400"
      backgroundColor={isSelected ? "bg-theme-300" : "bg-theme-50"}
      padding="px-2 py-1"
      icon={icon}
      onClick={throttledToggle}
    />
  );
}
