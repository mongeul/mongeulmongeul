"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getKakaoLoginUrl } from "@/lib/api/auth";
import SocialLoginButton from "@/components/auth/atoms/SocialLoginButton";
import KakaoIcon from "@/assets/icons/kakao.png";
import NaverIcon from "@/assets/icons/naver.png";
import GoogleIcon from "@/assets/icons/google.png";

export default function SocialLoginButtons() {
  const dispatch = useDispatch();

  const handleKakaoLogin = async () => {
    try {
      const loginUrl = await getKakaoLoginUrl();
      window.location.href = loginUrl; // 카카오 로그인 페이지로 이동
    } catch (error) {
      console.error("카카오 로그인 URL 요청 실패:", error);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center gap-6">
      <SocialLoginButton
        icon={KakaoIcon}
        alt="카카오 로그인"
        onClick={handleKakaoLogin}
      />
      <SocialLoginButton
        icon={NaverIcon}
        alt="네이버 로그인"
        onClick={() => console.log("Naver 로그인 클릭")}
      />
      <SocialLoginButton
        icon={GoogleIcon}
        alt="구글 로그인"
        onClick={() => console.log("Google 로그인 클릭")}
      />
    </div>
  );
}
