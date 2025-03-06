import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import { fetchIsWrite } from "@/lib/api/write-diary";

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
    const today = new Date().toISOString().split("T")[0];
    const isDiary = await fetchIsWrite(today);

    if (isDiary) {
      alert("이미 오늘의 일기를 작성하셨습니다!");
    } else {
      router.push("/write-diary"); // 작성 페이지로 이동
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
