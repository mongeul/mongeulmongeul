const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const apiClient = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include", // 쿠키 포함
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API 요청 실패");
  }

  return data;
};
