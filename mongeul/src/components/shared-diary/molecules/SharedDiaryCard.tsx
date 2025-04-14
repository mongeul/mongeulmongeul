"use client";

import { useState } from "react";
import { deleteFriend } from "@/lib/api/shared-diary";
import { useRouter } from "next/navigation";
import Card from "@/components/common/atoms/Card";
import NicknameBadge from "../atoms/NicknameBadge";
import DiaryStats from "../atoms/DiaryStats";
import RecentAuthor from "../atoms/RecentAuthor";
import MenuIcon from "@/assets/icons/menudot.svg";
import Button from "@/components/common/atoms/Button";

interface SharedDiaryCardProps {
  friendId: number;
  nickname: string;
  day: number;
  count: number;
  writer: boolean;
  date: string;
  onDelete: (friendId: number) => void;
}

export default function SharedDiaryCard({
  friendId,
  nickname,
  day,
  count,
  writer,
  date,
  onDelete,
}: SharedDiaryCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 버튼 토글 상태
  const [isDeleting, setIsDeleting] = useState(false); // 삭제 로딩 상태
  const router = useRouter();

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteFriend(friendId); // API 호출
      onDelete(friendId); // UI에서 제거
    } catch (error) {
      console.error("친구 삭제 실패:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const isMyTurn = writer === false;

  const handleCardClick = () => {
    router.push(`/shared-diary/${friendId}`);
  };

  return (
    <Card
      width="w-full max-w-lg mx-auto"
      roundSize="rounded-3xl"
      bgColor={isMyTurn ? "bg-theme-200" : "bg-white"}
      onClick={handleCardClick}
    >
      <div className="flex justify-between p-3 items-center w-full relative gap-6">
        <div onClick={(e) => e.stopPropagation()}>
          <MenuIcon
            className="w-5 h-5 text-zinc-400 absolute top-2 right-3 cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
          {isMenuOpen && (
            <div
              className="absolute top-7 right-0 bg-white shadow-lg border rounded-md p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                text={isDeleting ? "삭제 중..." : "삭제하기"}
                width="w-24"
                height="h-10"
                backgroundColor="bg-red-500"
                textColor="text-white"
                onClick={handleDelete}
                disabled={isDeleting}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 pl-6 flex-1">
          <NicknameBadge nickname={nickname} />
          <DiaryStats days={day} count={count} />
        </div>

        <div className="pr-6">
          <RecentAuthor
            author={writer ? "나" : nickname}
            date={date}
            isMyTurn={isMyTurn}
          />
        </div>
      </div>
    </Card>
  );
}
