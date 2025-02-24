"use client";

import Card from "@/components/common/atoms/Card";
import Text from "../atoms/Text";
import Input from "@/components/common/atoms/Input";
import { useState } from "react";
import Button from "@/components/common/atoms/Button";
import DiaryLockInput from "@/components/common/molecules/DiaryLockInput";

export default function DiaryLockTemplates() {
  const [nickname, setNickname] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value.slice(0, 8));
  };

  const onClick = (): void => {
    console.log("닉네임 변경 버튼 클릭");
  };

  return (
    <div className="w-full">
      <Card padding="p-8" width="w-full">
        <div className="w-full h-full flex flex-col justify-center items-center gap-14">
          <div className="w-full">
            <Text text="일기마다 잠금을 설정할 수 있어요!" />
            <Text text="잠금 비밀번호를 입력해주세요" />
          </div>
          <DiaryLockInput />
          <Button
            text={"변경하기"}
            textColor="text-white"
            fontWeight="font-bold"
            onClick={onClick}
            width="w-full"
          />
        </div>
      </Card>
    </div>
  );
}
