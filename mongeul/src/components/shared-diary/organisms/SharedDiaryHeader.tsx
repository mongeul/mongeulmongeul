"use client";

import { useState } from "react";
import Button from "@/components/common/atoms/Button";
import WebModal from "@/components/common/atoms/WebModal";
import FriendIcon from "@/assets/icons/friend.svg";
import CodeIcon from "@/assets/icons/code.svg";
import CodeModalContent from "../molecules/CodeModalContent";

export default function SharedDiaryHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  // 코드 발급 함수 (1000~9999 랜덤 코드)
  const generateCode = () => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setCode(newCode);
    setIsOpen(true);
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <Button
        text="친구추가"
        icon={<FriendIcon className="w-5 h-5 text-theme-500" />}
        onClick={() => console.log("친구추가 버튼 클릭!")}
        width="w-29"
        height="h-11"
        backgroundColor="bg-white"
        textColor="text-theme-500"
        borderColor="border-theme-500 border"
      />
      <Button
        text="코드발급"
        icon={<CodeIcon className="w-5 h-5 text-theme-500" />}
        onClick={generateCode}
        width="w-29"
        height="h-11"
        backgroundColor="bg-white"
        textColor="text-theme-500"
        borderColor="border-theme-500 border"
      />

      {isOpen && (
        <WebModal onClose={() => setIsOpen(false)}>
          <CodeModalContent code={code} onClose={() => setIsOpen(false)} />
        </WebModal>
      )}
    </div>
  );
}
