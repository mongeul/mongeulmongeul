const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN || "";

export const apiClient = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const fullUrl = `${BASE_URL}${url}`;

  console.log("📡 API 요청 URL:", fullUrl);
  console.log("📢 요청 옵션:", options);

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include", // 쿠키 포함
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TEST_TOKEN}`,
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API 요청 실패");
  }

  return data;
};
