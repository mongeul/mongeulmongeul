import { useEffect, useState } from "react";
import WriteSharedDiaryFriendItem from "../atoms/WriteSharedDiaryFriendItem";
import { WriteSharedDiaryItemSkeleton } from "@/components/skeletons";
import { fetchWritableFriends } from "@/lib/api/write-diary";
import { WritableFriend } from "@/types/diaryTypes";

export default function WriteSharedDiaryFriendList() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<WritableFriend[]>([]);

  useEffect(() => {
    async function loadWritableFriends() {
      setLoading(true);

      try {
        const data = await fetchWritableFriends();
        if (data?.success && data.data) {
          setGroups(data.data);
        } else {
        }
      } catch (err) {
        console.error("공유일기 작성 가능 친구 목록 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    loadWritableFriends();
  }, []);

  if (loading)
    return (
      <div className="w-full flex flex-col gap-2 py-4">
        {[...Array(2)].map((_, index) => (
          <WriteSharedDiaryItemSkeleton key={index} />
        ))}
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-4 py-4">
      {groups.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">
          지금 공유일기 작성 가능한 친구가 없어요
        </p>
      ) : (
        groups.map((group) => (
          <WriteSharedDiaryFriendItem
            key={group.friendId}
            groupId={group.friendId}
            nickname={group.nickname}
          />
        ))
      )}
    </div>
  );
}
