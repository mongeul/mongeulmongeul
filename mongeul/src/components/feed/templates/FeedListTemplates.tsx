import PrivateDiaryCheckbox from "../atoms/PrivateDiaryCheckbox";
import FeedList from "../molecules/FeedList";

export default function FeedListTemplates() {
  return (
    <div className="w-full h-full flex flex-col items-center gap-6">
      <div className="w-full flex justify-end">
        <PrivateDiaryCheckbox />
      </div>
      <FeedList />
    </div>
  );
}
