"use server";

import { revalidatePath } from "next/cache";
import { DiaryRequest, DiaryResponse } from "@/types/diaryTypes";

export async function createDiary(data: DiaryRequest): Promise<DiaryResponse> {
  try {
    const response = await fetch(`/api/v1/diaries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("일기 작성 실패");
    }

    const result: DiaryResponse = await response.json();
    // revalidatePath("/diary"); // 일기 목록 데이터 새로고침

    return result;
  } catch (error) {
    console.error("일기 작성 에러 발생:", error);
    throw error;
  }
}
