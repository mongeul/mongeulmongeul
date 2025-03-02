import { FeedsResponse } from "@/types/feedTypes";

// 피드 리스트 조회
export async function getFeedsList(
  pageSize: number,
  lastDiaryId: number | null,
  myFeed: boolean
): Promise<FeedsResponse> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const queryParams = new URLSearchParams({
      pageSize: pageSize.toString(),
      myFeed: myFeed.toString(),
    });

    if (lastDiaryId !== null) {
      queryParams.append("lastDiaryId", lastDiaryId.toString());
    }

    const response = await fetch(
      `${API_BASE_URL}/api/v1/feeds?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`피드 리스트 조회 실패: ${errorMessage}`);
    }

    const result: FeedsResponse = await response.json();
    return result;
  } catch (error) {
    console.error("피드 리스트 조회 에러:", error);
    throw error;
  }
}
