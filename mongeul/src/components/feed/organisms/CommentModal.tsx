"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import WebModal from "@/components/common/atoms/WebModal";
import { fetchComments, FeedComment } from "@/lib/api/comment";
import CommentList from "./CommentList";
import CommentInput from "../molecules/CommentInput";

export default function CommentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { id } = useParams();
  const [comments, setComments] = useState<FeedComment[]>([]);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null); // ✅ 답글용 parent ID 관리

  const loadComments = async () => {
    try {
      const res = await fetchComments(Number(id));
      if (res.success) setComments(res.data);
    } catch (err) {
      console.error("❌ 댓글 불러오기 실패", err);
    }
  };

  useEffect(() => {
    if (isOpen) loadComments();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <WebModal onClose={onClose} padding="px-4 py-2">
      <div className="flex flex-col w-[380px] h-[700px]">
        <CommentList
          comments={comments}
          onChange={loadComments}
          onReply={(commentId) => setParentCommentId(commentId)}
        />
        <CommentInput
          onSubmit={loadComments}
          parentCommentId={parentCommentId}
          resetParent={() => setParentCommentId(null)}
        />
      </div>
    </WebModal>
  );
}
