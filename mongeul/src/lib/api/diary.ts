import { Diary } from "@/types/diaryTypes";
import { apiClient } from "./apiClient";

// 내 일기 달력 다이어리 보기
export const fetchDiaries = async (
  year: number,
  month: number
): Promise<Diary[]> => {
  try {
    const query = `?year=${year}&month=${month}`;

    const response = await apiClient(`/api/v1/diaries${query}`, {
      method: "GET",
    });

    console.log("일기 데이터:", response);
    return response.success ? response.data : [];
  } catch (error) {
    console.error("일기 조회 오류:", error);
    return [];
  }
};

// 일기 상세 조회
export const fetchMyDiary = async (
  diaryId: number,
  lockPassword?: string
): Promise<Diary | null> => {
  try {
    const query = lockPassword ? `?lockPassword=${lockPassword}` : "";
    const response = await apiClient(`/api/v1/diaries/${diaryId}${query}`, {
      method: "GET",
    });

    console.log(`일기 (${diaryId}) 데이터:`, response);
    return response.success ? response.data : null;
  } catch (error) {
    console.error(`일기 (${diaryId}) 조회 오류:`, error);
    return null;
  }
};
