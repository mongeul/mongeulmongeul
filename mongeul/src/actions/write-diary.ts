"use server";

import { revalidatePath } from "next/cache";
import {
  DiaryRequest,
  DiaryResponse,
  DiaryDatesResponse,
  DraftRequest,
} from "@/types/diaryTypes";

// 일기 작성
export async function createDiary(data: DiaryRequest): Promise<DiaryResponse> {
  try {
    console.log("request data:", { data });
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    // FormData 객체 생성
    const formData = new FormData();

    // 기본 필드 추가 (picture는 별도로 처리)
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("date", data.date);
    formData.append("weather", data.weather ?? "");
    formData.append("feeling", data.feeling ?? "");
    formData.append("privateStatus", data.privateStatus);

    // 그림 데이터
    if (data.picture) {
      const blob = await (await fetch(data.picture)).blob();
      formData.append("picture", blob, "drawing.png");
    }

    // 그림 선 데이터 json
    if (data.pictureLines) {
      formData.append("pictureLines", JSON.stringify(data.pictureLines));
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/diaries`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`일기 작성 실패: ${errorMessage}`);
    }

    const result: DiaryResponse = await response.json();
    revalidatePath("/diary"); // 일기 목록 데이터 새로고침

    return result;
  } catch (error) {
    console.error("일기 작성 에러 발생:", error);
    throw error;
  }
}

// 일기 임시저장
export async function createDiaryDraft(
  data: DraftRequest
): Promise<DiaryResponse> {
  try {
    console.log("request data:", { data });
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/api/v1/diaries/drafts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`일기 임시저장 실패: ${errorMessage}`);
    }

    const result: DiaryResponse = await response.json();

    return result;
  } catch (error) {
    console.error("일기 임시저장 에러 발생:", error);
    throw error;
  }
}

// 일기 삭제
export async function deleteDiary({
  diaryId,
}: {
  diaryId: number;
}): Promise<{ success: boolean; message: string }> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/api/v1/diaries/${diaryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (response.status === 204) {
      return { success: true, message: "일기 삭제 성공" };
    }

    const hasContent = response.headers.get("content-length") !== "0";
    const result = hasContent ? await response.json() : {};

    return {
      success: result.success ?? true,
      message: result.message ?? "일기 삭제 성공",
    };
  } catch (error) {
    console.error("일기 삭제 에러:", error);
    return { success: false, message: "일기 삭제 실패" };
  }
}

// 임시저장 일기 조회
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

// 일기 작성된 날짜 조회
export async function getDiaryDates(
  year: number,
  month: number
): Promise<DiaryDatesResponse> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(
      `${API_BASE_URL}/api/v1/diaries/date?year=${year}&month=${month}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`일기 날짜 조회 실패: ${errorMessage}`);
    }

    const result: DiaryDatesResponse = await response.json();
    return result;
  } catch (error) {
    console.error("일기 날짜 조회 에러:", error);
    throw error;
  }
}
