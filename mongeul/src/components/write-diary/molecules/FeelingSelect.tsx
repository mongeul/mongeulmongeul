"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeeling } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { Feeling } from "@/types/diaryTypes";
import WebModal from "../../common/atoms/WebModal";
import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";

const feelingOptions: Feeling[] = ["HAPPY", "SOSO", "SAD", "ANGRY", "WOW"];

const feelingLabelMap: Record<Feeling, string> = {
  HAPPY: "행복해요",
  SOSO: "그저그래요",
  SAD: "슬퍼요",
  ANGRY: "화나요",
  WOW: "놀라워요",
};

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
          {feelingOptions.map((feeling) => (
            <div
              key={feeling}
              className="flex flex-col items-center justify-center gap-2 cursor-pointer"
              onClick={() => handleChange(feeling)}
            >
              <FeelingsIcon feeling={feeling} size="w-16 h-16" />
              <p className="text-sm text-gray-500">
                {feelingLabelMap[feeling]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeelingSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedFeeling: Feeling = useSelector(
    (state: RootState) => state.diary.feeling
  );

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div
        onClick={toggleModal}
        className="flex flex-col items-center justify-center gap-2 cursor-pointer"
      >
        <FeelingsIcon feeling={selectedFeeling} size="w-20 h-20" />
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
