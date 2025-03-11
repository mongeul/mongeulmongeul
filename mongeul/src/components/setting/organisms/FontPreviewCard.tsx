import DiaryDetailContainer from "@/components/common/organisms/DiaryDetailContainer";
import { Diary } from "@/types/diaryTypes";

export default function FontPreviewCard() {
  const date = new Date().toISOString().split("T")[0];
  const preview: Diary = {
    title: "폰트 미리보기입니다",
    content:
      "마음에 드는 폰트로 바꿔보세요!\n폰트 크기와 모양을 원하는 대로 바꿀 수 있어요",
    date: date,
    weather: "SUNNY",
    feeling: "HAPPY",
    privateStatus: "PRIVATE",
    diaryId: 0,
    published: false,
  };

  return <DiaryDetailContainer diary={preview} />;
}
