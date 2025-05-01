"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { handleNaverLogin } from "@/lib/api/auth";
import NicknameModal from "@/components/auth/molecules/NicknameModal";
import Spinner from "@/components/common/atoms/Spinner";

export default function NaverCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    console.log("🔥 code:", code);
    console.log("🔥 state:", state);
    if (!code || !state) return;

    if (sessionStorage.getItem("usedNaverCode") === code) {
      console.log("⚠️ 이미 사용된 Naver code입니다. 중복 요청 방지!");
      return;
    }

    sessionStorage.setItem("usedNaverCode", code);

    handleNaverLogin(code, state, dispatch)
      .then((user) => {
        console.log("🟢 handleNaverLogin 실행 완료, 응답 사용자:", user);
        if (user) {
          if (user.nickname === null) {
            setIsModalOpen(true);
          } else {
            router.push("/feed");
          }
        }
      })
      .catch(() => {
        console.log("❌ Naver 인가 코드 오류. 처음부터 다시 로그인합니다.");
        sessionStorage.removeItem("usedNaverCode");
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
