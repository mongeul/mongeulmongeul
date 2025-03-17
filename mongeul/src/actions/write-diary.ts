"use server";

import {
  createDiaryEntry,
  saveDiaryDraft,
  deleteDiaryEntry,
  fetchDiaryDates,
  fetchDiaryDraft,
  verifyDiaryEntry,
  fetchPictureLines,
  updateDiaryEntry,
} from "@/lib/api/write-diary";
import { revalidatePath } from "next/cache";
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
export async function submitDiaryEntry(
  data: DiaryRequest
): Promise<DiaryResponse> {
  const result = await createDiaryEntry(data);
  revalidatePath("/diary");
  return result;
}

// 일기 수정
export async function submitDiaryUpdate(
  data: DiaryRequest,
  diaryId: number
): Promise<DiaryResponse> {
  const result = await updateDiaryEntry(data, diaryId);
  revalidatePath("/diary");
  return result;
}

// 일기 삭제
export async function removeDiaryEntry(
  diaryId: number
): Promise<{ success: boolean; message: string }> {
  const result = await deleteDiaryEntry(diaryId);
  revalidatePath("/diary");
  return result;
}

// 특정 날짜의 일기 존재 여부 확인
export async function verifyDiaryExistence(
  today: string
): Promise<IsDiaryResponse> {
  return verifyDiaryEntry(today);
}

// 작성된 일기 날짜 조회
export async function getDiaryDates(
  year: number,
  month: number
): Promise<DiaryDatesResponse> {
  return fetchDiaryDates(year, month);
}

// 임시 저장된 일기 조회
export async function getDiaryDraft(): Promise<DraftResponse> {
  return fetchDiaryDraft();
}

// 임시 저장된 일기 제출
export async function submitDraftEntry(
  data: DraftRequest
): Promise<DraftResponse> {
  return saveDiaryDraft(data);
}

// 그림일기 라인 조회
export async function getPictureLines(
  diaryId: number
): Promise<PictureLineResponse> {
  return await fetchPictureLines(diaryId);
}
