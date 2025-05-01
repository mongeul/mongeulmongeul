"use client";

import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import FeedIcon from "@/assets/icons/feed.svg";
import LoginSection from "@/components/auth/organisms/LoginSection";
import NicknameModal from "@/components/auth/molecules/NicknameModal";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      console.log("✅ 이미 로그인된 사용자입니다. /feed로 이동");
      router.replace("/feed");
    }
  }, [router]);

  // 닉네임이 null이면 모달 띄우기
  useEffect(() => {
    if (user.id && user.nickname === null) {
      console.log("🚨 닉네임이 null이므로 모달을 띄움");
      setIsModalOpen(true);
    }
  }, [user.id, user.nickname]);

  // 닉네임이 설정되면 모달 자동 닫기
  useEffect(() => {
    if (user.nickname && isModalOpen) {
      console.log("✅ 닉네임이 설정되었으므로 모달 닫음");
      setIsModalOpen(false);
      router.replace("/feed");
    }
  }, [user.nickname, isModalOpen, router]);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      {/* 왼쪽 영역 (로고 & 텍스트) */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <FeedIcon className="w-20 h-20 text-theme-300" />
        <h1 className="text-xl font-bold text-theme-500 mt-3">몽글몽글</h1>
      </div>

      {/* 오른쪽 영역 (로그인 섹션) */}
      <LoginSection />

      {isModalOpen && (
        <NicknameModal
          isOpen={isModalOpen}
          onClose={() => {
            console.log("닉네임 모달 닫기 실행됨!");
            setIsModalOpen(false);
            router.push("/diary");
          }}
        />
      )}
    </div>
  );
}
