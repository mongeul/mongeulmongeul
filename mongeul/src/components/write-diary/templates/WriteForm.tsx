"use client";

import { Suspense } from "react";
import ContentCard from "../organisms/ContentCard";
import DateInputCard from "../organisms/DateInputCard";
import PictureCard from "../organisms/PictureCard";
import IconCard from "../organisms/IconCard";
import TitleCard from "../organisms/TitleCard";
import SearchParamsProvider from "@/components/layout/SearchParamsProvider";

export default function WriteForm() {
  return (
    <Suspense>
      <SearchParamsProvider>
        {(diaryId) => (
          <div className="flex flex-col w-full gap-4">
            <DateInputCard />
            <IconCard />
            <TitleCard />
            <PictureCard diaryId={diaryId} />
            <ContentCard />
          </div>
        )}
      </SearchParamsProvider>
    </Suspense>
  );
}
