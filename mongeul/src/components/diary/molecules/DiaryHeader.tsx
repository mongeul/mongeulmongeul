import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DiaryDate from "../atoms/DiaryDate";
import DiaryImage from "../atoms/DiaryImage";
import DiaryFeeling from "../atoms/DiaryFeeling";
import DiaryWeather from "../atoms/DiaryWeather";
import DiaryPrivateStatusIcon from "../atoms/DiaryPrivateStatus";

const DiaryHeader: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  if (!selectedDiary) return null;

  return (
    <div className="flex items-center justify-between w-full p-2">
      <DiaryDate />
      <div className="flex space-x-10">
        <DiaryFeeling />
        <DiaryImage />
        <DiaryWeather />
        <DiaryPrivateStatusIcon />
      </div>
    </div>
  );
};

export default DiaryHeader;
