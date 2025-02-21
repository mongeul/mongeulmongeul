// 카카오 로그인 URL 요청 (GET)
// export const getKakaoLoginUrl = async (): Promise<{
//   success: boolean;
//   loginUrl?: string;
// }> => {
//   try {
//     const response = await fetch("api/auth/kakao"); // Next.js API Route 호출

//     if (!response.ok) throw new Error("카카오 로그인 URL 요청 실패");

//     const data = await response.json();
//     return { success: data.success, loginUrl: data.data?.loginUrl };
//   } catch (error) {
//     console.error("카카오 로그인 URL 요청 실패:", error);
//     return { success: false };
//   }
// };
