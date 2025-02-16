import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";

interface WriteButtonDetailProps {
  text: string;
  icon: ReactElement;
  onClick: () => void;
}

export default function WriteButtonDetail({
  text,
  icon,
  onClick,
}: WriteButtonDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md rounded-full px-4 py-3 flex items-center justify-center gap-2"
      onClick={() => onClick()}
    >
      {icon}
      {text}
    </motion.div>
  );
}
