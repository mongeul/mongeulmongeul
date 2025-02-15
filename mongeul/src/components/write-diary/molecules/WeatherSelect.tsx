import { useState } from "react";
import RoundIcon from "../atoms/RoundIcon";
import MobileModal from "../atoms/MobileModal";
import PublicIcon from "@/assets/icons/public.svg";
import WebModal from "../atoms/WebModal";
import { Weather } from "@/types/diaryTypes";

const weathers: Weather[] = ["sunny", "sunny", "sunny", "sunny"];

function ModalContent() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-600">오늘의 날씨는 어떘나요?</p>
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-3 gap-8">
          {weathers.map((weather, index) => (
            <div key={index} className="text-3xl">
              {weather}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EmotionSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (): void => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div
        onClick={() => {
          toggleModal();
        }}
        className="flex flex-col items-center justify-center gap-2"
      >
        <RoundIcon backgroundColor="bg-zinc-300">
          <PublicIcon className="text-white h-9 w-9" />
        </RoundIcon>
        <p className="text-xs text-zinc-400">오늘의 날씨</p>
      </div>

      {isModalOpen && (
        // <MobileModal onClose={toggleModal}>
        //   <ModalContent />
        // </MobileModal>
        <WebModal onClose={toggleModal}>
          <ModalContent />
        </WebModal>
      )}
    </>
  );
}
