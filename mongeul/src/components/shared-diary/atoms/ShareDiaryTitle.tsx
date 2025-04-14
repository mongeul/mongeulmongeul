import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ShareDiaryTitle: React.FC = () => {
  const { selectedSharedDiary } = useSelector(
    (state: RootState) => state.calendar
  );
  if (!selectedSharedDiary) return null;

  return (
    <h2 className="text-xl font-bold">
      {selectedSharedDiary.title || "제목없음"}
    </h2>
  );
};

export default ShareDiaryTitle;
