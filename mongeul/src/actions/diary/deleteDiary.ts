"use server";

export async function deleteDiary({
  diaryId,
}: {
  diaryId: number;
}): Promise<{ success: boolean; message: string }> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/api/v1/diaries/${diaryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (response.status === 204) {
      return { success: true, message: "일기 삭제 성공" };
    }

    const hasContent = response.headers.get("content-length") !== "0";
    const result = hasContent ? await response.json() : {};

    return {
      success: result.success ?? true,
      message: result.message ?? "일기 삭제 성공",
    };
  } catch (error) {
    console.error("일기 삭제 에러:", error);
    return { success: false, message: "일기 삭제 실패" };
  }
}
