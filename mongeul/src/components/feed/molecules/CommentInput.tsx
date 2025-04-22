"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import CommentIcon from "@/assets/icons/comment-write.svg";
import { createComment } from "@/lib/api/comment";

interface CommentInputProps {
  onSubmit: () => void;
}

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await createComment(Number(id), comment);
      setComment("");
      onSubmit();
    } catch (err) {
      console.error("❌ 댓글 작성 실패", err);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-2 mt-2 flex items-center gap-2">
      <input
        type="text"
        placeholder="댓글을 입력하세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 border border-gray-300 rounded-full px-6 py-4 text-sm focus:outline-none"
      />
      <button
        type="button"
        className="p-1 rounded-full hover:bg-zinc-100 active:scale-95 transition"
        onClick={handleSubmit}
      >
        <CommentIcon />
      </button>
    </div>
  );
}
