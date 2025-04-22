import { useState } from "react";
import { formatDateTime } from "@/utils/formatDate";
import { deleteComment, reportComment } from "@/lib/api/comment";
import MenuIcon from "@/assets/icons/menudot.svg";
import ConfirmModal from "@/components/common/atoms/ConfirmModal";

interface CommentItemProps {
  commentId: number;
  content: string;
  createdAt: string;
  onDelete: () => void;
}

export default function CommentItem({
  commentId,
  content,
  createdAt,
  onDelete,
}: CommentItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

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
  return (
    <div className="relative text-sm border-b border-gray-100 pb-4 pt-2 pr-8">
      {/* 메뉴 아이콘 */}
      <MenuIcon
        className="w-5 h-5 text-zinc-400 absolute top-2 right-2 cursor-pointer"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* 메뉴 말풍선 */}
      {isMenuOpen && (
        <div className="absolute right-2 top-7 bg-theme-400 text-white text-xs rounded-full px-4 py-2 shadow-md flex items-center gap-2 z-10">
          <button className="hover:underline">수정</button>
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

      {/* 날짜 + 내용 */}
      <p className="text-xs text-gray-400">{formatDateTime(createdAt)}</p>
      <p className="text-zinc-700 whitespace-pre-line mt-1">{content}</p>
    </div>
  );
}
