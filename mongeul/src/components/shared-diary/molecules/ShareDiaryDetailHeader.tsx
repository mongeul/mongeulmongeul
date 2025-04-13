import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import ShareDiaryDate from "../atoms/ShareDiaryDate";
import ShareDiaryWeather from "../atoms/ShareDiaryWeather";
import ShareDiaryImage from "../atoms/ShareDiaryImage";

const DiaryHeader: React.FC = () => {
  const { selectedSharedDiary } = useSelector(
    (state: RootState) => state.calendar
  );

  if (!selectedSharedDiary) return null;

  return (
    <div className="flex items-center justify-between w-full p-2">
      <ShareDiaryDate />
      <div className="flex space-x-10">
        <ShareDiaryImage />
        <ShareDiaryWeather />
      </div>
    </div>
  );
};

export default DiaryHeader;
