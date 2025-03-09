import { useState, useEffect, useRef } from "react";
import LikeIcon from "@/assets/icons/like.svg";
import FeedEmojiBubble from "../molecules/FeedEmojiBubble";
import { AnimatePresence } from "framer-motion";

export default function FeedLikeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const bubbleRef = useRef<HTMLDivElement | null>(null);

  const toggleBubble = () => {
    setIsOpen((prev) => !prev);
  };

  // 바깥 클릭 감지 핸들러
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        bubbleRef.current &&
        !bubbleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block justify-center items-center">
      <button
        onClick={toggleBubble}
        className="flex justify-center items-center"
      >
        <LikeIcon className="h-5 w-5 text-theme-400" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <div
            ref={bubbleRef}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2"
          >
            <FeedEmojiBubble />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
