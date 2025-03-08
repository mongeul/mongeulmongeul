import { useSearchParams } from "next/navigation";
import CreateDiaryButton from "../atoms/CreateDiaryButton";
import DraftButtons from "./DraftButtons";

export default function WriteDiaryNavBar() {
  const searchParams = useSearchParams();
  const diaryId: number | null = Number(searchParams.get("id")) || null;

  return (
    <div className="w-full px-6 flex flex-row gap-6">
      <CreateDiaryButton />
      {diaryId === null && <DraftButtons />}
    </div>
  );
}
