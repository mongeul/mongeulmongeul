"use client";

import { useState } from "react";
import { formatDateTime } from "@/utils/formatDate";
import { deleteComment, reportComment, updateComment } from "@/lib/api/comment";
import MenuIcon from "@/assets/icons/menudot.svg";
import ConfirmModal from "@/components/common/atoms/ConfirmModal";

interface CommentItemProps {
  commentId: number;
  content: string;
  createdAt: string;
  parentCommentId?: number | null;
  onDelete: () => void;
  onReply: (parentId: number) => void;
}

export default function CommentItem({
  commentId,
  content,
  createdAt,
  parentCommentId = null,
  onDelete,
  onReply,
}: CommentItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleDelete = async () => {
    try {
      await deleteComment(commentId);
      setIsConfirmOpen(false);
      onDelete();
    } catch (error) {
      console.error("❌ 댓글 삭제 실패:", error);
    }
  };

  const handleReport = async () => {
    try {
      const res = await reportComment(commentId);
      setIsReportOpen(false);
      alert(res.message);
    } catch (error) {
      console.error("❌ 댓글 신고 실패:", error);
      alert("이미 신고한 댓글입니다.");
    }
  };

  const handleUpdate = async () => {
    if (!editedContent.trim()) return;
    try {
      await updateComment(commentId, editedContent.trim());
      setIsEditMode(false);
      onDelete();
    } catch (error) {
      console.error("❌ 댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  return (
    <div
      className={`relative text-sm border-b border-gray-100 pb-4 pt-2 pr-8 ${
        parentCommentId ? "ml-6" : ""
      }`}
    >
      {/* 메뉴 아이콘 */}
      <MenuIcon
        className="w-5 h-5 text-zinc-400 absolute top-2 right-2 cursor-pointer"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* 메뉴 말풍선 */}
      {isMenuOpen && (
        <div className="absolute right-2 top-7 bg-theme-400 text-white text-xs rounded-full px-4 py-2 shadow-md flex items-center gap-2 z-10">
          <button
            className="hover:underline"
            onClick={() => {
              setIsEditMode(true);
              setIsMenuOpen(false);
            }}
          >
            수정
          </button>
          <span>|</span>
          <button
            className="hover:underline"
            onClick={() => {
              setIsConfirmOpen(true);
              setIsMenuOpen(false);
            }}
          >
            삭제
          </button>
          <span>|</span>
          <button
            className="hover:underline"
            onClick={() => {
              setIsReportOpen(true);
              setIsMenuOpen(false);
            }}
          >
            신고
          </button>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={"댓글을 삭제하시겠습니까?"}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
      />

      {/* 신고 확인 모달 */}
      <ConfirmModal
        isOpen={isReportOpen}
        message={"댓글을 신고하시겠습니까?"}
        onCancel={() => setIsReportOpen(false)}
        onConfirm={handleReport}
      />

      {/* 날짜 */}
      <p className="text-xs text-gray-400">{formatDateTime(createdAt)}</p>

      {/* 수정 모드 vs 보기 모드 */}
      {isEditMode ? (
        <div className="flex flex-col gap-2 mt-1">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none"
            rows={3}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsEditMode(false)}
              className="text-sm text-zinc-500 border border-zinc-300 px-3 py-1 rounded-full"
            >
              취소
            </button>
            <button
              onClick={handleUpdate}
              className="text-sm text-white bg-theme-400 px-3 py-1 rounded-full"
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-zinc-700 whitespace-pre-line mt-1">{content}</p>
          {!parentCommentId && (
            <button
              onClick={() => onReply(commentId)}
              className="text-theme-400 text-xs mt-2 hover:underline"
            >
              답글 달기
            </button>
          )}
        </>
      )}
    </div>
  );
}
