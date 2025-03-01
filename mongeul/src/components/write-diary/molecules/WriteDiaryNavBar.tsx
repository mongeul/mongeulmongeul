import CreateDiaryButton from "../atoms/CreateDiaryButton";
import DraftButtons from "./DraftButtons";

export default function WriteDiaryNavBar() {
  return (
    <div className="w-full px-6 flex flex-row gap-6">
      <CreateDiaryButton />
      <DraftButtons />
    </div>
  );
}
