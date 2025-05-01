"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { handleGoogleLogin } from "@/lib/api/auth";
import NicknameModal from "@/components/auth/molecules/NicknameModal";
import Spinner from "@/components/common/atoms/Spinner";

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    if (sessionStorage.getItem("usedGoogleCode") === code) {
      console.warn("⚠️ 이미 사용된 Google code입니다. 중복 요청 방지!");
      return;
    }

    sessionStorage.setItem("usedGoogleCode", code);

    handleGoogleLogin(code, dispatch)
      .then((user) => {
        console.log("🟢 handleGoogleLogin 실행 완료, 응답 사용자:", user);
        if (user) {
          if (user.nickname === null) {
            setIsModalOpen(true);
          } else {
            router.push("/feed");
          }
        }
      })
      .catch(() => {
        console.error("❌ Google 인가 코드 오류. 로그인 페이지로 이동");
        sessionStorage.removeItem("usedGoogleCode");
        window.location.href = "/";
      });
  }, [searchParams, dispatch, router]);

  useEffect(() => {
    if (user.nickname && isModalOpen) {
      console.log("✅ 닉네임이 설정되었으므로 모달 닫음");
      setIsModalOpen(false);
      router.replace("/feed");
    }
  }, [user.nickname, isModalOpen, router]);

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
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
    </>
  );
}
