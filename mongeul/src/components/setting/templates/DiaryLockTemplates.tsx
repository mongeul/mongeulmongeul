import Card from "@/components/common/atoms/Card";
import Text from "../atoms/Text";
import Input from "@/components/common/atoms/Input";
import { useState } from "react";

export default function DiaryLockTemplates() {
  const [nickname, setNickname] = useState("");

  const onChange = () => {
    console.log("닉네임 변경");
  };

  return (
    <div>
      <Card>
        <div>
          <Text text="닉네임은 2~8글자로 입력해주세요" />
          <Input
            placeholder={"닉네임을 입력해주세요"}
            value={nickname}
            maxLength={8}
            onChange={onChange}
          />
        </div>
      </Card>
    </div>
  );
}
