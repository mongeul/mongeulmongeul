import { ReactNode } from "react";

interface MobileModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function MobileModal({ children, onClose }: MobileModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative flex flex-col items-center w-full bg-white rounded-t-2xl shadow-lg p-2 z-50">
        <div className="w-12 h-1 bg-zinc-300 rounded-full mx-auto my-3"></div>
        {children}
      </div>
    </div>
  );
}
