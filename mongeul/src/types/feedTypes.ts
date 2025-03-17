import { BaseDiary, Feeling } from "./diaryTypes";

export interface Emoji {
  emojiType: Feeling;
  count: number;
}

export interface FeedEmoji extends Emoji {
  isSelected: boolean;
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
  emojis: FeedEmoji[];
}

export interface FeedDetailResponse {
  success: boolean;
  message: string;
  data: FeedDetail;
}

export interface FeedEmojiresponse {
  success: boolean;
  message: string;
  data: Record<string, unknown>;
}
