"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TempAlertModal from "../molecules/TempAlertModal";

export default function BackButton() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    setIsModalOpen(true);
    router.back();
  };

  const handleConfirmExit = () => {
    setIsModalOpen(false);
    router.back();
  };

  return (
    <>
      <button onClick={handleBackClick} className="p-2 bg-gray-200 rounded">
        뒤로 가기
      </button>
      {isModalOpen && (
        <TempAlertModal
          onConfirm={handleConfirmExit}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
