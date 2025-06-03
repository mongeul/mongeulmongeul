import { useEffect, useState } from "react";
import { getFcmToken } from "@/utils/getFcmToken";
import { sendToken } from "@/lib/api/notifications";

export function useFcmPermission() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("fcmToken");
    const rejected = localStorage.getItem("fcmPermissionRejected");

    if (!localToken && !rejected) {
      setShowModal(true); // 모달 표시
    }
  }, []);

  const onAccept = async () => {
    try {
      const token = await getFcmToken();
      if (token) {
        await sendToken(token);
        localStorage.setItem("fcmToken", token);
      }
    } catch (err) {
      console.error("FCM 토큰 수신 실패:", err);
    } finally {
      setShowModal(false);
    }
  };

  const onReject = () => {
    localStorage.setItem("fcmPermissionRejected", "true");
    setShowModal(false);
  };

  return { showModal, onAccept, onReject };
}
