"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import FeedItem from "../atoms/FeedListItem";
import Spinner from "@/components/common/atoms/Spinner";
import { fetchFeeds } from "@/lib/api/feed";
import { FeedListResponse, FeedListItem } from "@/types/feedTypes";
import { throttle } from "lodash";

export default function FeedList() {
  const myFeed = useSelector((state: RootState) => state.feed.myFeed);
  const pageSize = 20;
  const observerRef = useRef<HTMLDivElement | null>(null);

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
    queryFn: async ({ pageParam }) => {
      const validPageParam = typeof pageParam === "number" ? pageParam : null;
      return fetchFeeds(pageSize, validPageParam, myFeed);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.length) return null;
      return lastPage.data[lastPage.data.length - 1].feedId ?? null;
    },
  });

  // throttle을 useRef로 고정 생성 -> 재생성 방지
  const throttledFetchNextPageRef = useRef(
    throttle(() => {
      fetchNextPage();
    }, 1000)
  );

  // IntersectionObserver 콜백
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        throttledFetchNextPageRef.current();
      }
    },
    [hasNextPage]
  );

  // observer 등록 및 정리
  useEffect(() => {
    const observerTarget = observerRef.current;
    const throttled = throttledFetchNextPageRef.current;

    if (!observerTarget) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    });

    observer.observe(observerTarget);

    return () => {
      observer.disconnect();
      throttled.cancel();
    };
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
    <div className="relative w-full h-auto grid grid-cols-4 gap-0 p-0 grid-auto-rows-min place-items-start">
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
      {/* 마지막 요소 감지용 엘리먼트 */}
      <div ref={observerRef} className="w-full h-10" />
    </div>
  );
}
