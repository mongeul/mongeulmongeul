"use server";

import {
  createDiaryEntry,
  updateDiaryEntry,
  deleteDiaryEntry,
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
