import { apiClient } from "./apiClient";

export interface Friend {
  friendId: number;
  nickname: string;
  daysFromStart: number;
  diaryCount: number;
  writer: boolean;
}

// 친구 목록 조회 API
export const getFriends = async (): Promise<Friend[]> => {
  try {
    const response = await apiClient("/api/v1/friend");

    console.log("📢 API 요청 응답:", response);

    if (response.success && Array.isArray(response.data)) {
      console.log("✅ 친구 목록 조회 성공:", response.data);
      return response.data;
    }

    if (response.success && response.data.data) {
      console.log("✅ 친구 목록 조회 성공 (data.data):", response.data.data);
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ 친구 목록 불러오기 실패:", error);
    return [];
  }
};

//친구 코드 발급 API (코드 생성)
export const generateFriendCode = async () => {
  try {
    const response = await apiClient("/api/v1/friend/code");
    console.log("API 응답 전체:", response);
    return response;
  } catch (error) {
    console.error("친구 코드 발급 실패:", error);
    throw error;
  }
};

// 친구 조회 API (코드로 친구 닉네임 가져오기)
export const getFriendByCode = async (code: string) => {
  try {
    const response = await apiClient(`/api/v1/friend/${code}`);
    return response;
  } catch (error) {
    console.error("친구 코드 조회 실패:", error);
    throw error;
  }
};

// 친구 추가 API (코드 입력 후 친구 등록)
export const addFriend = async (code: string) => {
  try {
    const response = await apiClient(`/api/v1/friend?code=${code}`, {
      method: "POST",
    });
    return response;
  } catch (error) {
    console.error("친구 추가 실패:", error);
    throw error;
  }
};

// 친구 삭제 API (delete)
export const deleteFriend = async (friendId: number) => {
  try {
    const response = await apiClient(`/api/v1/friend/${friendId}`, {
      method: "DELETE",
    });
    console.log("친구 삭제 성공:", response);
    return response;
  } catch (error) {
    console.error("친구 삭제 실패:", error);
    throw error;
  }
};
