"use client";

import Card from "@/components/common/atoms/Card";
import Text from "../atoms/Text";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/api/auth";
import Button from "@/components/common/atoms/Button";

export default function NicknameTemplates() {
  const dispatch = useDispatch();
  const router = useRouter();
  const onClick = async (): Promise<void> => {
    console.log("📡 로그아웃 버튼 클릭");

    try {
      await handleLogout(dispatch); // 로그아웃 API 호출
      router.push("/auth/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("❌ 로그아웃 실패:", error);
    }
  };

  return (
    <div className="w-full">
      <Card padding="p-8">
        <div className="w-full h-full flex flex-col gap-14 center">
          <Text text="정말 로그아웃 하시겠습니까?" />
          <Button
            text={"로그아웃하기"}
            textColor="text-white"
            fontWeight="font-bold"
            onClick={onClick}
          />
        </div>
      </Card>
    </div>
  );
}
