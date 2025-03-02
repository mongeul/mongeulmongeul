import { getFeedsList } from "@/actions/feed";
import { FeedsResponse } from "@/types/feedTypes";

// 피드 리스트 불러오기
export async function fetchFeedsList(
  pageSize: number,
  lastDiaryId: number | null,
  myFeed: boolean
): Promise<FeedsResponse> {
  return await getFeedsList(pageSize, lastDiaryId, myFeed);
}
