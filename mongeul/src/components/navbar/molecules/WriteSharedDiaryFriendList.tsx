import { useEffect, useState } from "react";
import WriteSharedDiaryFriendItem from "../atoms/WriteSharedDiaryFriendItem";
import { WriteSharedDiaryItemSkeleton } from "@/components/skeletons";

export default function WriteSharedDiaryFriendList() {
  const [loading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([
    { nickname: "나", groupId: 1 },
    { nickname: "너", groupId: 2 },
    { nickname: "쟤", groupId: 3 },
  ]);

  useEffect(() => {
    setIsLoading(false);
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
      {groups.map((group) => (
        <WriteSharedDiaryFriendItem
          key={group.groupId}
          groupId={group.groupId}
          nickname={group.nickname}
        />
      ))}
    </div>
  );
}
