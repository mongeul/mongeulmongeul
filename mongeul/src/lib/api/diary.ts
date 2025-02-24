import { Diary } from "@/types/diaryTypes";

// 내 일기 달력 다이어리 보기
export const fetchDiaries = async (date?: string): Promise<Diary[]> => {
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
