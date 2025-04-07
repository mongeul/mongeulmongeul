"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/api/apiClient";
import { getNewTokens, getUserInfo } from "@/lib/api/auth";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";

export default function RedirectHandler() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAndRedirect = async () => {
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");

      if (!accessToken && refreshToken) {
        console.log("🔁 accessToken 없음, 자동 로그인 시도");
        const refreshed = await getNewTokens();

        if (refreshed) {
          console.log("자동 로그인 성공 → 사용자 정보 가져옴");
          await getUserInfo(dispatch);
          router.replace("/diary");
          return;
        }

        console.warn("자동 로그인 실패 → 로그인 페이지로 이동");
        dispatch(clearUser());
        router.replace("/auth/login");
        return;
      }

      if (accessToken) {
        console.log("🔓 accessToken 있음 → /diary 이동");
        router.replace("/diary");
      } else {
        console.log("🚪 토큰 없음 → 로그인 페이지로 이동");
        router.replace("/auth/login");
      }
    };

    checkAndRedirect();
  }, [router, dispatch]);

  return null;
}
