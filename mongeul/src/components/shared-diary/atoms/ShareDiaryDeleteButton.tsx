"use client";

import DiaryDeleteIcon from "@/assets/icons/trash.svg";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SharedDiary } from "@/lib/api/shared-diary";
import { deleteSharedDiaryEntry } from "@/lib/api/write-diary";

export default function ShareDiaryDeleteButton() {
  const router = useRouter();
  const selectedSharedDiary = useSelector(
    (state: RootState) => state.calendar.selectedSharedDiary
  ) as SharedDiary;

  const handleDelete = async () => {
    await deleteSharedDiaryEntry(selectedSharedDiary.shareDiaryId);
    router.push("/shared-diary");
    router.refresh();
  };

  return (
    <DiaryDeleteIcon onClick={handleDelete} className="w-6 h-6 text-gray-400" />
  );
}
