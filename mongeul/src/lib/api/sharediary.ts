import { apiClient } from "./apiClient";

export interface Friend {
  friendId: number;
  nickname: string;
  day: number;
  count: number;
  isWriter: boolean;
}

// 친구 목록 조회 API
export const getFriends = async (): Promise<Friend[]> => {
  try {
    const response = await apiClient("/api/v1/friend");
    if (response.data.success) {
      return response.data.data.content;
    }
    return [];
  } catch (error) {
    console.error("친구 목록 불러오기 실패:", error);
    return [];
  }
};

//친구 코드 발급 API (코드 생성)
export const generateFriendCode = async () => {
  try {
    const response = await apiClient("/api/v1/friend/code");
    return response.data;
  } catch (error) {
    console.error("친구 코드 발급 실패:", error);
    throw error;
  }
};

// 친구 조회 API (코드로 친구 닉네임 가져오기)
export const getFriendByCode = async (code: string) => {
  try {
    const response = await apiClient(`/api/v1/friend/${code}`);
    return response.data;
  } catch (error) {
    console.error("친구 코드 조회 실패:", error);
    throw error;
  }
};

// 친구 추가 API (코드 입력 후 친구 등록)
export const addFriend = async (code: string) => {
  try {
    const response = await apiClient("/api/v1/friend", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    return response;
  } catch (error) {
    console.error("친구 추가 실패:", error);
    throw error;
  }
};
