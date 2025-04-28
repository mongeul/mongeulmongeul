"use client";

import CommentItem from "../molecules/CommentItem";
import { FeedComment } from "@/lib/api/comment";

interface CommentListProps {
  comments: FeedComment[];
  onChange: () => void;
  onReply: (parentId: number) => void;
}

export default function CommentList({
  comments,
  onChange,
  onReply,
}: CommentListProps) {
  if (!comments.length) {
    return (
      <div className="flex-1 overflow-y-auto pr-1">
        <p className="text-center text-gray-500 text-sm mt-4">
          댓글이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pl-5 pr-2 space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          commentId={comment.commentId}
          content={comment.content}
          createdAt={comment.createdAt}
          parentCommentId={comment.parentCommentId}
          onDelete={onChange}
          onReply={onReply}
        />
      ))}
    </div>
  );
}
