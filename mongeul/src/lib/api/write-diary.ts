import {
  createDiary,
  createDiaryDraft,
  deleteDiary,
  getDiaryDates,
  getDiaryDraft,
} from "@/actions/write-diary";
import {
  DiaryRequest,
  DiaryResponse,
  DiaryDatesResponse,
} from "@/types/diaryTypes";

// 일기 작성
export const submitDiary = async (
  data: DiaryRequest
): Promise<DiaryResponse> => {
  const cleanedDrawing = data.picture
    ? data.picture.replace(/^data:image\/\w+;base64,/, "")
    : "";

  return await createDiary({
    ...data,
    picture: cleanedDrawing,
  });
};

// 일기 임시저장
export const submitDiaryDraft = async (
  data: DiaryRequest
): Promise<DiaryResponse> => {
  const cleanedDrawing = data.picture
    ? data.picture.replace(/^data:image\/\w+;base64,/, "")
    : "";

  return await createDiaryDraft({
    ...data,
    picture: cleanedDrawing,
  });
};

// 일기 작성된 date 불러오기
export async function fetchDiaryDates(
  year: number,
  month: number
): Promise<DiaryDatesResponse> {
  return await getDiaryDates(year, month);
}

// 일기 임시저장 목록 조회
export async function fetchDiaryDraft(): Promise<DiaryResponse> {
  return await getDiaryDraft();
}

// 임시저장 일기 삭제
export async function deleteDraft(
  diaryId: number
): Promise<{ success: boolean; message: string }> {
  return await deleteDiary({ diaryId });
}
