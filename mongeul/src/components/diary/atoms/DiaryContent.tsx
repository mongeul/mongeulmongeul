import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import { Diary } from "@/types/diaryTypes";

const DiaryContent: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  if (!selectedDiary || selectedDiary === "LOCK") return null; // "LOCK"일 때도 예외 처리

  return <p>{selectedDiary.content || "내용없음"}</p>;
};

export default DiaryContent;
