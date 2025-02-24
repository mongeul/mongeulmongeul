import {
  DiaryCreate,
  DiaryCreateResponse,
  DiaryRead,
} from "@/types/diaryTypes";

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

// 내 일기 달력 다이어리 보기
export const fetchDiaries = async (date?: string): Promise<DiaryRead[]> => {
  try {
    const query = date ? `?date=${date}` : "";
    const response = await fetch(`/api/diary/me${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("내일기 가져오기 실패");

    const data = await response.json();
    console.log("일기 데이터:", data);

    return data?.data?.content || [];
  } catch (error) {
    console.error("일기 조회 오류:", error);
    return [];
  }
};
