import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import PrivateStatusIcon from "@/components/common/atoms/PrivateStatusIcon";

const DiaryPrivateStatus: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  if (!selectedDiary || selectedDiary === "LOCK") return null;

  return (
    <div className="flex items-center space-x-2">
      <PrivateStatusIcon
        privateStatus={selectedDiary.privateStatus}
        size="w-10 h-10"
      />
    </div>
  );
};

export default DiaryPrivateStatus;
