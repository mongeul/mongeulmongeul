"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import WebModal from "@/components/common/atoms/WebModal";
import { fetchComments, FeedComment } from "@/lib/api/comment";
import CommentList from "./CommentList";
import CommentInput from "../molecules/CommentInput";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentModal({ isOpen, onClose }: CommentModalProps) {
  const { id } = useParams();
  const [comments, setComments] = useState<FeedComment[]>([]);

  // 댓글 목록 조회
  const loadComments = async () => {
    try {
      const res = await fetchComments(Number(id));
      if (res.success) setComments(res.data);
    } catch (err) {
      console.error("❌ 댓글 불러오기 실패", err);
    }
  };

  useEffect(() => {
    if (isOpen) loadComments(); // 모달 열릴 때만 fetch
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <WebModal onClose={onClose} padding="px-4 py-2">
      <div className="flex flex-col w-[380px] h-[700px]">
        <CommentList comments={comments} onChange={loadComments} />
        <CommentInput onSubmit={loadComments} />
      </div>
    </WebModal>
  );
}
