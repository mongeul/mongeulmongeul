import PrivateDiaryCheckbox from "../atoms/PrivateDiaryCheckbox";
import FeedList from "../molecules/FeedList";

export default function FeedListTemplates() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="w-full flex justify-end">
        <PrivateDiaryCheckbox />
      </div>
      <FeedList />
    </div>
  );
}
