"use client";

import { useEffect, useState } from "react";
// import { getKakaoLoginUrl } from "@/lib/api/auth";
import SocialLoginButton from "@/components/auth/atoms/SocialLoginButton";
import KakaoIcon from "@/assets/icons/kakao.png";
import NaverIcon from "@/assets/icons/naver.png";
import GoogleIcon from "@/assets/icons/google.png";

export default function SocialLoginButtons() {
  const [kakaoLoginUrl, setKakaoLoginUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchKakaoLoginUrl() {
  //     const result = await getKakaoLoginUrl();
  //     if (result.success && result.loginUrl) {
  //       setKakaoLoginUrl(result.loginUrl);
  //     }
  //   }

  //   fetchKakaoLoginUrl();
  // }, []);

  return (
    <div className="flex flex-row justify-center items-center gap-6">
      <SocialLoginButton
        icon={KakaoIcon}
        alt="카카오 로그인"
        onClick={() => {
          // if (kakaoLoginUrl) {
          //   window.location.href = kakaoLoginUrl;
          // }
          console.log("kakao 로그인 클릭");
        }}
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
