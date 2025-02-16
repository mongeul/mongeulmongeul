import { NextRequest, NextResponse } from "next/server";
import { DiaryCreate } from "@/types/diaryTypes";

// 임시 일기 작성 요청
export async function POST(req: NextRequest) {
  try {
    const body: DiaryCreate = await req.json();
    if (
      !body.title ||
      !body.content ||
      !body.date ||
      !body.feelings ||
      !body.disclosure ||
      !body.weather
    ) {
      return NextResponse.json(
        { success: false, message: "필수 입력값 필요" },
        { status: 400 }
      );
    }

    const newDiary = {
      diaryId: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json({
      success: true,
      message: "일기 저장 완료",
      data: newDiary,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버 오류 발생" },
      { status: 500 }
    );
  }
}
