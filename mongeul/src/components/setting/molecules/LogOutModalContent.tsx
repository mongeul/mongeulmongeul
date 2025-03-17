"use client";

import Card from "@/components/common/atoms/Card";
import Text from "../atoms/Text";
import Button from "@/components/common/atoms/Button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/api/auth";

interface LogOutModalContentProps {
  onClose: () => void;
}

export default function LogOutModalContent({
  onClose,
}: LogOutModalContentProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickLogout = async (): Promise<void> => {
    console.log("📡 로그아웃 버튼 클릭");

    try {
      await handleLogout(dispatch); // 로그아웃 API 호출
      router.push("/auth/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("❌ 로그아웃 실패:", error);
    }

    onClose(); // 모달 닫기
  };

  return (
    <Card padding="p-6">
      <div className="w-full h-full flex flex-col gap-6 items-center">
        <Text text="로그아웃 하시겠습니까?" />
        <div className="flex gap-4">
          <Button
            text="취소"
            onClick={onClose}
            width="w-full"
            height="h-11"
            backgroundColor="bg-theme-500"
            textColor="text-white"
            roundSize="rounded-xl"
          />
          <Button
            text="확인"
            onClick={onClickLogout}
            width="w-full"
            height="h-11"
            backgroundColor="bg-theme-500"
            textColor="text-white"
            roundSize="rounded-xl"
          />
        </div>
      </div>
    </Card>
  );
}
