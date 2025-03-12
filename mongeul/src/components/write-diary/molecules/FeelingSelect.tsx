"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeeling } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { Feeling } from "@/types/diaryTypes";
import WebModal from "../../common/atoms/WebModal";
import FeelingIcon from "@/components/common/atoms/FeelingsIcon";

const feelingOptions: Feeling[] = ["HAPPY", "SOSO", "SAD", "ANGRY", "WOW"];

function ModalContent({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch();

  const handleChange = (feeling: Feeling) => {
    dispatch(setFeeling(feeling));
    closeModal();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-600">오늘 하루 기분이 어떠셨나요?</p>
      <div className="flex justify-center pt-6 pb-4">
        <div className="grid grid-cols-3 gap-8">
          {feelingOptions.map((feeling, index) => {
            const { icon, label } = FeelingIcon({
              feeling: feeling,
            });
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                onClick={() => handleChange(feeling)}
              >
                {icon}
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function FeelingSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedFeeling: Feeling = useSelector(
    (state: RootState) => state.diary.feeling
  ) as Feeling;

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const { icon } = FeelingIcon({ feeling: selectedFeeling });

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
