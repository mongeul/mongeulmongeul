"use client";

import { useState } from "react";
import Button from "@/components/common/atoms/Button";

export default function FriendPlusModalContent() {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-semibold ">친구추가</h2>
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

      <Button
        text="입력하기"
        width="w-full"
        height="h-12"
        backgroundColor="bg-theme-500"
        textColor="text-white"
        onClick={() => console.log("입력한 코드:", code.join(""))}
      />
    </div>
  );
}
