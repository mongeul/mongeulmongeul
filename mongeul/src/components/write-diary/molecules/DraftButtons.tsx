import CreateDraftButton from "../atoms/CreateDraftButton";
import DraftListButton from "../atoms/DraftListButton";

export default function DraftButtons() {
  return (
    <div className="w-full flex flex-row rounded-3xl py-2 bg-white border border-theme-400">
      <CreateDraftButton />
      <div className="border-l border-theme-200" />
      <DraftListButton />
    </div>
  );
}
