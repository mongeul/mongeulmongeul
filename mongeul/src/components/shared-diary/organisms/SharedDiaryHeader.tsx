"use client";

import { useState } from "react";
import { generateFriendCode } from "@/lib/api/shared-diary";
import Button from "@/components/common/atoms/Button";
import WebModal from "@/components/common/atoms/WebModal";
import FriendIcon from "@/assets/icons/friend2.svg";
import CodeIcon from "@/assets/icons/code.svg";
import CodeModalContent from "../molecules/CodeModalContent";
import FriendPlusModalContent from "../molecules/FriendPlusModal";
import FriendConfirmModal from "../molecules/FriendConfirmModal";

export default function SharedDiaryHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // 친구 확인 모달 상태
  const [friendNickname, setFriendNickname] = useState<string | null>(null);
  const [friendCode, setFriendCode] = useState<string | null>(null);

  const handleGenerateCode = async () => {
    setLoading(true);
    try {
      const response = await generateFriendCode();
      if (response.success && response.data?.code) {
        setCode(response.data.code.toString()); // 코드 상태 저장
        setIsOpen(true); // 코드 발급 모달 열기
      } else {
        console.error("API 응답 에러:", response.message);
      }
    } catch (error) {
      console.error("코드 발급 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <Button
        text="친구추가"
        icon={<FriendIcon className="w-5 h-5 text-theme-500" />}
        onClick={() => setIsFriendModalOpen(true)}
        width="w-29"
        height="h-11"
        backgroundColor="bg-white"
        textColor="text-theme-500"
        borderColor="border-theme-500 border"
      />
      <Button
        text={loading ? "발급 중" : "코드발급"}
        icon={<CodeIcon className="w-5 h-5 text-theme-500" />}
        onClick={handleGenerateCode}
        width="w-29"
        height="h-11"
        backgroundColor="bg-white"
        textColor="text-theme-500"
        borderColor="border-theme-500 border"
        disabled={loading}
      />

      {isOpen && (
        <WebModal onClose={() => setIsOpen(false)}>
          <CodeModalContent code={code} onClose={() => setIsOpen(false)} />
        </WebModal>
      )}
      {isFriendModalOpen && (
        <WebModal onClose={() => setIsFriendModalOpen(false)}>
          <FriendPlusModalContent
            onConfirm={(nickname, code) => {
              setFriendNickname(nickname);
              setFriendCode(code);
              setIsFriendModalOpen(false);
              setIsConfirmModalOpen(true);
            }}
          />
        </WebModal>
      )}
      {isConfirmModalOpen && friendNickname && friendCode && (
        <WebModal onClose={() => setIsConfirmModalOpen(false)}>
          <FriendConfirmModal
            nickname={friendNickname}
            code={friendCode}
            onClose={() => setIsConfirmModalOpen(false)}
          />
        </WebModal>
      )}
    </div>
  );
}
