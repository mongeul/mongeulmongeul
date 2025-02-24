"use client";

import Card from "@/components/common/atoms/Card";
import Text from "../atoms/Text";
import Input from "@/components/common/atoms/Input";
import { useState } from "react";
import Button from "@/components/common/atoms/Button";

export default function NicknameTemplates() {
  const [nickname, setNickname] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value.slice(0, 8));
  };

  const onClick = (): void => {
    console.log("닉네임 변경 버튼 클릭");
  };

  return (
    <div className="w-full">
      <Card padding="p-8">
        <div className="w-full h-full flex flex-col gap-14">
          <Text text="닉네임은 2~8글자로 입력해주세요" />
          <Input
            placeholder={"닉네임을 입력해주세요"}
            value={nickname}
            maxLength={8}
            onChange={onChange}
            borderColor="border-gray-200"
          />
          <Button
            text={"변경하기"}
            textColor="text-white"
            fontWeight="font-bold"
            onClick={onClick}
          />
        </div>
      </Card>
    </div>
  );
}
