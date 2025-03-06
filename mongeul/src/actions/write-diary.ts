"use server";

import { revalidatePath } from "next/cache";
import {
  DiaryRequest,
  DiaryResponse,
  DiaryDatesResponse,
  DraftRequest,
  DraftResponse,
  IsDiaryResponse,
} from "@/types/diaryTypes";
import { PictureLine, PictureLineResponse } from "@/types/pictureTypes";

// 일기 작성
export async function createDiary(data: DiaryRequest): Promise<DiaryResponse> {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("date", data.date);
    formData.append("weather", data.weather ?? "");
    formData.append("feeling", data.feeling ?? "");
    formData.append("privateStatus", data.privateStatus);

    if (data.picture) {
      const blob = await (await fetch(data.picture)).blob();
      formData.append("picture", blob, "picture.png");
    }

    // 그림일기 line
    if (data.pictureLines) {
      formData.append("pictureLines", JSON.stringify(data.pictureLines));
    }
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/api/v1/diaries`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error) {
    console.error("일기 작성 실패:", error);
    throw error;
  }
}

// 일기 수정
export async function updateDiary(
  data: DiaryRequest,
  diaryId: number
): Promise<DiaryResponse> {
  try {
    console.log("request data:", { data });
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("date", data.date);
    formData.append("weather", data.weather ?? "");
    formData.append("feeling", data.feeling ?? "");
    formData.append("privateStatus", data.privateStatus);

    console.log("form data:", formData);

    // 그림 데이터
    if (data.picture) {
      const blob = await (await fetch(data.picture)).blob();
      formData.append("picture", blob, "picture.png");
    }

    // 그림 선 데이터 json
    if (data.pictureLines) {
      formData.append("pictureLines", JSON.stringify(data.pictureLines));
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/diaries/${diaryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`일기 수정 실패: ${errorMessage}`);
    }

    const result: DiaryResponse = await response.json();
    revalidatePath("/diary"); // 일기 목록 데이터 새로고침

    return result;
  } catch (error) {
    console.error("일기 수정 에러 발생:", error);
    throw error;
  }
}

// 일기 임시저장
export async function createDiaryDraft(
  data: DraftRequest
): Promise<DraftResponse> {
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

    const result: DraftResponse = await response.json();

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
export async function getDiaryDraft(): Promise<DraftResponse> {
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

    const result: DraftResponse = await response.json();
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

// 특정 날짜 일기 작성 여부 조회
export async function getIsDiary(today: string): Promise<IsDiaryResponse> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(
      `${API_BASE_URL}/api/v1/diaries/find?today=${today}`,
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
      throw new Error(`일기 작성 여부 조회 실패: ${errorMessage}`);
    }

    const result: IsDiaryResponse = await response.json();

    return result;
  } catch (error) {
    console.error("특정 날짜 일기 작성 여부 조회 에러:", error);
    throw error;
  }
}

export async function getPictureLines(diaryId: number): Promise<PictureLine[]> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(
      `${API_BASE_URL}/api/v1/diaries/${diaryId}/picture-lines`,
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
      throw new Error(`그림 일기 Lines 조회 실패: ${errorMessage}`);
    }

    const result: PictureLineResponse = await response.json();

    return result.data;
  } catch (error) {
    console.error("그림일기 Lines 조회 에러:", error);
    throw error;
  }
}
