"use client";

import { useState } from "react";
import { createComment } from "@/lib/api/comment";
import CommentIcon from "@/assets/icons/comment-write.svg";
import { useParams } from "next/navigation";

interface ReplyInputProps {
  parentCommentId: number;
  onSubmit: () => void;
}

export default function ReplyInput({
  parentCommentId,
  onSubmit,
}: ReplyInputProps) {
  const [reply, setReply] = useState("");
  const { id } = useParams();

  const handleReplySubmit = async () => {
    if (!reply.trim()) return;

    try {
      await createComment(Number(id), reply, parentCommentId);
      setReply("");
      onSubmit();
    } catch (err) {
      console.error("❌ 답글 작성 실패", err);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2 ml-6">
      {" "}
      <input
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="답글을 입력하세요."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
      />
      <button
        type="button"
        onClick={handleReplySubmit}
        className="p-1 rounded-full hover:bg-zinc-100 active:scale-95 transition"
      >
        <CommentIcon />
      </button>
    </div>
  );
}
