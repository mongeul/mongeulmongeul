"use client";

import WebModal from "@/components/common/atoms/WebModal";
import { ReactNode } from "react";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function CommentModal({
  isOpen,
  onClose,
  children,
}: CommentModalProps) {
  if (!isOpen) return null;

  return (
    <WebModal onClose={onClose} padding="px-4 py-2">
      <div className="flex flex-col w-[380px] h-[700px]">
        {/* 댓글 리스트 (스크롤 영역) */}
        <div className="flex-1 overflow-y-auto pr-1">
          {children ?? (
            <p className="text-center text-gray-500 text-sm mt-4">
              댓글이 없습니다.
            </p>
          )}
        </div>

        {/* 입력창 */}
        <div className="border-t border-gray-200 pt-2 mt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="댓글을 입력하세요."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
          />
          <button className="text-theme-400 text-sm font-bold px-2">🔵</button>
        </div>
      </div>
    </WebModal>
  );
}
