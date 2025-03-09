import { Feeling } from "@/types/diaryTypes";
import {
  FeedDetailResponse,
  FeedEmojiresponse,
  FeedListResponse,
} from "@/types/feedTypes";

// 피드 리스트 조회
export async function getFeedList(
  pageSize: number,
  lastDiaryId: number | null,
  myFeed: boolean
): Promise<FeedListResponse> {
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

    const result: FeedListResponse = await response.json();
    return result;
  } catch (error) {
    console.error("피드 리스트 조회 에러:", error);
    throw error;
  }
}

// 피드 단일 게시물 조회
export async function getFeedDetail(
  feedId: number
): Promise<FeedDetailResponse> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/api/v1/feeds/${feedId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`피드 디테일 조회 실패: ${errorMessage}`);
    }

    const result: FeedDetailResponse = await response.json();
    return result;
  } catch (error) {
    console.error("피드 디테일 조회 에러:", error);
    throw error;
  }
}

// 피드 감정표현 추가
export async function postFeedEmoji(
  feedId: number,
  emojiId: number
): Promise<FeedEmojiresponse> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(
      `${API_BASE_URL}/api/v1/feeds/${feedId}/emojis/${emojiId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`피드 이모지 추가 실패: ${errorMessage}`);
    }

    const result: FeedEmojiresponse = await response.json();
    return result;
  } catch (error) {
    console.error("피드 이모지 추가 에러:", error);
    throw error;
  }
}

// 피드 감정표현 삭제
export async function deleteFeedEmoji(
  feedId: number,
  emojiId: number
): Promise<FeedEmojiresponse> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(
      `${API_BASE_URL}/api/v1/feeds/${feedId}/emojis/${emojiId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`피드 이모지 삭제 실패: ${errorMessage}`);
    }

    if (response.status === 204) {
      return { success: true, message: "이모지 삭제 성공", data: null };
    }

    const result: FeedEmojiresponse = await response.json();
    return result;
  } catch (error) {
    console.error("피드 이모지 삭제 에러:", error);
    throw error;
  }
}
