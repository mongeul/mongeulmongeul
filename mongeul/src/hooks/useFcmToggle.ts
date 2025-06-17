import { useEffect, useState } from "react";
import { getFcmToken } from "@/utils/getFcmToken";
import { sendToken, deleteToken } from "@/lib/api/notifications";

export function useFcmToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("fcmToken");
    // const rejected = localStorage.getItem("fcmPermissionRejected");

    if (token) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, []);

  const fcmToggle = async (value: boolean) => {
    if (value) {
      try {
        const token = await getFcmToken();
        if (token) {
          await sendToken(token);
          localStorage.setItem("fcmToken", token);
          localStorage.removeItem("fcmPermissionRejected");
          setEnabled(true);
        }
      } catch (err) {
        console.error("FcmToggle 알림 켜기 실패", err);
        setEnabled(false);
      }
    } else {
      try {
        const token = localStorage.getItem("fcmToken");
        if (token) {
          await deleteToken(token);
          localStorage.removeItem("fcmToken");
          localStorage.setItem("fcmPermissionRejected", "true");
        }
      } catch (err) {
        console.error("FcmToggle 알림 끄기 실패", err);
      } finally {
        setEnabled(false);
      }
    }
  };

  return { enabled, fcmToggle };
}
