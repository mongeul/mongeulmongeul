"use client";

import Image from "next/image";
import FeedIcon from "@/assets/icons/feed.svg";
import GoogleIcon from "@/assets/icons/google.png";
import KakaoIcon from "@/assets/icons/kakao.png";
import NaverIcon from "@/assets/icons/naver.png";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      {/* 왼쪽 영역 (로고 & 텍스트) */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <FeedIcon className="w-28 h-28 text-theme-300" />
        <h1 className="text-2xl font-bold text-theme-500 mt-4">몽글몽글</h1>
      </div>

      {/* 오른쪽 영역 (로그인 영역) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="flex items-center w-full max-w-xs my-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="mx-4 text-gray-400 text-lg font-medium">로그인</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <div className="flex flex-row justify-center items-center gap-6">
          <button
            onClick={() => console.log("Kakao 로그인 클릭")}
            className="p-2 rounded-full hover:opacity-80"
          >
            <Image
              src={KakaoIcon}
              alt="카카오 로그인"
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16"
            />
          </button>
          <button
            onClick={() => console.log("Naver 로그인 클릭")}
            className="p-2 rounded-full hover:opacity-80"
          >
            <Image
              src={NaverIcon}
              alt="네이버 로그인"
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16"
            />
          </button>
          <button
            onClick={() => console.log("Google 로그인 클릭")}
            className="p-2 rounded-full hover:opacity-80"
          >
            <Image
              src={GoogleIcon}
              alt="구글 로그인"
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
