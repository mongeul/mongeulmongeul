"use client";

import { useEffect } from "react";
import { getFcmToken } from "@/utils/getFcmToken";

export default function Page() {
  useEffect(() => {
    const initFcm = async () => {
      const token = await getFcmToken();
      if (token) {
        alert("📱 FCM 토큰: " + token);
        // await fetch("/api/fcm/save-token", { ... }) 이런 식으로 서버에 저장도 가능
      }
    };

    initFcm();
  }, []);

  return <div>🔥 FCM 테스트 중!</div>;
}
