import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CalendarDate from "../atoms/CalendarDate";

interface CalendarGridProps {
  year: number;
  month: number;
  selectedDate?: number;
  diaryDates: string[];
  onSelectDate: (date: number) => void;
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month - 1, 1).getDay();
};

const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  selectedDate,
  onSelectDate,
}) => {
  const { diaryDates } = useSelector((state: RootState) => state.calendar);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = new Date(year, month, 0).getDate();
  const totalCells = firstDay + daysInMonth;
  const rows = Math.ceil(totalCells / 7) * 7;

  return (
    <div className="grid grid-cols-7 gap-2">
      {[...Array(firstDay)].map((_, index) => (
        <div key={`empty-${index}`} className="w-10 h-10"></div>
      ))}

      {[...Array(daysInMonth)].map((_, index) => {
        const formattedDate = `${year}-${String(month).padStart(
          2,
          "0"
        )}-${String(index + 1).padStart(2, "0")}`;
        return (
          <CalendarDate
            key={index}
            date={index + 1}
            isSelected={index + 1 === selectedDate}
            hasDiary={diaryDates.includes(formattedDate)}
            onClick={() => onSelectDate(index + 1)}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;
