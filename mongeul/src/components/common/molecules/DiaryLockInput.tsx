import { useState, useRef } from "react";
import Input from "../atoms/Input";

interface DiaryLockInputProps {
  onPasswordChange?: (password: string) => void;
}

const DiaryLockInput: React.FC<DiaryLockInputProps> = ({
  onPasswordChange,
}) => {
  const [diaryPassword, setDiaryPassword] = useState(["", "", "", ""]);
  const inputRefs = Array.from({ length: 4 }, () =>
    useRef<HTMLInputElement | null>(null)
  );

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (!/^\d?$/.test(value)) return;

    const newDiaryPassword = [...diaryPassword];
    newDiaryPassword[index] = value;
    setDiaryPassword(newDiaryPassword);

    if (onPasswordChange) {
      onPasswordChange(newDiaryPassword.join(""));
    }

    // 다음 Input으로 자동 포커스 이동
    if (value && index < 3 && inputRefs[index + 1]?.current) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !diaryPassword[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="w-48 flex flex-row justify-center items-center gap-2">
      {diaryPassword.map((val, index) => (
        <div key={index}>
          <Input
            placeholder={""}
            value={val}
            maxLength={1}
            borderColor="border-gray-200"
            roundSize="rounded-2xl"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default DiaryLockInput;
