"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import DefaultLayout from "@/components/DefaultLayout";
import InputCard from "@/components/diary-write/InputCard";

function DateInputCard() {
  return (
    <Card width="w-1/3">
      <div>날짜 입력</div>
    </Card>
  );
}

function TitleInputCard() {
  return <InputCard placeholder="제목을 입력하세요" />;
}

export default function Page() {
  const submitDiary = (): void => {
    console.log("작성 버튼 클릭");
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center gap-4">
        <DateInputCard />
        <TitleInputCard />
        <Button text="작성하기" width="w-1/3" onClick={submitDiary} />
      </div>
    </DefaultLayout>
  );
}
