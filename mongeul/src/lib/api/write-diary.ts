import {
  createDiary,
  createDiaryDraft,
  deleteDiary,
  getDiaryDates,
  getDiaryDraft,
  getIsDiary,
  updateDiary,
} from "@/actions/write-diary";
import {
  DiaryRequest,
  DiaryResponse,
  DiaryDatesResponse,
  DraftRequest,
  DraftResponse,
  IsDiaryResponse,
} from "@/types/diaryTypes";

// 일기 작성
export const submitDiary = async (
  data: DiaryRequest
): Promise<DiaryResponse> => {
  return await createDiary(data);
};

// 일기 수정
export const submitUpdateDiary = async (
  data: DiaryRequest,
  diaryId: number
): Promise<DiaryResponse> => {
  return await updateDiary(data, diaryId);
};

// 일기 임시저장
export const submitDiaryDraft = async (
  data: DraftRequest
): Promise<DraftResponse> => {
  return await createDiaryDraft(data);
};

// 일기 작성된 date 불러오기
export async function fetchDiaryDates(
  year: number,
  month: number
): Promise<DiaryDatesResponse> {
  return await getDiaryDates(year, month);
}

// 일기 임시저장 목록 조회
export async function fetchDiaryDraft(): Promise<DraftResponse> {
  return await getDiaryDraft();
}

// 임시저장 일기 삭제
export async function deleteDraft(
  diaryId: number
): Promise<{ success: boolean; message: string }> {
  return await deleteDiary({ diaryId });
}

// 일기 작성 여부 조회
export async function fetchIsWrite(today: string): Promise<IsDiaryResponse> {
  return await getIsDiary(today);
}
