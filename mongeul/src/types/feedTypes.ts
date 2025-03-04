import { BaseDiary, Feeling } from "./diaryTypes";

export interface Emoji {
  emojiType: Feeling;
  count: number;
}

export interface FeedPreview {
  feedId: number;
  feeling: Feeling;
}

export interface Feed extends BaseDiary {
  feedId: number;
  emojis: Emoji[];
}

export interface FeedResponse {
  success: boolean;
  message: string;
  data: Feed[];
}

export interface FeedsResponse {
  success: boolean;
  message: string;
  data: FeedPreview[];
}
