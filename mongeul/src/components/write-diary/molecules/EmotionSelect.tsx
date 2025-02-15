import { useState } from "react";
import RoundIcon from "../atoms/RoundIcon";
import MobileModal from "../atoms/MobileModal";
import PublicIcon from "@/assets/icons/public.svg";

export default function EmotionSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div
        onClick={() => {
          openModal();
        }}
        className="flex flex-col items-center justify-center gap-2"
      >
        <RoundIcon backgroundColor="bg-zinc-300">
          <PublicIcon className="text-white h-9 w-9" />
        </RoundIcon>
        <p className="text-xs text-zinc-400">오늘의 기분</p>
      </div>

      {isModalOpen && (
        <MobileModal onClose={openModal}>
          <div className="p-4">
            <h2 className="text-lg font-semibold">오늘의 기분 선택</h2>
            <p className="text-gray-600 mt-2">기분을 선택하세요.</p>
          </div>
        </MobileModal>
      )}
    </>
  );
}
