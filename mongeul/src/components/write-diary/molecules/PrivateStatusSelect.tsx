"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrivateStatus } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { PrivateStatus } from "@/types/diaryTypes";
import WebModal from "../../common/atoms/WebModal";
import PrivateStatusIcon from "@/components/common/atoms/PrivateStatusIcon";

const privateStatuses: PrivateStatus[] = ["PUBLIC", "PRIVATE", "LOCK"];

function ModalContent({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch();

  const handleChange = (privateStatus: PrivateStatus) => {
    dispatch(setPrivateStatus(privateStatus));
    closeModal();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p>공개 범위를 선택하세요</p>
      <div className="flex justify-center pt-6 pb-4">
        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-row gap-8">
            {privateStatuses.map((privateStatus, index) => {
              const { icon, label } = PrivateStatusIcon({
                privateStatus: privateStatus,
              });
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-4"
                  onClick={() => handleChange(privateStatus)}
                >
                  <div>{icon}</div>
                  <div className="text-sm">{label}</div>
                </div>
              );
            })}
          </div>
          <p className="text-zinc-400 text-xs text-center">
            * 잠긴 일기는 비밀번호를 입력해야만 볼 수 있어요
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PrivateStatusSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedPrivateStatus: PrivateStatus = useSelector(
    (state: RootState) => state.diary.privateStatus
  );

  const toggleModal = (): void => setIsModalOpen((prev) => !prev);

  const { icon } = PrivateStatusIcon({ privateStatus: selectedPrivateStatus });

  return (
    <>
      <div
        onClick={toggleModal}
        className="flex flex-col items-center justify-center gap-2"
      >
        {icon}
        <p className="text-xs text-zinc-400">공개 범위</p>
      </div>

      {isModalOpen && (
        <WebModal onClose={toggleModal}>
          <ModalContent closeModal={toggleModal} />
        </WebModal>
      )}
    </>
  );
}
