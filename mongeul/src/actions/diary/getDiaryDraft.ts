"use server";

import { DiaryResponse } from "@/types/diaryTypes";

export async function getDiaryDraft(): Promise<DiaryResponse> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/api/v1/diaries/drafts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`일기 임시장 조회 실패: ${errorMessage}`);
    }

    const result: DiaryResponse = await response.json();
    return result;
  } catch (error) {
    console.error("일기 임시저장 조회 에러:", error);
    throw error;
  }
}
