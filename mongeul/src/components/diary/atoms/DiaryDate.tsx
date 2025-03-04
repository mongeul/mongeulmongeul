import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// 일 찾기
const getDateofMonth = (dateString: string) => {
  const date = new Date(dateString);
  return String(date.getDate()).padStart(2, "0");
};

// 요일 찾기
const getDayofWeek = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(date);
};

const DiaryDate: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);

  if (!selectedDiary) return null;

  const date = getDateofMonth(selectedDiary.date);
  const day = getDayofWeek(selectedDiary.date);

  return (
    <p>
      {date}
      <span className="m-2">|</span>
      {day}
    </p>
  );
};

export default DiaryDate;
