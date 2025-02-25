"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeelings } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { Feelings } from "@/types/diaryTypes";
import WebModal from "../../common/atoms/WebModal";
import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";

const feelingsOptions: Feelings[] = ["HAPPY", "SOSO", "SAD"];

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
          {feelingsOptions.map((feelings, index) => {
            const { icon, label } = FeelingsIcon({
              feelings: feelings,
            });
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                onClick={() => handleChange(feelings)}
              >
                {icon}
                <p className="text-sm text-gray-600">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function FeelingsSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedFeelings: Feelings = useSelector(
    (state: RootState) => state.diary.feelings
  );

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const { icon } = FeelingsIcon({ feelings: selectedFeelings });

  return (
    <>
      <div
        onClick={toggleModal}
        className="flex flex-col items-center justify-center gap-2 cursor-pointer"
      >
        {icon}
        <p className="text-xs text-zinc-400">오늘의 기분</p>
      </div>

      {isModalOpen && (
        <WebModal onClose={toggleModal}>
          <ModalContent closeModal={toggleModal} />
        </WebModal>
      )}
    </>
  );
}
