"use client";

import WebModal from "@/components/common/atoms/WebModal";
import Button from "./Button";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  isOpen,
  message,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <WebModal onClose={onCancel} padding="p-6">
      <div className="text-center space-y-4 w-[260px]">
        <p className="text-sm text-zinc-800 whitespace-pre-line">{message}</p>
        <div className="flex justify-center gap-4 pt-2">
          <Button
            text="취소"
            width="w-full"
            height="h-12"
            backgroundColor="bg-zinc-200"
            textColor="text-black"
            onClick={onCancel}
          />
          <Button
            text="확인"
            width="w-full"
            height="h-12"
            backgroundColor="bg-theme-400"
            textColor="text-white"
            onClick={onConfirm}
          />
        </div>
      </div>
    </WebModal>
  );
}
