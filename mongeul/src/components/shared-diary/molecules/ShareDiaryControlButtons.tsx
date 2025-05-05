import ShareDiaryUpdateButton from "../atoms/ShareDiaryUpdateButton";
import ShareDiaryDeleteButton from "../atoms/ShareDiaryDeleteButton";

export default function ShareDiaryControlButtons() {
  return (
    <div className="flex flex-row w-full justify-end items-center gap-2 px-2 py-3">
      <ShareDiaryUpdateButton />
      <ShareDiaryDeleteButton />
    </div>
  );
}
