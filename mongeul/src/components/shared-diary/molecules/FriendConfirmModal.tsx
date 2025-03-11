"use client";

import Button from "@/components/common/atoms/Button";
import { addFriend } from "@/lib/api/shared-diary";

export default function FriendConfirmModal({
  nickname,
  code,
  onClose,
}: {
  nickname: string;
  code: string;
  onClose: () => void;
}) {
  const handleFriendAdd = async () => {
    try {
      const response = await addFriend(code);
      if (response.success) {
        console.log("친구 추가 성공:", response.data.nickname);
        onClose(); // 모달 닫기
      } else {
        console.error("친구 추가 실패");
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-xl font-semibold">친구 닉네임 확인</h2>
      <p className="text-gray-600 mt-3">이 사용자가 맞습니까?</p>
      <div className="w-full text-center my-5 p-4 border rounded-3xl text-xl font-semibold border-theme-400">
        {nickname}
      </div>
      <Button
        text="친구 추가하기"
        width="w-full"
        height="h-12"
        backgroundColor="bg-theme-500"
        textColor="text-white"
        onClick={handleFriendAdd}
      />
    </div>
  );
}
