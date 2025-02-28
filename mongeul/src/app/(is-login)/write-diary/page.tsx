"use client";

import TempAlertModal from "@/components/write-diary/molecules/TempAlertModal";
import WriteForm from "@/components/write-diary/templates/WriteForm";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Page() {
  const { title, content, drawing, drawingLines, weather, feeling } =
    useSelector((state: RootState) => state.diary);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <WriteForm />
      <TempAlertModal />
    </div>
  );
}
