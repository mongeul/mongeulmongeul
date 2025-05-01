"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { getNewTokens, getUserInfo } from "@/lib/api/auth";
import { clearUser } from "@/store/userSlice";
import { getCookie } from "@/lib/api/apiClient";
import { useRouter } from "next/navigation";

function AutoLoginHandler() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const autoLogin = async () => {
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");

      if (!accessToken && refreshToken) {
        console.log("🔁 accessToken 없음, 자동 로그인 시도");
        const refreshed = await getNewTokens();

        if (refreshed) {
          console.log("✅ 토큰 재발급 성공, 사용자 정보 조회 시도");
          await getUserInfo(dispatch);
        } else {
          console.warn("❌ 자동 로그인 실패, 상태 초기화");
          dispatch(clearUser());
          router.push("/login");
        }
      }
    };

    autoLogin();
  }, [dispatch]);

  return null;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AutoLoginHandler />
      {children}
    </Provider>
  );
}
