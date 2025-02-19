"use client";

import Button from "@/components/common/atoms/Button";
import { useEffect, useState } from "react";

interface CodeModalProps {
  code: string | null;
  onClose: () => void;
}

export default function CodeModalContent({ code, onClose }: CodeModalProps) {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) {
      onClose(); // 시간이 다 되면 모달 닫기
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onClose]);

  // 초를 MM:SS 형식으로 변환하는 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // 코드 복사 기능
  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      alert("코드가 복사되었습니다!");
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold">내 코드 발급</h2>
      <p className="text-sm text-gray-500 mt-2">
        친구에게 내 코드를 알려주세요.
        <br />
        친구가 코드를 입력하면 공유일기가 시작돼요 !
      </p>

      {/* 발급된 코드 표시 */}
      <div className="flex gap-2 mt-5">
        {code
          ? code.split("").map((num, index) => (
              <div
                key={index}
                className="w-12 h-12 flex items-center justify-center border rounded-lg text-lg font-semibold"
              >
                {num}
              </div>
            ))
          : "코드 없음"}
      </div>

      <p className="text-red-400 text-sm mt-5 mb-6">
        남은 시간 {formatTime(timeLeft)}
      </p>

      <Button
        text="복사하기"
        onClick={copyToClipboard}
        width="w-full"
        height="h-11"
        backgroundColor="bg-theme-500"
        textColor="text-white"
        roundSize="rounded-xl"
      />
    </div>
  );
}
