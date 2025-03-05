import { getFeedDetail, getFeedList } from "@/actions/feed";
import { FeedDetailResponse, FeedListResponse } from "@/types/feedTypes";

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
