import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import { verifyDiaryEntry } from "@/lib/api/write-diary";

interface LinkPersonalDiaryButtonProps {
  text: string;
  icon: ReactElement;
  toggleButton: () => void;
}

export default function LinkPersonalDiaryButton({
  text,
  icon,
  toggleButton,
}: LinkPersonalDiaryButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    const date = new Date().toISOString().split("T")[0];
    const isDiary = await verifyDiaryEntry(date);

    if (isDiary.data) {
      router.push(`/diary/${isDiary.data}`);
    } else {
      router.push("/write-diary");
    }
    toggleButton();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md rounded-full px-4 py-3 flex items-center justify-center gap-2"
      onClick={handleClick}
    >
      {icon}
      {text}
    </motion.div>
  );
}
