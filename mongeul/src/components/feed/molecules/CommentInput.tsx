"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import CommentIcon from "@/assets/icons/comment-write.svg";
import { createComment } from "@/lib/api/comment";
import clsx from "clsx";

interface CommentInputProps {
  onSubmit: () => void;
  parentCommentId: number | null;
  resetParent: () => void;
}

export default function CommentInput({
  onSubmit,
  parentCommentId,
  resetParent,
}: CommentInputProps) {
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await createComment(Number(id), comment, parentCommentId);
      setComment("");
      onSubmit();
      resetParent();
    } catch (err) {
      console.error("❌ 댓글 작성 실패", err);
      alert("이미 삭제된 댓글에는 답글을 남길 수 없습니다.");
    }
  };

  return (
    <div
      className={clsx(
        "border-t pt-2 mt-2 flex flex-col gap-2 transition-all duration-300",
        parentCommentId ? "border-theme-400 bg-gray-50" : "border-gray-200"
      )}
    >
      {parentCommentId && (
        <div className="flex justify-between items-center px-2 py-1  rounded-md text-xs text-gray-600">
          <span>답글 작성 중</span>
          <button
            onClick={resetParent}
            className="text-theme-400 font-semibold hover:underline"
          >
            취소
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={
            parentCommentId ? "답글을 입력하세요." : "댓글을 입력하세요."
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full px-6 py-4 text-[16px] focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="p-1 rounded-full hover:bg-zinc-100 active:scale-95 transition"
        >
          <CommentIcon />
        </button>
      </div>
    </div>
  );
}
