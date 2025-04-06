"use client";

import { FeedDetail } from "@/types/feedTypes";
import DiaryHeader from "../molecules/DiaryHeader";
import DiaryContentCard from "../atoms/DiaryContentCard";
import DiaryImageCard from "../atoms/DiaryImageCard";
import { Diary } from "@/types/diaryTypes";

interface DiaryDetailContainerProps {
  diary: FeedDetail | Diary;
}

export default function DiaryDetailContainer({
  diary,
}: DiaryDetailContainerProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <DiaryHeader
        weather={diary.weather!}
        feeling={diary.feeling!}
        privateStatus={diary.privateStatus}
        title={diary.title}
        date={diary.date}
      />
      {diary.picture && <DiaryImageCard picture={diary.picture} />}
      <DiaryContentCard content={diary.content} />
    </div>
  );
}
