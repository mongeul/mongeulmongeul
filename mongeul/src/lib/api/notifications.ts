import { apiClient } from "./apiClient";

export interface FcmToken {
  token: string;
}

export async function sendToken(token: string): Promise<FcmToken> {
  try {
    const response = await apiClient(`/api/v1/notification/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    console.log("FCM 토큰 전송 성공", response);
    return response;
  } catch (error) {
    console.error("FCM 토큰 전송 오류:", error);
    throw error;
  }
}
