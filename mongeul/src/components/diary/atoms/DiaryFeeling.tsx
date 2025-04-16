import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { RootState } from "@/store/store";
import { Feeling } from "@/types/diaryTypes";
import { useSelector } from "react-redux";

const DiaryFeeling: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  if (!selectedDiary || selectedDiary === "LOCK") return null;
  const { feeling } = selectedDiary;

  return (
    <div className="flex items-center space-x-2">
      <FeelingsIcon feeling={selectedDiary.feeling} size="w-10 h-10" />
    </div>
  );
};

export default DiaryFeeling;
