import { apiClient } from "./apiClient";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/userSlice";

// 카카오 로그인 URL 가져오기
export const getKakaoLoginUrl = async (): Promise<string> => {
  const data = await apiClient("/api/auth/kakao", { method: "GET" });
  return data.data.loginUrl;
};

// 카카오 로그인 처리
export const handleKakaoLogin = async (
  kakaoToken: string,
  dispatch: AppDispatch
) => {
  try {
    const data = await apiClient("/api/auth/kakao", {
      method: "POST",
      body: JSON.stringify({ kakaoToken }),
    });
    console.log("카카오 로그인 응답:", data);

    if (data.success) {
      dispatch(setUser(data.data.user)); // Redux에 사용자 정보 저장
      return data.data.user;
    }
    return null;
  } catch (error) {
    console.error("로그인 실패:", error);
    return null;
  }
};

// 닉네임 설정 API
export const updateUserNickname = async (
  nickname: string,
  dispatch: AppDispatch
) => {
  try {
    const data = await apiClient("/api/user/nickname", {
      method: "POST",
      body: JSON.stringify({ nickname }),
    });

    if (data.success) {
      dispatch(setUser({ ...data.data, nickname })); // Redux에 닉네임 업데이트
      return true;
    }
    return false;
  } catch (error) {
    console.error("닉네임 설정 실패:", error);
    return false;
  }
};
