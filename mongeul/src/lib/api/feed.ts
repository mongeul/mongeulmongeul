import {
  addFeedEmoji,
  fetchFeedDetail,
  fetchFeedList,
  removeFeedEmoji,
} from "@/actions/feed";
import {
  FeedDetailResponse,
  FeedEmojiresponse,
  FeedListResponse,
} from "@/types/feedTypes";

// 피드 리스트 불러오기
export async function getFeeds(
  pageSize: number,
  lastDiaryId: number | null,
  myFeed: boolean
): Promise<FeedListResponse> {
  return await fetchFeedList(pageSize, lastDiaryId, myFeed);
}

// 피드 디테일 불러오기
export async function getFeedById(feedId: number): Promise<FeedDetailResponse> {
  return await fetchFeedDetail(feedId);
}

// 피드 감정 표현 추가
export async function addEmojiToFeed(
  feedId: number,
  emojiId: number
): Promise<FeedEmojiresponse> {
  return await addFeedEmoji(feedId, emojiId);
}

// 피드 감정 표현 삭제
export async function removeEmojiFromFeed(
  feedId: number,
  emojiId: number
): Promise<FeedEmojiresponse> {
  return await removeFeedEmoji(feedId, emojiId);
}
