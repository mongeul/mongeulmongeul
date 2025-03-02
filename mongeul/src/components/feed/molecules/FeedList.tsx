"use client";

import { FeedPreview } from "@/types/feedTypes";
import FeedItem from "../atoms/FeedItem";
import { useState, useEffect, useRef, useCallback } from "react";
import { fetchFeedsList } from "@/lib/api/feed";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { resetFeed, setLastDiaryId } from "@/store/feedSlice";
import { resetDiary } from "@/store/diarySlice";

export default function FeedList() {
  const dispatch = useDispatch();
  const [feeds, setFeeds] = useState<FeedPreview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isLast, setIsLast] = useState<boolean>(false);
  const pageSize = 20;

  const lastDiaryId = useSelector((state: RootState) => state.feed.lastDiaryId);
  const myFeed = useSelector((state: RootState) => state.feed.myFeed);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastFeedRef = useRef<HTMLDivElement | null>(null);

  // 피드 데이터 로드
  const loadFeeds = useCallback(async () => {
    if (isFetching || isLast) return;
    setIsFetching(true);

    try {
      console.log("피드 요청:", { pageSize, lastDiaryId, myFeed });
      const data = await fetchFeedsList(pageSize, lastDiaryId, myFeed);

      if (data.success && Array.isArray(data.data)) {
        console.log("새로운 피드 데이터:", data.data);

        setFeeds((prevFeeds) => {
          const existingIds = new Set(prevFeeds.map((feed) => feed.feedId));
          const newFeeds = data.data.filter(
            (feed) => !existingIds.has(feed.feedId)
          );
          return [...prevFeeds, ...newFeeds];
        });

        if (data.data.length > 0) {
          dispatch(setLastDiaryId(data.data[data.data.length - 1].feedId));
        } else {
          setIsLast(true);
        }
      } else {
        setError("피드 목록을 불러오는 데 실패했습니다.");
      }
    } catch (err) {
      console.error("피드 목록 조회 실패:", err);
      setError("피드 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }, [lastDiaryId, myFeed, isFetching, isLast, dispatch]);

  // 첫 페이지 로드
  useEffect(() => {
    dispatch(setLastDiaryId(null));
    setFeeds([]);
    setIsLast(false);
    loadFeeds();
  }, [myFeed]);

  // Intersection Observer를 활용한 스크롤 감지
  useEffect(() => {
    if (!lastFeedRef.current) return;
    if (isFetching) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && !isLast) {
          console.log("마지막 피드 감지, 새로운 데이터 요청");
          loadFeeds();
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current.observe(lastFeedRef.current);

    return () => observerRef.current?.disconnect();
  }, [loadFeeds, isFetching, isLast]);

  if (loading) return <div className="text-center">로딩 중...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="relative w-full h-auto min-h-screen grid grid-cols-4 gap-4 p-4">
      {feeds.length > 0 ? (
        feeds.map((feed, index) => (
          <div
            key={feed.feedId}
            className="relative w-full h-40"
            ref={index === feeds.length - 1 ? lastFeedRef : null}
          >
            <FeedItem feed={feed} />
          </div>
        ))
      ) : (
        <div className="col-span-4 text-center text-gray-400">
          피드가 없습니다.
        </div>
      )}

      {isFetching && (
        <div className="text-center col-span-4">더 불러오는 중...</div>
      )}
    </div>
  );
}
