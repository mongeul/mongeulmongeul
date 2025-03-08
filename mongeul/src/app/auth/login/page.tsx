"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSearchParams, useRouter } from "next/navigation";
import { handleKakaoLogin } from "@/lib/api/auth";
import FeedIcon from "@/assets/icons/feed.svg";
import LoginSection from "@/components/auth/organisms/LoginSection";
import NicknameModal from "@/components/auth/molecules/NicknameModal";

export default function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      console.log("✅ 이미 로그인된 사용자입니다. /feed로 이동");
      router.replace("/feed");
    }
  }, [router]);

  useEffect(() => {
    const kakaoCode = searchParams.get("code");
    if (!kakaoCode) return;

    console.log("카카오에서 받은 인가 코드:", kakaoCode);

    // ✅ 중복 요청 방지: sessionStorage에 저장 후 확인
    if (sessionStorage.getItem("usedKakaoCode") === kakaoCode) {
      console.log("⚠️ 이미 사용된 인가 코드입니다. 중복 요청 방지!");
      return;
    }

    sessionStorage.setItem("usedKakaoCode", kakaoCode); // 사용된 코드 저장

    handleKakaoLogin(kakaoCode, dispatch)
      .then((user) => {
        console.log("🟢 handleKakaoLogin 실행 완료, 응답 사용자:", user);

        if (user) {
          console.log("🔍 유저 정보 확인:", user);
          console.log("🔍 user.nickname 값:", user.nickname);

          if (user.nickname === null) {
            console.log("🛑 닉네임이 null이므로 모달을 띄움");
            setIsModalOpen(true);
          } else if (user.nickname) {
            console.log("✅ 로그인 성공! 메인 페이지로 이동");
            router.push("/feed");
          }
        }
      })

      .catch(() => {
        console.log(
          "❌ 인가 코드 만료! 새로운 코드 요청을 위해 카카오 로그인 페이지로 이동"
        );
        sessionStorage.removeItem("usedKakaoCode"); //기존 코드 삭제
        window.location.href = "/"; // 카카오 로그인 페이지로 이동
      });
  }, [searchParams, dispatch, router]);

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
      router.replace("/feed"); // 모달 닫고 이동
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
            console.log("🔴 닉네임 모달 닫기 실행됨!");
            setIsModalOpen(false);
            router.push("/feed");
          }}
        />
      )}
    </div>
  );
}
