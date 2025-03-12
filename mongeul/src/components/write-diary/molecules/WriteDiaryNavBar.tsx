"use client";

import { Suspense } from "react";
import CreateDiaryButton from "../atoms/CreateDiaryButton";
import DraftButtons from "./DraftButtons";
import SearchParamsProvider from "@/components/layout/SearchParamsProvider";

export default function WriteDiaryNavBar() {
  return (
    <Suspense>
      <SearchParamsProvider>
        {(diaryId) => (
          <div className="w-full px-6 flex flex-row gap-6">
            <CreateDiaryButton diaryId={diaryId} />
            {diaryId === null && <DraftButtons />}
          </div>
        )}
      </SearchParamsProvider>
    </Suspense>
  );
}
