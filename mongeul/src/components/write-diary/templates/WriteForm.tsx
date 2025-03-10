"use client";

import { useSearchParams } from "next/navigation";
import ContentCard from "../organisms/ContentCard";
import DateInputCard from "../organisms/DateInputCard";
import PictureCard from "../organisms/PictureCard";
import IconCard from "../organisms/IconCard";
import TitleCard from "../organisms/TitleCard";

export default function WriteForm() {
  const searchParams = useSearchParams();
  const diaryId = searchParams.get("id")
    ? Number(searchParams.get("id"))
    : null;

  return (
    <div className="flex flex-col w-full gap-4">
      <DateInputCard />
      <IconCard />
      <TitleCard />
      <PictureCard diaryId={diaryId ? Number(diaryId) : null} />
      <ContentCard />
    </div>
  );
}
