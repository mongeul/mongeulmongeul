"use client";

import { useState } from "react";
import RoundIcon from "../atoms/RoundIcon";
import MobileModal from "../atoms/MobileModal";
import EmotionIcon from "@/assets/icons/emotion.svg";
import HappyIcon from "@/assets/icons/happy.svg";
import WebModal from "../atoms/WebModal";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setEmotion } from "@/store/diarySlice";
import { Emotion } from "@/types/diaryTypes";

const emotions: Emotion[] = ["happy", "happy"];

const getEmotionIcon = (emotion: Emotion) => {
  switch (emotion) {
    case "happy":
      return (
        <RoundIcon backgroundColor="bg-yellow-300">
          <HappyIcon className="text-white h-9 w-9" />
        </RoundIcon>
      );

    default:
      return (
        <RoundIcon backgroundColor="bg-zinc-300">
          <EmotionIcon className="text-white h-9 w-9" />
        </RoundIcon>
      );
  }
};

function ModalContent({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch();

  const handleChange = (emotion: Emotion) => {
    dispatch(setEmotion(emotion));
    closeModal();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-600">오늘 하루 기분이 어떠셨나요?</p>
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-3 gap-8">
          {emotions.map((emotion, index) => (
            <div
              key={index}
              className="text-3xl"
              onClick={() => handleChange(emotion)}
            >
              {getEmotionIcon(emotion)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EmotionSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedEmotion: Emotion =
    useSelector((state: RootState) => state.diary.emotion) ?? "";

  const toggleModal = (): void => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div
        onClick={() => {
          toggleModal();
        }}
        className="flex flex-col items-center justify-center gap-2"
      >
        {getEmotionIcon(selectedEmotion)}
        <p className="text-xs text-zinc-400">오늘의 기분</p>
      </div>

      {isModalOpen && (
        // <MobileModal onClose={openModal}>
        //   <ModalContent closeModal={toggleModal}/>
        // </MobileModal>
        <WebModal onClose={toggleModal}>
          <ModalContent closeModal={toggleModal} />
        </WebModal>
      )}
    </>
  );
}
