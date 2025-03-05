import { BaseDiary, Feeling } from "./diaryTypes";

export interface Emoji {
  emojiType: Feeling;
  count: number;
}

export interface FeedListItem {
  feedId: number;
  feeling: Feeling;
}

export interface FeedListResponse {
  success: boolean;
  message: string;
  data: FeedListItem[];
}

export interface FeedDetail extends BaseDiary {
  feedId: number;
  emojis: Emoji[];
}

export interface FeedDetailResponse {
  success: boolean;
  message: string;
  data: FeedDetail[];
}
