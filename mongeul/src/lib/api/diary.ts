import { DiaryCreate, DiaryCreateResponse } from "@/types/diaryTypes";

// 임시 일기 작성 요청
export const createDiary = async (
  diaryData: DiaryCreate
): Promise<DiaryCreateResponse> => {
  try {
    const response = await fetch("/api/diary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(diaryData),
    });

    if (!response.ok) throw new Error("일기 작성 실패");
    return await response.json();
  } catch (error) {
    console.error("API 요청 실패:", error);
    return { success: false, message: "서버 오류 발생", data: null };
  }
};
