import { apiClient } from "@/lib/api/apiClient";
import {
  FeedDetailResponse,
  FeedEmojiresponse,
  FeedListResponse,
} from "@/types/feedTypes";

// 피드 리스트 조회
export async function fetchFeeds(
  pageSize: number,
  lastDiaryId: number | null,
  myFeed: boolean
): Promise<FeedListResponse> {
  const queryParams = new URLSearchParams({
    pageSize: pageSize.toString(),
    myFeed: myFeed.toString(),
  });

  if (lastDiaryId !== null) {
    queryParams.append("lastDiaryId", lastDiaryId.toString());
  }

  return apiClient(`/api/v1/feeds?${queryParams.toString()}`, {
    method: "GET",
    cache: "force-cache",
  });
}

// 피드 단일 게시물 조회
export async function fetchFeedById(
  feedId: number
): Promise<FeedDetailResponse> {
  try {
    const response = await apiClient(`/api/v1/feeds/${feedId}`, {
      method: "GET",
      cache: "force-cache",
    });
    return response;
  } catch (error) {
    console.error(`피드 조회 실패! feedId: ${feedId}, 오류:`, error);
    throw error;
  }
}

// 피드 감정표현 추가
export async function addEmoji(
  feedId: number,
  emojiId: number
): Promise<FeedEmojiresponse> {
  return apiClient(`/api/v1/feeds/${feedId}/emojis/${emojiId}`, {
    method: "POST",
    cache: "no-cache",
  });
}

// 피드 감정표현 삭제
export async function removeEmoji(
  feedId: number,
  emojiId: number
): Promise<FeedEmojiresponse> {
  return apiClient(`/api/v1/feeds/${feedId}/emojis/${emojiId}`, {
    method: "DELETE",
    cache: "no-cache",
  });
}
