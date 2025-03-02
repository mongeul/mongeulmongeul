"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, updateFriendOrder } from "@/store/shareDiarySlice";
import { getFriends } from "@/lib/api/sharediary";
import { RootState, AppDispatch } from "@/store/store";
import SharedDiaryCard from "@/components/shared-diary/molecules/SharedDiaryCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function DiaryList() {
  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector((state: RootState) => state.shareDiary.friends);
  const [loading, setLoading] = useState(false);

  // 임시 데이터 추가
  useEffect(() => {
    const savedOrder = localStorage.getItem("friendsOrder");
    if (savedOrder) {
      dispatch(setFriends(JSON.parse(savedOrder)));
    } else {
      // 초기 데이터 설정
      const tempData = [
        { friendId: 1, nickname: "승탁이", day: 98, count: 3, isWriter: false },
        {
          friendId: 2,
          nickname: "호주니",
          day: 120,
          count: 5,
          isWriter: false,
        },
        { friendId: 3, nickname: "joy", day: 45, count: 2, isWriter: false },
      ];
      dispatch(setFriends(tempData));
    }
  }, [dispatch]);

  /*
  // 실제 API 호출 (테스트 후 이걸 다시 활성화하면 됨)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const friendData = await getFriends();
      dispatch(setFriends(friendData));
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  */
  const handleDeleteFriend = (friendId: number) => {
    const updatedFriends = friends.filter(
      (friend) => friend.friendId !== friendId
    );
    dispatch(setFriends(updatedFriends)); // Redux 상태 업데이트
  };
  // 드래그 후 순서 변경
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedFriends = [...friends];
    const [movedItem] = reorderedFriends.splice(result.source.index, 1);
    reorderedFriends.splice(result.destination.index, 0, movedItem);

    // Redux 상태 업데이트
    dispatch(setFriends(reorderedFriends));

    // 로컬 스토리지에 저장
    localStorage.setItem("friendsOrder", JSON.stringify(reorderedFriends));
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
                      day={friend.day}
                      count={friend.count}
                      writer={friend.nickname}
                      date="오늘"
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
