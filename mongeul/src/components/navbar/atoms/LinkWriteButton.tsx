"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LinkPersonalDiaryButton from "./LinkPersonalDiaryButton";
import LinkSharedDiaryButton from "./LinkSharedDiaryButton";
import DiaryIcon from "@/assets/icons/diary.svg";
import WriteIcon from "@/assets/icons/write.svg";
import SharedDiaryIcon from "@/assets/icons/shared-diary.svg";
import Link from "next/link";

export default function LinkWriteButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleButton = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-20 flex flex-row gap-4">
            <LinkPersonalDiaryButton
              text="나의 일기 작성"
              icon={<DiaryIcon className="w-7 h-7 text-theme-400" />}
              toggleButton={toggleButton}
            />
            <LinkSharedDiaryButton
              text="공유 일기 작성"
              icon={<SharedDiaryIcon className="w-7 h-7 text-theme-400" />}
              toggleButton={toggleButton}
            />
          </div>
        )}
      </AnimatePresence>
      <button onClick={toggleButton}>
        <WriteIcon className="absolute left-1/2 -translate-x-1/2 -top-4 w-14 h-14 text-theme-400 bg-white rounded-full" />
      </button>
    </div>
  );
}
