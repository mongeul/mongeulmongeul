import { apiClient, getCookie } from "./apiClient";
import { AppDispatch } from "@/store/store";
import { setUser, clearUser } from "@/store/userSlice";

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
      const { accessToken, refreshToken, user } = data.data;
      console.log("🔍 로그인 후 받은 유저 정보:", user);

      dispatch(setUser({ ...user }));
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict; max-age=1800`;
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict; max-age=604800`;

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

// 로그아웃 API
export const handleLogout = async (dispatch: AppDispatch) => {
  try {
    console.log("📡 로그아웃 요청 시작");

    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (!accessToken || !refreshToken) {
      console.error("❌ 저장된 토큰이 없습니다.");
      return;
    }

    const data = await apiClient("/api/user/logout", {
      method: "POST",
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    if (data.success) {
      console.log("🟢 로그아웃 성공!");

      dispatch(clearUser()); // Redux 상태 초기화

      // 쿠키 삭제 (만료시간을 과거로 설정)
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    } else {
      console.error("❌ 로그아웃 실패:", data.message);
    }
  } catch (error) {
    console.error("❌ 로그아웃 요청 중 오류 발생:", error);
  }
};

// 회원탈퇴 API (POST)
export const handleWithdraw = async (dispatch: AppDispatch) => {
  try {
    const data = await apiClient("/api/user/withdraw", {
      method: "POST",
    });

    if (data.success) {
      console.log("🟢 회원 탈퇴 성공!");

      dispatch(clearUser());

      // 쿠키 삭제
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      window.location.href = "/auth/login";
    } else {
      console.error("❌ 회원 탈퇴 실패:", data.message);
    }
  } catch (error) {
    console.error("❌ 회원 탈퇴 요청 중 오류 발생:", error);
  }
};

// 토큰 재발급 (POST)
export const getNewTokens = async (): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return null;

  try {
    const data = await apiClient("/api/auth/refresh", {
      method: "POST",
    });

    if (data.success) {
      const { accessToken, refreshToken: newRefreshToken } = data.data;

      // 새 토큰 쿠키에 저장
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict; max-age=1800`;
      document.cookie = `refreshToken=${newRefreshToken}; path=/; secure; samesite=strict; max-age=604800`;

      return { accessToken, refreshToken: newRefreshToken };
    }

    return null;
  } catch (error) {
    console.error("❌ 토큰 재발급 실패:", error);
    return null;
  }
};

// 내 정보 확인 (GET)
export const getUserInfo = async (dispatch: AppDispatch) => {
  try {
    const data = await apiClient("/api/user/me", {
      method: "GET",
    });

    if (data.success) {
      dispatch(setUser(data.data));
      return data.data;
    } else {
      console.warn("❗ 사용자 정보 조회 실패:", data.message);
      dispatch(clearUser());
      return null;
    }
  } catch (error) {
    console.error("❌ 사용자 정보 조회 중 에러:", error);
    dispatch(clearUser());
    return null;
  }
};
