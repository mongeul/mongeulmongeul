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
  const formData = new FormData();

  console.log("일기작성 데이터", data);

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

  // pictureLines 추가
  if (data.pictureLines) {
    formData.append("pictureLines", JSON.stringify(data.pictureLines));
  }

  // API 요청
  const response = await apiClient("/api/v1/diaries", {
    method: "POST",
    body: formData,
  });

  return response;
}

// 공유일기 생성
export async function createSharedDiaryEntry(
  data: DiaryRequest,
  groupId: number
): Promise<DiaryResponse> {
  const formData = new FormData();

  console.log("공유일기작성 데이터", data);

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

  // pictureLines 추가
  if (data.pictureLines) {
    formData.append("pictureLines", JSON.stringify(data.pictureLines));
  }

  // API 요청
  const response = await apiClient(`/api/v1/groups/${groupId}/share-diaries`, {
    method: "POST",
    body: formData,
  });

  return response;
}

// 일기 수정
export async function updateDiaryEntry(
  data: DiaryRequest,
  diaryId: number
): Promise<DiaryResponse> {
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

  if (data.pictureLines) {
    formData.append("pictureLines", JSON.stringify(data.pictureLines));
  }

  return apiClient(`/api/v1/diaries/${diaryId}`, {
    method: "PUT",
    body: formData,
  });
}

// 공유일기 수정
export async function updateSharedDiaryEntry(
  data: DiaryRequest,
  groupId: number,
  shareDiaryId: number
): Promise<DiaryResponse> {
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

  if (data.pictureLines) {
    formData.append("pictureLines", JSON.stringify(data.pictureLines));
  }

  return apiClient(`/api/v1/groups/${groupId}/share-diaries/${shareDiaryId}`, {
    method: "PUT",
    body: formData,
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

// 공유일기 삭제
export async function deleteSharedDiaryEntry(
  shareDiaryId: number
): Promise<{ success: boolean; message: string }> {
  return apiClient(`/api/v1/share-diaries/${shareDiaryId}`, {
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

// 공유일기 작성된 날짜 조회
export async function fetchSharedDiaryDates(
  year: number,
  month: number,
  groupId: number
): Promise<DiaryDatesResponse> {
  return apiClient(
    `/api/v1/groups/${groupId}/date?year=${year}&month=${month}`,
    {
      method: "GET",
    }
  );
}

// 특정 날짜 일기 존재 여부 확인
export async function verifyDiaryEntry(
  today: string
): Promise<IsDiaryResponse> {
  return apiClient(`/api/v1/diaries/find?today=${today}`, {
    method: "GET",
  });
}

// 특정 날짜 공유 일기 존재 여부 확인
export async function verifySharedDiaryEntry(
  today: string,
  groupId: number
): Promise<IsDiaryResponse> {
  return apiClient(`/api/v1/groups/${groupId}/find?today=${today}`, {
    method: "GET",
  });
}

// 임시 저장된 일기 조회
export async function fetchDiaryDraft(): Promise<DraftResponse> {
  return apiClient("/api/v1/diaries/drafts", {
    method: "GET",
  });
}

// 임시 저장된 공유일기 조회
export async function fetchSharedDiaryDraft(
  groupId: number
): Promise<DraftResponse> {
  return apiClient(`/api/v1/groups/${groupId}/share-diaries/drafts`, {
    method: "GET",
  });
}

// 임시 저장 일기 생성
export async function createDiaryDraft(
  data: DraftRequest
): Promise<DraftResponse> {
  return apiClient("/api/v1/diaries/drafts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

// 임시 저장 공유일기 생성
export async function createSharedDiaryDraft(
  data: DraftRequest,
  groupId: number
): Promise<DraftResponse> {
  return apiClient(`/api/v1/groups/${groupId}/share-diaries/drafts`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

// 그림일기 라인 조회
export async function fetchPictureLines(
  diaryId: number
): Promise<PictureLineResponse> {
  return apiClient(`/api/v1/diaries/${diaryId}/picture-lines`, {
    method: "GET",
  });
}

// 공유그림일기 라인 조회
export async function fetchSharedPictureLines(
  shareDiaryId: number
): Promise<PictureLineResponse> {
  return apiClient(`/api/v1/share-diaries/${shareDiaryId}/picture-lines`, {
    method: "GET",
  });
}
