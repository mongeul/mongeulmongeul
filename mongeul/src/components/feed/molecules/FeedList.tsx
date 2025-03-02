"use client";

import { FeedPreview } from "@/types/feedTypes";
import FeedItem from "../atoms/FeedItem";
import { useState, useEffect } from "react";
import { fetchFeedsList } from "@/lib/api/feed";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setLastDiaryId } from "@/store/feedSlice";

export default function FeedList() {
  const dispatch = useDispatch();
  const [feeds, setFeeds] = useState<FeedPreview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLast, setIslast] = useState<boolean>(false);
  const pageSize = 20;

  const lastDiaryId = useSelector((state: RootState) => state.feed.lastDiaryId);
  const myFeed = useSelector((state: RootState) => state.feed.myFeed);

  useEffect(() => {
    async function loadFeeds() {
      try {
        const data = await fetchFeedsList(pageSize, lastDiaryId, myFeed);

        if (data.success && Array.isArray(data.data)) {
          console.log("피드 데이터:", data.data);
          setFeeds(data.data);

          if (data.data.length > 0) {
            dispatch(setLastDiaryId(data.data[data.data.length - 1].feedId));
          } else if (data.data.length === 0) {
            setIslast(true);
          }
        } else {
          setError("피드 목록을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("피드 목록 조회 실패:", err);
        setError("피드 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
    loadFeeds();
  }, [myFeed]);

  if (loading) return <div className="text-center text-sm">로딩 중...</div>;
  if (error) return <div className="text-center text-sm">{error}</div>;

  return (
    <div className="relative w-full h-auto min-h-screen grid grid-cols-4 gap-4 p-4">
      {feeds.length > 0 ? (
        feeds.map((feed) => (
          <div key={feed.feedId} className="relative w-full h-20">
            <FeedItem feed={feed} />
          </div>
        ))
      ) : (
        <div className="col-span-4 text-center text-sm text-gray-400">
          공개된 일기가 없습니다.
        </div>
      )}
    </div>
  );
}
