"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserNickname } from "@/lib/api/auth";
import WebModal from "@/components/common/atoms/WebModal";
import Button from "@/components/common/atoms/Button";
import Input from "@/components/common/atoms/Input";

export default function NicknameModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();

  console.log("🟢 닉네임 모달 isOpen 값:", isOpen);

  const handleSubmit = async () => {
    if (!nickname.trim()) return alert("닉네임을 입력해주세요.");

    const success = await updateUserNickname(nickname, dispatch);
    if (success) {
      onClose(); // 닉네임 설정 성공 시 모달 닫기
    }
  };

  if (!isOpen) return null; // 모달이 닫혀있으면 렌더링 안 함

  return (
    <WebModal onClose={onClose} padding="px-10 py-6">
      <h2 className="text-lg font-bold text-center mb-4">
        닉네임을 설정해주세요
      </h2>
      <div className="w-full flex flex-col gap-4">
        <Input
          placeholder="닉네임 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={10}
          borderColor="border-gray-300"
          className="w-full p-1 text-lg"
        />

        <Button
          text="확인"
          onClick={handleSubmit}
          width="w-full"
          height="h-11"
          backgroundColor="bg-theme-400"
          textColor="text-white"
          roundSize="rounded-2xl"
        />
      </div>
    </WebModal>
  );
}
