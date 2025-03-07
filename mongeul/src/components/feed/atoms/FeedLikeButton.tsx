import { useState } from "react";
import { Feeling } from "@/types/diaryTypes";
import LikeIcon from "@/assets/icons/like.svg";
import FeedEmojiBubble from "../molecules/FeedEmojiBubble";
import { AnimatePresence } from "framer-motion";

export default function FeedLikeButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBubble = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleBubble}>
        <LikeIcon className="h-5 w-5 text-theme-400" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
            <FeedEmojiBubble />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
