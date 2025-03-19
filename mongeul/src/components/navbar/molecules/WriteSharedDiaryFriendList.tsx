import { useEffect, useState } from "react";
import WriteSharedDiaryFriendItem from "../atoms/WriteSharedDiaryFriendItem";
import { WriteSharedDiaryItemSkeleton } from "@/components/skeletons";

export default function WriteSharedDiaryFriendList() {
  const [loading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState([
    { nickname: "나", friendId: 1 },
    { nickname: "너", friendId: 2 },
    { nickname: "쟤", friendId: 3 },
  ]);

  // useEffect(() => {

  // }, [])

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
      {friends.map((friend) => (
        <WriteSharedDiaryFriendItem
          key={friend.friendId}
          friendId={friend.friendId}
          nickname={friend.nickname}
        />
      ))}
    </div>
  );
}
