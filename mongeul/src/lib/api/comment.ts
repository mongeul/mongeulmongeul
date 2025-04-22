import { apiClient } from "@/lib/api/apiClient";

// 댓글 타입
export interface FeedComment {
  commentId: number;
  content: string;
  parentCommentId: number | null;
  createdAt: string;
  modifiedAt: string;
}

export interface FeedCommentResponse {
  success: boolean;
  data: FeedComment[];
  message: string;
}

export interface SingleFeedCommentResponse {
  success: boolean;
  data: FeedComment;
  message: string;
}

// 댓글 목록 조회 (GET)
export async function fetchComments(
  feedId: number
): Promise<FeedCommentResponse> {
  try {
    return await apiClient(`/api/v1/feeds/${feedId}/comments`, {
      method: "GET",
      cache: "no-cache",
    });
  } catch (error) {
    console.error(`댓글 조회 실패! feedId: ${feedId}`, error);
    throw error;
  }
}

// 댓글 작성 (POST)
export async function createComment(
  feedId: number,
  content: string,
  parentCommentId: number | null = null
): Promise<SingleFeedCommentResponse> {
  try {
    const response = await apiClient(`/api/v1/feeds/${feedId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        content,
        parentCommentId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ 댓글 작성 성공:", response);
    return response;
  } catch (error) {
    console.error(`❌ 댓글 작성 실패! feedId: ${feedId}`, error);
    throw error;
  }
}

// 댓글 수정 (PUT)
export async function updateComment(
  commentId: number,
  content: string
): Promise<SingleFeedCommentResponse> {
  try {
    return await apiClient(`/api/v1/comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`댓글 수정 실패! commentId: ${commentId}`, error);
    throw error;
  }
}

// 댓글 삭제 (DELETE)
export async function deleteComment(
  commentId: number
): Promise<{ success: boolean; data: object; message: string }> {
  try {
    return await apiClient(`/api/v1/comments/${commentId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`댓글 삭제 실패! commentId: ${commentId}`, error);
    throw error;
  }
}

// 댓글 신고 (POST)
export async function reportComment(
  commentId: number
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await apiClient(`/api/v1/comments/report`, {
      method: "POST",
      body: JSON.stringify({ commentId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("🚨 댓글 신고 성공:", response);
    return response;
  } catch (error) {
    console.error("❌ 댓글 신고 실패:", error);
    throw error;
  }
}
