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
  const pageSize = 20;

  console.log("Feed List 렌더링", myFeed);

  // TanStack Query - useInfiniteQuery로 무한스크롤 데이터 패칭 설정
  const {
    data, // 패칭된 데이터
    fetchNextPage, // 다음 페이지 요청 함수
    hasNextPage, // 다음 페이지 존재 여부
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<FeedsResponse, Error>({
    queryKey: ["feeds", myFeed], // 쿼리 키: 동일한 요청을 캐싱하여 관리
    queryFn: async ({ pageParam = null }) => {
      console.log("pageParam:", pageParam, "myFeed:", myFeed);
      const result = await fetchFeedsList(
        pageSize,
        typeof pageParam === "number" ? pageParam : null,
        myFeed
      );
      console.log("API 응답 결과:", result);
      return result;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      console.log("lastPage 데이터:", lastPage);
      // 마지막 페이지 데이터가 없으면 null 반환 (더 이상 불러올 데이터 없음)
      if (!lastPage || !lastPage.data || lastPage.data.length === 0)
        return null;

      // 마지막 피드의 feedId
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

  // Intersection Observer를 위한 ref (마지막 요소 감지)
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    // Intersection Observer 생성
    const observer = new IntersectionObserver((entries) => {
      console.log(
        "Intersection Observer 감지, isIntersecting:",
        entries[0].isIntersecting
      );

      // 마지막 피드가 화면에 보이고, 다음 페이지가 있다면 추가 데이터 요청
      if (entries[0].isIntersecting && hasNextPage) {
        console.log("다음 페이지 요청");
        fetchNextPage();
      }
    });

    // 감지할 요소 등록
    observer.observe(observerRef.current);

    // 언마운트 시 옵저버 해제
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
      <div ref={observerRef} className="w-full h-10" />
    </div>
  );
}
