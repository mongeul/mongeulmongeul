"use client";

import WriteForm from "@/components/write-diary/templates/WriteForm";
import DraftAlertModal from "@/components/write-diary/molecules/DraftAlertModal";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <div className="w-full flex flex-col items-center gap-4">
        <WriteForm />
        <DraftAlertModal />
      </div>
    </Suspense>
  );
}
