import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getPrivateStatusIcon } from "@/utils/uiUtils";

const DiaryPrivateStatus: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  if (!selectedDiary) return null;

  const { icon, label } = getPrivateStatusIcon(selectedDiary.privateStatus);

  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
};

export default DiaryPrivateStatus;
