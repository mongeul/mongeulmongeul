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
  const fullUrl = `${BASE_URL}${url}`;

  console.log("📡 API 요청 URL:", fullUrl);
  console.log("📢 요청 옵션:", options);

  // `headers`를 명시적으로 Record<string, string>으로 선언
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
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
      console.log("토큰 만료 감지됨! 쿠키 삭제 및 로그인 페이지로 이동");

      // 만료된 토큰 삭제
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      // 로그인 페이지로 이동
      window.location.href = "/auth/login";
    }

    throw new Error(data.message || "API 요청 실패");
  }

  return data;
};
