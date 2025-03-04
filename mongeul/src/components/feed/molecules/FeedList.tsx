"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchFeedsList } from "@/lib/api/feed";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import FeedItem from "../atoms/FeedItem";
import { FeedsResponse, FeedPreview } from "@/types/feedTypes";

export default function FeedList() {
  const myFeed = useSelector((state: RootState) => state.feed.myFeed);

  console.log("Feed List 렌더링", myFeed);

  // TanStack Query - useInfiniteQuery 적용
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<FeedsResponse, Error>({
    queryKey: ["feeds", myFeed],
    queryFn: async ({ pageParam = null }) => {
      console.log("pageParam:", pageParam, "myFeed:", myFeed);
      const result = await fetchFeedsList(
        20,
        typeof pageParam === "number" ? pageParam : null,
        myFeed
      );
      console.log("API 응답 결과:", result);
      return result;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      console.log("lastPage 데이터:", lastPage);
      if (!lastPage || !lastPage.data || lastPage.data.length === 0)
        return null;

      const lastFeed = lastPage.data[lastPage.data.length - 1];

      console.log("마지막 피드 ID:", lastFeed.feedId);

      return typeof lastFeed.feedId === "number" ? lastFeed.feedId : null;
    },
  });

  console.log("Query 상태 data:", data);
  console.log("Query 상태 hasNextPage:", hasNextPage);
  console.log("Query 상태 isFetchingNextPage:", isFetchingNextPage);
  console.log("Query 상태 isLoading:", isLoading);
  console.log("Query 상태 isError:", isError, "error:", error);

  // Intersection Observer
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      console.log(
        "Intersection Observer 감지, isIntersecting:",
        entries[0].isIntersecting
      );
      if (entries[0].isIntersecting && hasNextPage) {
        console.log("다음 페이지 요청");
        fetchNextPage();
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <div className="text-center">로딩 중...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">
        에러 발생: {error?.message}
      </div>
    );

  return (
    <div className="relative w-full h-auto min-h-screen grid grid-cols-4 gap-4 p-4">
      {data?.pages
        ?.flatMap((page) => {
          console.log("페이지 데이터 :", page);
          return page.data;
        })
        .map((feed: FeedPreview) => (
          <div key={feed.feedId} className="relative w-full h-40">
            <FeedItem feed={feed} />
          </div>
        ))}

      {isFetchingNextPage && (
        <div className="text-center col-span-4">더 불러오는 중...</div>
      )}

      {/* Intersection Observer 감지 div */}
      <div ref={observerRef} className="w-full h-10" />
    </div>
  );
}
