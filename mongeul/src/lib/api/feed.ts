import { getFeedDetail, getFeedList, postFeedEmoji } from "@/actions/feed";
import {
  FeedDetailResponse,
  FeedEmojiresponse,
  FeedListResponse,
} from "@/types/feedTypes";

// 피드 리스트 불러오기
export async function fetchFeedList(
  pageSize: number,
  lastDiaryId: number | null,
  myFeed: boolean
): Promise<FeedListResponse> {
  return await getFeedList(pageSize, lastDiaryId, myFeed);
}

// 피드 디테일 불러오기
export async function fetchFeedDetail(
  feedId: number
): Promise<FeedDetailResponse> {
  return await getFeedDetail(feedId);
}

// 피드 감정 표현 추가
export async function submitFeedEmoji(
  feedId: number,
  emojiId: number
): Promise<FeedEmojiresponse> {
  return await postFeedEmoji(feedId, emojiId);
}

// 피드 감정 표현 삭제
export async function deleteFeedEmoji(
  feedId: number,
  emojiId: number
): Promise<FeedEmojiresponse> {
  return await deleteFeedEmoji(feedId, emojiId);
}
