import React from "react";
import Card from "@/components/common/atoms/Card";
import DiaryLockInput from "@/components/common/molecules/DiaryLockInput";
import Button from "@/components/common/atoms/Button";

interface LockDiaryProps {
  // password: string;
  onPasswordChange: (password: string) => void;
  onPasswordSubmit: () => void;
  error?: string | null;
}

const LockDiary: React.FC<LockDiaryProps> = ({
  onPasswordChange,
  onPasswordSubmit,
  error,
}) => {
  return (
    <Card height="w-full h-[450px]">
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-lg font-semibold">잠긴 일기장입니다</h2>
        <br />
        <p className={error ? "text-red-500" : "text-gray-500"}>
          {error ? error : "비밀번호를 입력해주세요."}
        </p>
        <br />

        <DiaryLockInput onPasswordChange={onPasswordChange} />
        <br />

        <Button text="확인" onClick={onPasswordSubmit} />
      </div>
    </Card>
  );
};

export default LockDiary;
