"use client";

import { FeedDetail } from "@/types/feedTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DiaryDetailContainer from "../../common/organisms/DiaryDetailContainer";
import FeedCommentButton from "../atoms/FeedCommentButton";
import { useDispatch } from "react-redux";
import { setFeedDetailEmojis } from "@/store/feedSlice";
import FeedEmojiGroup from "../molecules/FeedEmojiGroup";
import FeedLikeButton from "../atoms/FeedLikeButton";
import { DiaryDetailSkeleton } from "@/components/skeletons";
import { fetchFeedById } from "@/lib/api/feed";
import CommentModal from "../organisms/CommentModal";

export default function FeedDetailTemplates() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [feed, setFeed] = useState<FeedDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const openCommentModal = () => setIsCommentModalOpen(true);
  const closeCommentModal = () => setIsCommentModalOpen(false);

  useEffect(() => {
    if (!id) return;

    async function loadFeed() {
      setLoading(true);

      try {
        const data = await fetchFeedById(Number(id));
        if (data?.success && data.data) {
          setFeed(data.data);
          dispatch(setFeedDetailEmojis(data.data.emojis));
        } else {
        }
      } catch (err) {
        console.error("피드 디테일 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, [dispatch, id]);

  if (loading) return <DiaryDetailSkeleton />;
  if (!feed) return <p>게시물을 찾을 수 없습니다.</p>;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <DiaryDetailContainer diary={feed} />
        <div className="flex flex-row items-center gap-2 h-auto py-4 px-2">
          <FeedCommentButton onClick={openCommentModal} />
          <FeedLikeButton />
          <FeedEmojiGroup />
        </div>
      </div>
      <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} />
    </div>
  );
}
