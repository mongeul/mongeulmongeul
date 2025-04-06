import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DiaryImage from "@/components/diary/atoms/DiaryImage";
import DiaryWeather from "@/components/diary/atoms/DiaryWeather";
import DiaryDate from "@/components/diary/atoms/DiaryDate";

const DiaryHeader: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  if (!selectedDiary) return null;

  return (
    <div className="flex items-center justify-between w-full p-2">
      <DiaryDate />
      <div className="flex space-x-10">
        <DiaryImage />
        <DiaryWeather />
      </div>
    </div>
  );
};

export default DiaryHeader;
