"use client";

import { useState } from "react";
import RoundIcon from "../../common/atoms/RoundIcon";
import MobileModal from "../../common/atoms/MobileModal";
import FeelingsIcon from "@/assets/icons/feelings.svg";
import HappyIcon from "@/assets/icons/happy.svg";
import WebModal from "../../common/atoms/WebModal";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setFeelings } from "@/store/diarySlice";
import { Feelings } from "@/types/diaryTypes";

const feelingsOptions: Feelings[] = ["happy", "soso", "sad"];

const getFeelingsIcon = (feelings: Feelings) => {
  switch (feelings) {
    case "happy":
      return (
        <RoundIcon backgroundColor="bg-theme-400">
          <HappyIcon className="text-white h-9 w-9" />
        </RoundIcon>
      );
    case "soso":
      return (
        <RoundIcon backgroundColor="bg-theme-300">
          <HappyIcon className="text-white h-9 w-9" />
        </RoundIcon>
      );
    case "sad":
      return (
        <RoundIcon backgroundColor="bg-theme-200">
          <HappyIcon className="text-white h-9 w-9" />
        </RoundIcon>
      );

    default:
      return (
        <RoundIcon backgroundColor="bg-zinc-300">
          <FeelingsIcon className="text-white h-9 w-9" />
        </RoundIcon>
      );
  }
};

function ModalContent({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch();

  const handleChange = (feelings: Feelings) => {
    dispatch(setFeelings(feelings));
    closeModal();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-600">오늘 하루 기분이 어떠셨나요?</p>
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-3 gap-8">
          {feelingsOptions.map((feelings, index) => (
            <div
              key={index}
              className="text-3xl"
              onClick={() => handleChange(feelings)}
            >
              {getFeelingsIcon(feelings)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeelingsSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedFeelings: Feelings =
    useSelector((state: RootState) => state.diary.feelings) ?? "";

  const toggleModal = (): void => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div
        onClick={() => {
          toggleModal();
        }}
        className="flex flex-col items-center justify-center gap-2"
      >
        {getFeelingsIcon(selectedFeelings)}
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
