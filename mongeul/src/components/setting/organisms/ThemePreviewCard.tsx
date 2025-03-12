"use client";

import SharedDiaryCard from "@/components/shared-diary/molecules/SharedDiaryCard";

export default function ThemePreviewCard() {
  const preview = {
    friendId: 0,
    nickname: "몽글이",
    day: 10,
    count: 5,
    writer: true,
    date: "오늘",
  };
  return (
    <SharedDiaryCard
      friendId={preview.friendId}
      nickname={preview.nickname}
      day={preview.day}
      count={preview.count}
      writer={preview.writer}
      date="오늘"
      onDelete={() => {}}
    />
  );
}
