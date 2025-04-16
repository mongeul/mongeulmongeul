import { getMessagingInstance } from "@/lib/firebase-client";
import { getToken } from "firebase/messaging";

export const getFcmToken = async (): Promise<string | null> => {
  const messaging = await getMessagingInstance();

  if (!messaging) {
    console.log("이 브라우저는 FCM을 지원하지 않아요 😢");
    return null;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
    });

    if (token) {
      console.log("✅ FCM 토큰:", token);
      return token;
    } else {
      console.log("❌ 토큰 없음 (권한 필요)");
      return null;
    }
  } catch (err) {
    console.error("🚨 FCM 토큰 발급 오류:", err);
    return null;
  }
};
