"use server";

import { revalidatePath } from "next/cache";
import { DiaryRequest, DiaryResponse } from "@/types/diaryTypes";

export async function createDiary(data: DiaryRequest): Promise<DiaryResponse> {
  try {
    console.log("request data:", { data });
    const token = process.env.NEXT_PUBLIC_API_TOKEN;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/diaries`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`일기 작성 실패: ${errorMessage}`);
    }

    const result: DiaryResponse = await response.json();
    // revalidatePath("/diary"); // 일기 목록 데이터 새로고침

    return result;
  } catch (error) {
    console.error("일기 작성 에러 발생:", error);
    throw error;
  }
}
