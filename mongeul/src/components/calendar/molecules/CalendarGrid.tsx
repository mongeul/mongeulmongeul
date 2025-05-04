import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CalendarDate from "../atoms/CalendarDate";
import { Feeling } from "@/types/diaryTypes";

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
  const { diaryEntries } = useSelector((state: RootState) => state.calendar);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = new Date(year, month, 0).getDate();
  const totalCells = firstDay + daysInMonth;
  const rows = 6 * 7;
  const emptyCells = Math.max(rows - totalCells, 0);

  return (
    <div className="grid grid-cols-7 gap-2 w-full">
      {[...Array(firstDay)].map((_, index) => (
        <div key={`empty-${index}`} className="w-10 h-10"></div>
      ))}

      {[...Array(daysInMonth)].map((_, index) => {
        const formattedDate = `${year}-${String(month).padStart(
          2,
          "0"
        )}-${String(index + 1).padStart(2, "0")}`;
        const diaryEntry = diaryEntries.find(
          (entry) => entry.date === formattedDate
        );
        const hasDiary = Boolean(diaryEntry);
        const feeling = diaryEntry?.feeling as Feeling;

        return (
          <CalendarDate
            key={index}
            date={index + 1}
            isSelected={index + 1 === selectedDate}
            hasDiary={hasDiary}
            feeling={feeling}
            onClick={() => onSelectDate(index + 1)}
          />
        );
      })}

      {[...Array(emptyCells)].map((_, index) => (
        <div key={`post-empty-${index}`} className="w-10 h-10"></div>
      ))}
    </div>
  );
};

export default CalendarGrid;
