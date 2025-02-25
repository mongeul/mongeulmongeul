import DefaultLayout from "@/components/layout/DefaultLayout";
import SharedDiaryHeader from "@/components/shared-diary/organisms/SharedDiaryHeader";
import DiaryList from "@/components/shared-diary/organisms/SharedDiaryList";

export default function SharedDiaryPage() {
  return (
    <DefaultLayout>
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col gap-3">
        <SharedDiaryHeader />
        <DiaryList />
      </div>
    </DefaultLayout>
  );
}
