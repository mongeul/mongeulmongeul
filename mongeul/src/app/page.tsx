import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    redirect("/auth/login");
  } else {
    redirect("/diary");
  }

  return null;
}

// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

// export default async function Home() {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("accessToken")?.value;

//   if (!accessToken) {
//     redirect("/auth/login");
//     return null;
//   }

//   try {
//     // JWT 디코딩하여 만료 시간 확인
//     const tokenPayload = JSON.parse(
//       Buffer.from(accessToken.split(".")[1], "base64").toString("utf-8")
//     );
//     const exp = tokenPayload.exp * 1000; // 초 단위이므로 밀리초로 변환
//     const currentTime = Date.now(); // 현재 시간 (밀리초)

//     if (currentTime >= exp) {
//       console.log("⛔ 액세스 토큰이 만료됨! 로그인 페이지로 이동");

//       // 만료된 토큰 삭제
//       document.cookie =
//         "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//       document.cookie =
//         "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

//       redirect("/auth/login");
//       return null;
//     }

//     // 토큰이 유효하면 다이어리 페이지로 이동
//     redirect("/diary");
//   } catch (error) {
//     console.error("🔴 JWT 디코딩 오류 또는 잘못된 토큰:", error);
//     redirect("/auth/login");
//   }

//   return null;
// }
