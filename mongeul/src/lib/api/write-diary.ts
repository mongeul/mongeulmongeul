import { apiClient } from "@/lib/api/apiClient";
import {
  DiaryRequest,
  DiaryResponse,
  DiaryDatesResponse,
  DraftRequest,
  DraftResponse,
  IsDiaryResponse,
} from "@/types/diaryTypes";
import { PictureLineResponse } from "@/types/pictureTypes";

// 일기 생성
export async function createDiaryEntry(
  data: DiaryRequest
): Promise<DiaryResponse> {
  return apiClient("/api/v1/diaries", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

// 일기 수정
export async function updateDiaryEntry(
  data: DiaryRequest,
  diaryId: number
): Promise<DiaryResponse> {
  return apiClient(`/api/v1/diaries/${diaryId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

// 일기 삭제
export async function deleteDiaryEntry(
  diaryId: number
): Promise<{ success: boolean; message: string }> {
  return apiClient(`/api/v1/diaries/${diaryId}`, {
    method: "DELETE",
  });
}

// 일기 작성된 날짜 조회
export async function fetchDiaryDates(
  year: number,
  month: number
): Promise<DiaryDatesResponse> {
  return apiClient(`/api/v1/diaries/date?year=${year}&month=${month}`, {
    method: "GET",
  });
}

// 특정 날짜 일기 존재 여부 확인
export async function verifyDiaryEntry(
  today: string
): Promise<IsDiaryResponse> {
  return apiClient(`/api/v1/diaries/find?today=${today}`, {
    method: "GET",
  });
}

// 임시 저장된 일기 조회
export async function fetchDiaryDraft(): Promise<DraftResponse> {
  return apiClient("/api/v1/diaries/drafts", {
    method: "GET",
  });
}

// 임시 저장된 일기 생성
export async function saveDiaryDraft(
  data: DraftRequest
): Promise<DraftResponse> {
  return apiClient("/api/v1/diaries/drafts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

// 그림일기 라인 조회 (API 응답 구조 수정)
export async function fetchPictureLines(
  diaryId: number
): Promise<PictureLineResponse> {
  return apiClient(`/api/v1/diaries/${diaryId}/picture-lines`, {
    method: "GET",
  });
}
