const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN || "";

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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API 요청 실패");
  }

  return data;
};
