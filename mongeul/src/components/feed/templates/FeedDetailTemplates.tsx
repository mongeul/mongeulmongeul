"use client";

import { fetchFeedDetail } from "@/lib/api/feed";
import { FeedDetail } from "@/types/feedTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DiaryDetailContainer from "../../common/organisms/DiaryDetailContainer";

export default function FeedDetailTemplates() {
  const { id } = useParams();
  const [feed, setFeed] = useState<FeedDetail | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    async function loadFeed() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchFeedDetail(Number(id));
        if (data?.success && data.data) {
          setFeed(data.data);
        } else {
          setError("게시물을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("피드 디테일 조회 실패:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!feed) return <p>게시물을 찾을 수 없습니다.</p>;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {feed && <DiaryDetailContainer diary={feed} />}
    </div>
  );
}
