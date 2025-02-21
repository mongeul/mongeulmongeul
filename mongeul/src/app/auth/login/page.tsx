"use client";

import FeedIcon from "@/assets/icons/feed.svg";
import LoginSection from "@/components/auth/organisms/LoginSection";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      {/* 왼쪽 영역 (로고 & 텍스트) */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <FeedIcon className="w-20 h-20 text-theme-300" />
        <h1 className="text-xl font-bold text-theme-500 mt-3">몽글몽글</h1>
      </div>

      {/* 오른쪽 영역 (로그인 섹션) */}
      <LoginSection />
    </div>
  );
}
