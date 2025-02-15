"use client";

import Button from "@/components/button";
import DefaultLayout from "@/components/DefaultLayout";
import IconCard from "@/components/write-diary/organisms/IconCard";
import DateInputCard from "@/components/write-diary/organisms/DateInputCard";
import ContentCard from "@/components/write-diary/organisms/ContentCard";
import TitleCard from "@/components/write-diary/organisms/TitleCard";

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
        <Button text="작성하기" width="w-full md:w-1/3" onClick={submitDiary} />
      </div>
    </DefaultLayout>
  );
}
