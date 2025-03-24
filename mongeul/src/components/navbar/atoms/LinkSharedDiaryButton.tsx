import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import WriteSharedDiaryModal from "../organisms/WriteSharedDIaryModal";

interface LinkSharedDiaryButtonProps {
  text: string;
  icon: ReactElement;
  toggleButton: () => void;
}

export default function LinkSharedDiaryButton({
  text,
  icon,
  toggleButton,
}: LinkSharedDiaryButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const writeSharedDiary = (): void => {
    toggleModal();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-md rounded-full px-4 py-3 flex items-center justify-center gap-2"
        onClick={writeSharedDiary}
      >
        {icon}
        {text}
      </motion.div>
      <AnimatePresence>
        {isModalOpen && <WriteSharedDiaryModal onClose={toggleModal} />}
      </AnimatePresence>
    </>
  );
}
