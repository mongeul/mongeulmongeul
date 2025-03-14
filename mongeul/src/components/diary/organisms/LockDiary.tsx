"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Card from "@/components/common/atoms/Card";
import DiaryLockInput from "@/components/common/molecules/DiaryLockInput";

interface LockDiaryProps {
  onPasswordSubmit: (password: string) => void;
}

const LockDiary: React.FC<LockDiaryProps> = ({ onPasswordSubmit }) => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  const [password, setPassword] = useState("");

  if (selectedDiary === "LOCK") {
    return (
      <Card height="min-h-[200px] lg:min-h-[450px]">
        <div className="flex flex-col items-center w-full p-6">
          <h2 className="text-lg font-semibold mb-4">잠긴 일기장입니다.</h2>
          <p className="text-gray-500 mb-4">잠금 비밀번호를 입력해주세요.</p>

          {/* ✅ 비밀번호 입력 UI */}
          <DiaryLockInput onPasswordChange={setPassword} />

          {/* ✅ 비밀번호 4자리 입력되면 "확인" 버튼 활성화 */}
          <button
            onClick={() => onPasswordSubmit(password)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={password.length !== 4} // 4자리 입력해야 버튼 활성화
          >
            확인
          </button>
        </div>
      </Card>
    );
  }
};

export default LockDiary;
