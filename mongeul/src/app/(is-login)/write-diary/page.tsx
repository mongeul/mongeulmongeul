"use client";
import { useSearchParams } from "next/navigation";
import WriteForm from "@/components/write-diary/templates/WriteForm";
import DraftAlertModal from "@/components/write-diary/molecules/DraftAlertModal";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <WriteForm />
      <DraftAlertModal />
    </div>
  );
}
