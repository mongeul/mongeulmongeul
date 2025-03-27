import DiaryDeleteButton from "../atoms/DiaryDeleteButton";
import DiaryUpdateButton from "../atoms/DiaryUpdateButton";

export default function DiaryControlButtons() {
  return (
    <div className="flex flex-row w-full justify-end items-center gap-2 px-2 py-3">
      <DiaryUpdateButton />
      <DiaryDeleteButton />
    </div>
  );
}
