import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const DiaryContent: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  if (!selectedDiary) return null;

  return <p>{selectedDiary.content || "내용없음"}</p>;
};

export default DiaryContent;
