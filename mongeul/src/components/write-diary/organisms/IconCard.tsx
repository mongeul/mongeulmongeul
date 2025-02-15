"use client";

import { useState } from "react";
import Card from "../../card";
import RoundIcon from "../atoms/RoundIcon";

import LockedIcon from "@/assets/icons/locked.svg";
import UnlockedIcon from "@/assets/icons/unlocked.svg";
import EmotionSelect from "../molecules/EmotionSelect";

export default function IconCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card width="w-full md:w-1/3">
        <div className="flex flex-row items-center justify-evenly py-1 w-full">
          <EmotionSelect />
          <div className="flex flex-col items-center justify-center gap-2">
            <RoundIcon backgroundColor="bg-zinc-300">
              <LockedIcon className="text-white h-9 w-9" />
            </RoundIcon>
            <p className="text-xs text-zinc-400">오늘의 날씨</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <RoundIcon backgroundColor="bg-zinc-300">
              <UnlockedIcon className="text-white h-9 w-9" />
            </RoundIcon>
            <p className="text-xs text-zinc-400">공개 설정</p>
          </div>
        </div>
      </Card>
    </>
  );
}
