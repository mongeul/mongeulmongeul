import DiaryDeleteIcon from "@/assets/icons/trash.svg";
import { deleteDiaryEntry } from "@/lib/api/write-diary";
import { RootState } from "@/store/store";
import { Diary } from "@/types/diaryTypes";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function DiaryUpdateButton() {
  const router = useRouter();
  const selectedDiary = useSelector(
    (state: RootState) => state.calendar.selectedDiary
  ) as Diary;

  const handleDiaryDelete = () => {
    deleteDiaryEntry(selectedDiary.diaryId);
    router.push("/diary");
    router.refresh();
  };

  return (
    <DiaryDeleteIcon
      onClick={handleDiaryDelete}
      className="w-6 h-6 text-gray-400"
    />
  );
}
