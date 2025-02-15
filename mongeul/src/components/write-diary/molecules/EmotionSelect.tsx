import { useState } from "react";
import RoundIcon from "../atoms/RoundIcon";
import MobileModal from "../atoms/MobileModal";
import PublicIcon from "@/assets/icons/public.svg";
import WebModal from "../atoms/WebModal";

interface Emotion {
  value: "happy" | "sad";
}

const emotions: Emotion[] = [
  { value: "happy" },
  { value: "happy" },
  { value: "happy" },
  { value: "happy" },
  { value: "happy" },
  { value: "happy" },
  { value: "happy" },
  { value: "happy" },
  { value: "happy" },
];

function ModalContent() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-600">오늘 하루 기분이 어떠셨나요?</p>
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-3 gap-8">
          {emotions.map((emotion, index) => (
            <div key={index} className="text-3xl">
              {emotion.value}
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
        <p className="text-xs text-zinc-400">오늘의 기분</p>
      </div>

      {isModalOpen && (
        // <MobileModal onClose={openModal}>
        //   <ModalContent />
        // </MobileModal>
        <WebModal onClose={toggleModal}>
          <ModalContent />
        </WebModal>
      )}
    </>
  );
}
