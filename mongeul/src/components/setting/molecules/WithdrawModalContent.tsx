"use client";

import Card from "@/components/common/atoms/Card";
import Text from "../atoms/Text";
import Button from "@/components/common/atoms/Button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { handleWithdraw } from "@/lib/api/auth";

interface WithdrawModalContentProps {
  onClose: () => void;
}

export default function WithdrawModalContent({
  onClose,
}: WithdrawModalContentProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickWithdraw = async (): Promise<void> => {
    console.log("📡 회원 탈퇴 버튼 클릭");

    try {
      await handleWithdraw(dispatch);
      router.push("/login");
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
    }

    onClose();
  };

  return (
    <Card padding="p-6">
      <div className="w-full h-full flex flex-col gap-6 items-center">
        <Text text="정말로 회원 탈퇴하시겠습니까?" />
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
            onClick={onClickWithdraw}
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
