"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import { handleKakaoLogin } from "@/lib/api/auth";
import FeedIcon from "@/assets/icons/feed.svg";
import LoginSection from "@/components/auth/organisms/LoginSection";
import NicknameModal from "@/components/auth/molecules/NicknameModal";

export default function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const kakaoCode = searchParams.get("code");

    if (kakaoCode) {
      handleKakaoLogin(kakaoCode, dispatch).then((user) => {
        if (user && !user.nickname) {
          setIsModalOpen(true); // 닉네임이 없으면 모달 띄우기
        }
      });
    }
  }, [searchParams, dispatch]);

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
