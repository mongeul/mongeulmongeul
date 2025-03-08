import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";

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
  const writeSharedDiary = (): void => {
    console.log("공유 다이어리 작성");
    toggleButton();
  };

  return (
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
  );
}
