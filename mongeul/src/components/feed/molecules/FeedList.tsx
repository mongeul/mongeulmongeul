"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import FeedItem from "../atoms/FeedListItem";
import { FeedListResponse, FeedListItem } from "@/types/feedTypes";
import Spinner from "@/components/common/atoms/Spinner";
import { fetchFeeds } from "@/lib/api/feed";

export default function FeedList() {
  const myFeed = useSelector((state: RootState) => state.feed.myFeed);
  const pageSize = 20;
  const observerRef = useRef<HTMLDivElement | null>(null);

  console.log("Feed List 렌더링 - myFeed:", myFeed);

  // useInfiniteQuery 최적화 및 타입 지정
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<FeedListResponse, Error>({
    queryKey: ["feeds", myFeed],
    queryFn: async ({ pageParam }: { pageParam: unknown }) => {
      const validPageParam = typeof pageParam === "number" ? pageParam : null;
      return fetchFeeds(pageSize, validPageParam, myFeed);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: FeedListResponse) => {
      if (!lastPage?.data?.length) return null;
      return lastPage.data[lastPage.data.length - 1].feedId ?? null;
    },
  });

  // Intersection Observer 핸들러 (useCallback 사용)
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && hasNextPage) {
        console.log("다음 페이지 요청");
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  // useEffect에서 Intersection Observer 최적화
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null, // 뷰포트 기준
      rootMargin: "100px", // 100px 남았을 때 미리 로딩
      threshold: 0.1, // 10% 이상 보이면 실행
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect(); // 언마운트 시 옵저버 해제
  }, [handleObserver]);

  if (isLoading)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500">
        에러 발생: {error?.message}
      </div>
    );

  return (
    <div className="relative w-full h-auto grid grid-cols-4 gap-4 p-4 grid-auto-rows-min place-items-start">
      {data?.pages
        .flatMap((page) => page.data)
        .map((feed: FeedListItem) => (
          <div key={feed.feedId} className="relative w-full h-40">
            <FeedItem feed={feed} />
          </div>
        ))}
      {isFetchingNextPage && (
        <div className="text-center col-span-4">
          <Spinner />
        </div>
      )}
      {/* 마지막 요소 감지 */}
      <div ref={observerRef} className="w-full h-10" />
    </div>
  );
}
