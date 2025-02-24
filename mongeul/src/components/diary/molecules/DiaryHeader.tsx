import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DiaryDate from "../atoms/DiaryDate";
import DiaryWeather from "../atoms/DiaryWeather";
import DiaryDisclosureIcon from "../atoms/DiaryDisclosure";

const DiaryHeader: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  if (!selectedDiary) return null;

  return (
    <div className="flex items-center justify-between w-full p-2">
      <DiaryDate />
      <div className="flex space-x-3">
        <DiaryWeather />
        <DiaryDisclosureIcon />
      </div>
    </div>
  );
};

export default DiaryHeader;
