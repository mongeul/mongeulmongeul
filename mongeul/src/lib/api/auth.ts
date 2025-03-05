import { apiClient } from "./apiClient";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/userSlice";

// 카카오 로그인 URL 가져오기
export const getKakaoLoginUrl = async (): Promise<string> => {
  const data = await apiClient("/api/auth/kakao", { method: "GET" });
  return data.data.loginUrl;
};
export const redirectToKakaoLogin = async () => {
  const loginUrl = await getKakaoLoginUrl();
  window.location.href = loginUrl; // 카카오 로그인 페이지로 이동
};

// 카카오 로그인 처리
export const handleKakaoLogin = async (
  kakaoToken: string,
  dispatch: AppDispatch
) => {
  try {
    console.log("📡 카카오 로그인 요청 시작, 토큰:", kakaoToken);
    const data = await apiClient("/api/auth/kakao", {
      method: "POST",
      body: JSON.stringify({ kakaoToken }),
    });
    console.log("🟢카카오 로그인 응답:", data);

    if (data.success) {
      const { accessToken, user } = data.data;
      console.log("🔍 로그인 후 받은 유저 정보:", user);

      dispatch(setUser({ ...user, accessToken }));
      localStorage.setItem("accessToken", accessToken);

      return user;
    }
    return null;
  } catch (error) {
    console.error("❌ 로그인 실패: 에러 객체:", error);

    let errorMessage = "알 수 없는 오류 발생";

    // error가 Error 객체인지 확인 후 message에 접근
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error
    ) {
      errorMessage = String(error.message);
    }

    console.log("🔴 에러 메시지:", errorMessage);

    // KOE320 에러가 발생했을 경우, 카카오 로그인 페이지로 이동
    if (errorMessage.includes("KOE320")) {
      console.log("🔄 인가 코드 만료! 카카오 로그인 페이지로 이동");
      sessionStorage.removeItem("usedKakaoCode"); // 기존 코드 삭제
      redirectToKakaoLogin(); // 새로운 카카오 로그인 요청
    }

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
