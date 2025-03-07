import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface BubbleProps {
  children: ReactNode;
}

const bounceVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  exit: { opacity: 0, scale: 0.8, y: 10 },
};

export default function Bubble({ children }: BubbleProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={bounceVariants}
      className="relative flex items-center"
    >
      <div className="bg-theme-600 text-white px-4 py-2 rounded-2xl relative flex gap-2 items-center">
        {children}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 
                      border-l-[10px] border-l-transparent 
                      border-r-[10px] border-r-transparent 
                      border-t-[10px] border-t-theme-600 transform translate-y-full"
        ></div>
      </div>
    </motion.div>
  );
}
