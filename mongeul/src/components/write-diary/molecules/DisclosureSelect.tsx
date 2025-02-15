import { useState } from "react";
import RoundIcon from "../atoms/RoundIcon";
import MobileModal from "../atoms/MobileModal";
import PublicIcon from "@/assets/icons/public.svg";
import WebModal from "../atoms/WebModal";

interface Disclosure {
  value: "public" | "unlocked" | "locked";
}

const disclousures: Disclosure[] = [
  { value: "public" },
  { value: "unlocked" },
  { value: "locked" },
];

function ModalContent() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-600">공개 범위를 설정할 수 있어요</p>
      <div className="flex justify-center p-6">
        <div className="flex flex-col gap-8">
          {disclousures.map((disclousures, index) => (
            <div key={index} className="text-3xl">
              {disclousures.value}
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
        <p className="text-xs text-zinc-400">공개 범위</p>
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
