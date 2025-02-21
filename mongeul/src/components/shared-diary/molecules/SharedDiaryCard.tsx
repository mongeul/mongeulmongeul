"use client";

import Card from "@/components/common/atoms/Card";
import NicknameBadge from "../atoms/NicknameBadge";
import DiaryStats from "../atoms/DiaryStats";
import RecentAuthor from "../atoms/RecentAuthor";
import MenuIcon from "@/assets/icons/menudot.svg";

interface SharedDiaryCardProps {
  nickname: string;
  day: number;
  count: number;
  writer: string;
  date: string;
}

export default function SharedDiaryCard({
  nickname,
  day,
  count,
  writer,
  date,
}: SharedDiaryCardProps) {
  return (
    <Card width="w-full max-w-lg mx-auto" roundSize="rounded-3xl">
      <div className="flex justify-between items-center w-full p-3 bg-white relative gap-6">
        <MenuIcon className="w-5 h-5 text-zinc-400 absolute top-2 right-3 cursor-pointer" />
        <div className="flex flex-col gap-1 pl-6 flex-1">
          <NicknameBadge nickname={nickname} />
          <DiaryStats days={day} count={count} />
        </div>

        <div className="pr-6">
          <RecentAuthor author={writer} date={date} />
        </div>
      </div>
    </Card>
  );
}
