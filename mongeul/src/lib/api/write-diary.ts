import { createDiary } from "@/actions/diary/createDiary";
import { getDiaryDates } from "@/actions/diary/getDiaryDate";
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

// 일기 작성된 date 불러오기
export async function fetchDiaryDates(
  year: number,
  month: number
): Promise<DiaryDatesResponse> {
  return await getDiaryDates(year, month);
}
