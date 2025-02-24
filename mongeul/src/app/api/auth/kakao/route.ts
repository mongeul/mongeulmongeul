import { NextRequest, NextResponse } from "next/server";

// GET: 카카오 로그인 URL 반환
export async function GET() {
  try {
    const res = await fetch(`/api/v1/auth/kakao`);
    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(
        { error: "Kakao login URL 가져오기 실패" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
