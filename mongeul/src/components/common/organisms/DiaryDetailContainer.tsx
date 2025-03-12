import { FeedDetail } from "@/types/feedTypes";
import DiaryHeader from "../molecules/DiaryHeader";
import DiaryContentCard from "../atoms/DiaryContentCard";
import ImageCard from "../atoms/ImageCard";
import { Diary, Feeling, Weather } from "@/types/diaryTypes";

interface DiaryDetailContainerProps {
  diary: FeedDetail | Diary;
}

export default function DiaryDetailContainer({
  diary,
}: DiaryDetailContainerProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <DiaryHeader
        weather={diary.weather as Weather}
        feeling={diary.feeling as Feeling}
        privateStatus={diary.privateStatus}
        title={diary.title}
        date={diary.date}
      />
      {diary.picture && <ImageCard picture={diary.picture} />}
      <DiaryContentCard content={diary.content} />
    </div>
  );
}
