import DiaryDeleteButton from "../atoms/DiaryDeleteButton";
import DiaryUpdateButton from "../atoms/DiaryUpdateButton";

export default function DiaryControlButtons() {
  return (
    <div className="flex flex-row w-full jusity-end items-center gap-2">
      <DiaryUpdateButton />
      <DiaryDeleteButton />
    </div>
  );
}
