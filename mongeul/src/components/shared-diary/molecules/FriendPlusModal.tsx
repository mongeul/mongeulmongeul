"use client";

import { useState } from "react";
import Button from "@/components/common/atoms/Button";
import Input from "@/components/common/atoms/Input";
import { getFriendByCode } from "@/lib/api/shared-diary";

export default function FriendPlusModalContent({
  onConfirm,
}: {
  onConfirm: (nickname: string, code: string) => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setCode(value);
    }
  };

  const handleSubmit = async () => {
    if (code.length !== 4) {
      setError("4자리 코드를 입력해주세요.");
      return;
    }

    try {
      const response = await getFriendByCode(code);
      if (response.success && response.data?.nickname) {
        onConfirm(response.data.nickname, code);
      } else {
        setError("사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      setError("친구추가 할 수 없습니다. 코드를 다시 확인해주세요.");
      console.error("친구 조회 실패:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-xl font-semibold">친구 추가</h2>
      <p className="text-gray-600 mt-3">친구가 알려준 코드를 입력해주세요</p>

      <div className="w-full my-5">
        <Input
          placeholder="4자리 코드 입력"
          value={code}
          onChange={handleChange}
          maxLength={4}
          borderColor="border-gray-300"
          className="w-full p-2 text-xl text-center"
        />
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
