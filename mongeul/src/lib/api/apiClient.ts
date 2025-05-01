import { getNewTokens } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

export const apiClient = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  const fullUrl = `${BASE_URL}${url}`;

  const isRefreshRequest = url.includes("/api/auth/refresh");

  console.log("📡 API 요청 URL:", fullUrl);
  console.log("📢 요청 옵션:", options);

  // `headers`를 명시적으로 Record<string, string>으로 선언
  const headers: Record<string, string> = {
    Authorization: `Bearer ${isRefreshRequest ? refreshToken : accessToken}`,

    ...((options.headers as Record<string, string>) || {}),
  };

  // `body`가 FormData가 아닐 때만 `Content-Type` 추가
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    headers,
  });
  if (res.status === 204) {
    return null;
  }

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401) {
      if (!isRefreshRequest) {
        // ✅ 리프레시 요청은 제외!
        console.warn("🔐 accessToken 만료됨, 토큰 재발급 시도 중");

        const refreshed = await getNewTokens();

        if (refreshed) {
          console.log("✅ 토큰 재발급 성공, 요청 재시도");

          // accessToken 갱신 후 원래 요청 다시 시도
          const retryHeaders: Record<string, string> = {
            ...(options.headers as Record<string, string>),
            Authorization: `Bearer ${refreshed.accessToken}`,
          };

          if (!(options.body instanceof FormData)) {
            retryHeaders["Content-Type"] = "application/json";
          }

          const retryRes = await fetch(fullUrl, {
            ...options,
            headers: retryHeaders,
            credentials: "include",
          });

          const retryData = await retryRes.json();
          return retryData;
        }

        console.log("❌ 토큰 재발급 실패, 로그인 페이지로 이동");
        document.cookie =
          "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/login";
      }
      throw new Error("토큰이 만료되었고 재발급도 실패했습니다.");
    }

    throw new Error(data.message || "API 요청 실패");
  }

  return data;
};
