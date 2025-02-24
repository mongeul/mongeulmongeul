import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const DiaryDate: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  if (!selectedDiary) return null;

  return <p>{selectedDiary.createdAt}</p>;
};

export default DiaryDate;
