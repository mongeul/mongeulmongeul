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
        className="w-auto whitespace-nowrap px-8 text-gray-500"
        onClick={toggleButton}
      >
        <MenuIcon className="text-gray-400 h-5 w-5" />
      </button>
      {isModalOepn && <DraftListModal onClose={toggleButton} />}
    </>
  );
}
