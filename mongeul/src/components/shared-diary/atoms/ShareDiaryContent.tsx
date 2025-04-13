import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ShareDiaryContent: React.FC = () => {
  const { selectedSharedDiary } = useSelector(
    (state: RootState) => state.calendar
  );
  if (!selectedSharedDiary) return null;

  return <p>{selectedSharedDiary.content || "내용없음"}</p>;
};

export default ShareDiaryContent;
