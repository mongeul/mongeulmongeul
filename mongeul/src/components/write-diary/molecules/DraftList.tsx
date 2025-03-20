import { useEffect, useState, useCallback } from "react";
import { fetchDiaryDraft, fetchSharedDiaryDraft } from "@/lib/api/write-diary";
import { Draft } from "@/types/diaryTypes";
import DraftItem from "../atoms/DraftItem";
import { DraftItemSkeleton } from "@/components/skeletons";

interface DraftListProps {
  onClose: () => void;
  groupId: number | null;
}

export default function DraftList({ onClose, groupId }: DraftListProps) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback으로 loadDrafts 감싸기
  const loadDrafts = useCallback(async () => {
    setLoading(true);
    try {
      const data = groupId
        ? await fetchSharedDiaryDraft(groupId)
        : await fetchDiaryDraft();
      if (data.success && data.data) {
        setDrafts(data.data);
      } else {
        setError(
          groupId
            ? "공유일기 임시저장 목록을 불러오는 데 실패했습니다."
            : "개인일기 임시저장 목록을 불러오는 데 실패했습니다."
        );
      }
    } catch (err) {
      console.error(
        groupId
          ? "공유일기 임시저장 목록 조회 실패:"
          : "개인일기 임시저장 목록 조회 실패:",
        err
      );
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  // 임시저장 일기 삭제 핸들러
  const handleDeleteDraft = (diaryId: number) => {
    setDrafts((prevDrafts) =>
      prevDrafts.filter((draft) => draft.diaryId !== diaryId)
    );
  };

  const renderContent = () => {
    if (loading)
      return [...Array(2)].map((_, index) => <DraftItemSkeleton key={index} />);
    if (error) return <div className="text-red-500">{error}</div>;
    if (drafts.length === 0)
      return (
        <div className="text-xs text-gray-400 p-4 w-full h-20 flex justify-center items-center">
          임시저장된 일기가 없습니다.
        </div>
      );

    return drafts.map((draft) => (
      <DraftItem
        key={draft.diaryId}
        groupId={groupId}
        draft={draft}
        onDelete={handleDeleteDraft}
        onClose={onClose}
      />
    ));
  };

  return <div className="w-full gap-3">{renderContent()}</div>;
}
