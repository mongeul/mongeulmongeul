import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedDate, setCurrentMonth } from "@/store/calendarSlice";

const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

interface CalendarHeaderProps {
  year: number;
  month: number;
  onMonthChange: (newMonth: { year: number; month: number }) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onMonthChange,
}) => {
  const handlePrevMonth = () => {
    const newMonth = month === 1 ? 12 : month - 1;
    const newYear = month === 1 ? year - 1 : year;
    onMonthChange({ year: newYear, month: newMonth });
  };

  const handleNextMonth = () => {
    const newMonth = month === 12 ? 1 : month + 1;
    const newYear = month === 12 ? year + 1 : year;
    onMonthChange({ year: newYear, month: newMonth });
  };

  return (
    <div className="flex items-center justify-between p-4">
      <button onClick={handlePrevMonth} className="text-lg font-bold px-2">
        ◀
      </button>
      <span className="text-lg font-semibold">
        {year}년 {month}월
      </span>
      <button onClick={handleNextMonth} className="text-lg font-bold px-2">
        ▶
      </button>
    </div>
  );
};

export default CalendarHeader;
