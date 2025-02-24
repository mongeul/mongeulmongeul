import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const DiaryTitle: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  if (!selectedDiary) return null;

  return (
    <h2 className="text-xl font-bold">{selectedDiary.title || "제목없음"}</h2>
  );
};

export default DiaryTitle;
