import CreateDraftButton from "../atoms/CreateDraftButton";
import DraftListButton from "../atoms/DraftListButton";

interface DraftButtonsProps {
  groupId: number | null;
}

export default function DraftButtons({ groupId }: DraftButtonsProps) {
  return (
    <div className="w-full flex flex-row rounded-3xl py-2 bg-white border border-theme-400">
      <CreateDraftButton groupId={groupId} />
      <div className="border-l border-theme-200" />
      <DraftListButton groupId={groupId} />
    </div>
  );
}
