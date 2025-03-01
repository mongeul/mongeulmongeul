"use client";

import CheckBox from "@/components/common/atoms/CheckBox";
import { useState } from "react";

export default function PrivateDiaryCheckbox() {
  const [isPrivate, setIsPrivate] = useState(false);
  const handleToggle = () => {
    setIsPrivate(!isPrivate);
  };
  return (
    <CheckBox
      label="내 일기 보기"
      isChecked={isPrivate}
      handleToggle={handleToggle}
    />
  );
}
