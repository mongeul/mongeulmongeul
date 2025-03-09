import { Feeling } from "@/types/diaryTypes";

const emojiMap: Record<Feeling, number> = {
  HAPPY: 1,
  SAD: 2,
  ANGRY: 3,
  WOW: 4,
  SOSO: 5,
};

export function getEmojiId(feeling: Feeling): number {
  return emojiMap[feeling] ?? -1;
}
