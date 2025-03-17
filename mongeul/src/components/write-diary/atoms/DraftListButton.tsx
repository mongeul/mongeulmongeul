"use client";

import { useState } from "react";
import DraftListModal from "../organisms/DraftListModal";
import MenuIcon from "@/assets/icons/menu.svg";

export default function DraftListButton() {
  const [isModalOepn, setIsModalOpen] = useState(false);

  const toggleButton = () => {
    setIsModalOpen(!isModalOepn);
  };

  return (
    <>
      <button
        className="flex flex-row justify-center items-center w-14 whitespace-nowrap text-gray-500"
        onClick={toggleButton}
      >
        <MenuIcon className="text-gray-400 h-4 w-4" />
      </button>
      {isModalOepn && <DraftListModal onClose={toggleButton} />}
    </>
  );
}
