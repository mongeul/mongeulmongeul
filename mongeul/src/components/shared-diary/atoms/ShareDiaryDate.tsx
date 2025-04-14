import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const getDateofMonth = (dateString: string) => {
  const date = new Date(dateString);
  return String(date.getDate()).padStart(2, "0");
};

const getDayofWeek = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(date);
};

const ShareDiaryDate: React.FC = () => {
  const { selectedSharedDiary } = useSelector(
    (state: RootState) => state.calendar
  );

  if (!selectedSharedDiary) return null;

  const date = getDateofMonth(selectedSharedDiary.date);
  const day = getDayofWeek(selectedSharedDiary.date);

  return (
    <p>
      {date}
      <span className="m-2">|</span>
      {day}
    </p>
  );
};

export default ShareDiaryDate;
