"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WriteButtonDetail from "../molecules/WriteButtonDetail";
import DiaryIcon from "@/assets/icons/diary.svg";
import WriteIcon from "@/assets/icons/write.svg";
import SharedDiaryIcon from "@/assets/icons/shared-diary.svg";
import Link from "next/link";

export default function WriteButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleButton = () => setIsOpen((prev) => !prev);

  const writePersonalDiary = (): void => {
    console.log("개인 다이어리 작성");
    toggleButton();
  };
  const writeSharedDiary = (): void => {
    console.log("공유 다이어리 작성");
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-20 flex flex-row gap-4">
            <Link href={"/write-diary"}>
              <WriteButtonDetail
                text="나의 일기 작성"
                icon={<DiaryIcon className="w-7 h-7 text-theme-400" />}
                onClick={writePersonalDiary}
              />
            </Link>
            <WriteButtonDetail
              text="공유 일기 작성"
              icon={<SharedDiaryIcon className="w-7 h-7 text-theme-400" />}
              onClick={writeSharedDiary}
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
