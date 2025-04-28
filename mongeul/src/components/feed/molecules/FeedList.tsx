"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback, useMemo } from "react";
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

  // fetchNextPage()를 1초 동안 한 번만 호출하도록 쓰로틀링
  // 빠르게 여러 번 IntersectionObserver가 트리거되어도 1초에 최대 1번만 API 호출
  const throttledFetchNextPage = useMemo(
    () =>
      throttle(() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }, 1000), // 1000ms 동안 1번만 호출
    [hasNextPage, fetchNextPage]
  );

  // IntersectionObserver 콜백
  // 관찰 대상이 뷰포트에 들어오면 throttledFetchNextPage() 호출
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        throttledFetchNextPage();
      }
    },
    [throttledFetchNextPage]
  );

  // IntersectionObserver 등록
  // 컴포넌트 마운트 시 observer 등록
  // 언마운트 시 observer 해제
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null, // 뷰포트 기준
      rootMargin: "100px", // 100px 전에 미리 로딩 트리거
      threshold: 0.1, // 10% 이상 요소가 보여야 트리거
    });

    observer.observe(observerRef.current); // ref에 등록된 요소 관찰 시작

    return () => {
      observer.disconnect();
      throttledFetchNextPage.cancel();
    };
  }, [handleObserver, throttledFetchNextPage]);

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
      {/* 마지막 요소 감지 */}
      <div ref={observerRef} className="w-full h-10" />
    </div>
  );
}
