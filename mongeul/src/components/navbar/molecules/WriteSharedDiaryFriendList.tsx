import { useEffect, useState } from "react";
import WriteSharedDiaryFriendItem from "../atoms/WriteSharedDiaryFriendItem";

export default function WriteSharedDiaryFriendList() {
  const [friends, setFriends] = useState([
    { nickname: "나", friendId: 1 },
    { nickname: "너", friendId: 2 },
    { nickname: "쟤", friendId: 3 },
  ]);

  // useEffect(() => {

  // }, [])

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
