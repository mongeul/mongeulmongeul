"use client";

import { useState } from "react";
import Button from "@/components/common/atoms/Button";
import { getFriendByCode } from "@/lib/api/sharediary";

export default function FriendPlusModalContent({
  onConfirm,
}: {
  onConfirm: (nickname: string, code: string) => void;
}) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      // 숫자 1자리만 입력 가능
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleSubmit = async () => {
    const codeString = code.join(""); // 배열을 문자열로 변환
    if (codeString.length !== 4) {
      setError("4자리 코드를 입력해주세요.");
      return;
    }

    try {
      const response = await getFriendByCode(codeString);
      if (response.success && response.data?.nickname) {
        onConfirm(response.data.nickname, codeString);
      } else {
        setError("사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      setError("API 요청 실패");
      console.error("친구 조회 실패:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-semibold">친구 추가</h2>
      <p className="text-gray-600 mt-3">친구가 알려준 코드를 입력해주세요</p>

      <div className="flex gap-2 my-7">
        {code.map((num, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={num}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-theme-500"
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-5">{error}</p>}

      <Button
        text="입력하기"
        width="w-full"
        height="h-12"
        backgroundColor="bg-theme-500"
        textColor="text-white"
        onClick={handleSubmit}
      />
    </div>
  );
}
