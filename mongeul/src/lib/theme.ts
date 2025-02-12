import { cookies } from "next/headers";

// 테마 가져오기
export async function getServerTheme(): Promise<string> {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  return themeCookie?.value ?? "sky";
}
