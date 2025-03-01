"use client";

import { useState } from "react";
import DraftListModal from "../organisms/DraftListModal";

export default function DraftListButton() {
  const [isModalOepn, setIsModalOpen] = useState(false);

  const toggleButton = () => {
    setIsModalOpen(!isModalOepn);
  };

  const draftCount = 1;

  return (
    <>
      <button
        className="w-auto whitespace-nowrap px-8 text-gray-500"
        onClick={toggleButton}
      >
        {draftCount}
      </button>
      {isModalOepn && <DraftListModal onClose={toggleButton} />}
    </>
  );
}
