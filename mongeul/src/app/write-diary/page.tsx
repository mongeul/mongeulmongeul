"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import DefaultLayout from "@/components/DefaultLayout";
import InputCard from "@/components/write-diary/InputCard";
import TextareaCard from "@/components/write-diary/TextareaCard";
import PublicIcon from "@/assets/icons/public.svg";
import LockedIcon from "@/assets/icons/locked.svg";
import UnlockedIcon from "@/assets/icons/unlocked.svg";
import RoundIcon from "@/components/write-diary/RoundIcon";

function DateInputCard() {
  return (
    <Card width="w-1/3">
      <div>날짜 입력</div>
    </Card>
  );
}

function IconCard() {
  return (
    <Card width="w-1/3">
      <div className="flex flex-row items-center justify-evenly py-1 w-full">
        <div className="flex flex-col items-center justify-center gap-2">
          <RoundIcon backgroundColor="bg-zinc-300">
            <PublicIcon className="text-white h-9 w-9" />
          </RoundIcon>
          <p className="text-xs text-zinc-400">오늘의 기분</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <RoundIcon backgroundColor="bg-zinc-300">
            <LockedIcon className="text-white h-9 w-9" />
          </RoundIcon>
          <p className="text-xs text-zinc-400">오늘의 날씨</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <RoundIcon backgroundColor="bg-zinc-300">
            <UnlockedIcon className="text-white h-9 w-9" />
          </RoundIcon>
          <p className="text-xs text-zinc-400">공개 설정</p>
        </div>
      </div>
    </Card>
  );
}

function TitleCard() {
  return <InputCard placeholder="제목을 입력하세요" />;
}

function ContentCard() {
  return <TextareaCard placeholder="오늘 하루를 글로 기록해보세요" />;
}

export default function Page() {
  const submitDiary = (): void => {
    console.log("작성 버튼 클릭");
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center gap-4">
        <DateInputCard />
        <IconCard />
        <TitleCard />
        <ContentCard />
        <Button text="작성하기" width="w-1/3" onClick={submitDiary} />
      </div>
    </DefaultLayout>
  );
}
