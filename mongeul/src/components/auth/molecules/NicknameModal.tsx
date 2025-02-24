"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserNickname } from "@/lib/api/auth";
import WebModal from "@/components/common/atoms/WebModal";

export default function NicknameModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!nickname.trim()) return alert("닉네임을 입력해주세요.");

    const success = await updateUserNickname(nickname, dispatch);
    if (success) {
      onClose(); // 닉네임 설정 성공 시 모달 닫기
    }
  };

  if (!isOpen) return null; // 모달이 닫혀있으면 렌더링 안 함

  return (
    <WebModal onClose={onClose}>
      <h2 className="text-lg font-bold text-center mb-4">
        닉네임을 설정해주세요
      </h2>
      <input
        type="text"
        className="w-full border rounded-lg p-2 mb-4"
        placeholder="닉네임 입력"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        확인
      </button>
    </WebModal>
  );
}
