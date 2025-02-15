import { useState } from "react";
import RoundIcon from "../atoms/RoundIcon";
import MobileModal from "../atoms/MobileModal";
import PublicIcon from "@/assets/icons/public.svg";
import UnlockedIcon from "@/assets/icons/unlocked.svg";
import LockedIcon from "@/assets/icons/locked.svg";
import WebModal from "../atoms/WebModal";
import { setDisclosure } from "@/store/diarySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Disclosure } from "@/types/diaryTypes";

const disclosures: Disclosure[] = ["public", "unlocked", "locked"];

const getDisclosureIcon = (disclosure: Disclosure) => {
  switch (disclosure) {
    case "public":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-600">
            <PublicIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "전체 공개",
      };

    case "unlocked":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-500">
            <UnlockedIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "나만 보기",
      };
    case "locked":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-zinc-300">
            <LockedIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "잠금 일기",
      };
    default:
      return {
        icon: (
          <RoundIcon backgroundColor="bg-zinc-300">
            <PublicIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "전체 공개",
      };
  }
};

function ModalContent({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch();

  const handleChange = (disclosure: Disclosure) => {
    dispatch(setDisclosure(disclosure));
    closeModal();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-600">공개 범위를 설정할 수 있어요</p>
      <div className="flex justify-center p-6">
        <div className="flex flex-col gap-8">
          {disclosures.map((disclosure, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center gap-8 text-xl"
              onClick={() => handleChange(disclosure)}
            >
              <div>{getDisclosureIcon(disclosure).icon}</div>
              <div>{getDisclosureIcon(disclosure).label}</div>
            </div>
          ))}
          <p className="text-zinc-400 text-xs">
            잠긴 일기는 비밀번호를 입력해야만 볼 수 있어요
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DisclosureSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedDisclosure: Disclosure =
    useSelector((state: RootState) => state.diary.disclosure) ?? "public";

  const toggleModal = (): void => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div
        onClick={() => {
          toggleModal();
        }}
        className="flex flex-col items-center justify-center gap-2"
      >
        {getDisclosureIcon(selectedDisclosure).icon}
        <p className="text-xs text-zinc-400">공개 범위</p>
      </div>

      {isModalOpen && (
        // <MobileModal onClose={toggleModal}>
        //   <ModalContent closeModal={toggleModal} />
        // </MobileModal>
        <WebModal onClose={toggleModal}>
          <ModalContent closeModal={toggleModal} />
        </WebModal>
      )}
    </>
  );
}
