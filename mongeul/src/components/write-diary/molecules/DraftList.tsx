"use client";

import { useEffect, useState } from "react";
import { fetchDiaryDraft } from "@/lib/api/write-diary";
import { Draft } from "@/types/diaryTypes";
import DraftItem from "../atoms/DraftItem";
import { DraftItemSkeleton } from "@/components/skeletons";

interface DraftListProps {
  onClose: () => void;
}

export default function DraftList({ onClose }: DraftListProps) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDrafts() {
      try {
        const data = await fetchDiaryDraft();
        if (data.success && data.data) {
          setDrafts(data.data);
        } else {
          setError("임시저장 목록을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("임시저장 목록 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDrafts();
  }, []);

  // 임시저장 일기 삭제
  const handleDeleteDraft = (diaryId: number) => {
    setDrafts((prevDrafts) =>
      prevDrafts.filter((draft) => draft.diaryId !== diaryId)
    );
  };

  if (loading)
    return [...Array(2)].map((_, index) => <DraftItemSkeleton key={index} />);
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full gap-3">
      {drafts.length > 0 ? (
        drafts.map((draft) => (
          <DraftItem
            key={draft.diaryId}
            draft={draft}
            onDelete={handleDeleteDraft}
            onClose={onClose}
          />
        ))
      ) : (
        <div className="text-xs text-gray-400 p-4 w-full h-20 flex justify-center items-center">
          임시저장된 일기가 없습니다.
        </div>
      )}
    </div>
  );
}
