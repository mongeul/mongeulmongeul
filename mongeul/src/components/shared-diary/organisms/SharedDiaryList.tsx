"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, updateFriendOrder } from "@/store/shareDiarySlice";
import { getFriends } from "@/lib/api/shared-diary";
import { RootState, AppDispatch } from "@/store/store";
import SharedDiaryCard from "@/components/shared-diary/molecules/SharedDiaryCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { formatRelativeDate } from "@/utils/formatDate";

export default function SharedDiaryList() {
  const dispatch = useDispatch<AppDispatch>();
  const friends =
    useSelector((state: RootState) => state.shareDiary.friends) || [];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const friendData = await getFriends();

      const storedOrder = localStorage.getItem("friendsOrder");
      if (storedOrder) {
        const orderedIds = JSON.parse(storedOrder).map(
          (f: { friendId: number }) => f.friendId
        );

        // storedOrder 순서대로 재정렬
        const reordered = orderedIds
          .map((id: number) => friendData.find((f) => f.friendId === id))
          .filter(Boolean); // null 제거

        dispatch(setFriends(reordered));
      } else {
        dispatch(setFriends(friendData));
      }

      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  // 친구 삭제 핸들러
  const handleDeleteFriend = (friendId: number) => {
    const updatedFriends = friends.filter(
      (friend) => friend.friendId !== friendId
    );
    dispatch(setFriends(updatedFriends));
    localStorage.setItem(
      "friendsOrder",
      JSON.stringify(updatedFriends.map((f) => ({ friendId: f.friendId })))
    );
  };

  // 드래그 후 순서 변경
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedFriends = [...friends];
    const [movedItem] = reorderedFriends.splice(result.source.index, 1);
    reorderedFriends.splice(result.destination.index, 0, movedItem);

    dispatch(setFriends(reorderedFriends)); // Redux 상태 업데이트

    localStorage.setItem(
      "friendsOrder",
      JSON.stringify(reorderedFriends.map((f) => ({ friendId: f.friendId })))
    );
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="friendsList">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4"
          >
            {friends.map((friend, index) => (
              <Draggable
                key={friend.friendId.toString()}
                draggableId={friend.friendId.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <SharedDiaryCard
                      friendId={friend.friendId}
                      nickname={friend.nickname}
                      day={friend.daysFromStart}
                      count={friend.diaryCount}
                      writer={friend.writer}
                      date={formatRelativeDate(friend.recentWriteDate)}
                      onDelete={handleDeleteFriend}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
