"use client";

import { ReactNode } from "react";

import CloseIcon from "@/assets/icons/close.svg";

interface WebModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function WebModal({ children, onClose }: WebModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative flex flex-col w-auto h-auto bg-white rounded-2xl shadow-lg p-2 z-50">
        <div className="flex justify-end p-2" onClick={onClose}>
          <CloseIcon className="text-zinc-400 h-6 w-6" />
        </div>
        <div className="px-8 py-4 mb-2">{children}</div>
      </div>
    </div>
  );
}
