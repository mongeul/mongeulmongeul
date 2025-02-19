import { useState } from "react";
import CalendarHeader from "../atoms/CalendarHeader";
import CalendarRow from "../molecules/CalendarRow";
import CalendarGrid from "../molecules/CalendarGrid";

const getToday = () => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  };
};

interface CalendarProps {
  diaryDates: string[];
  onSelectDate: (date: string) => void;
  onMonthChange: (newDate: { year: number; month: number }) => void;
}

const Calendar = ({
  diaryDates,
  onSelectDate,
  onMonthChange,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(getToday());

  const handleMonthChange = (newYear: number, newMonth: number) => {
    setCurrentDate({ ...currentDate, year: newYear, month: newMonth });
    onMonthChange({ year: newYear, month: newMonth });
  };

  return (
    <div className="max-w-md mx-auto">
      <CalendarHeader
        year={currentDate.year}
        month={currentDate.month}
        onMonthChange={handleMonthChange}
      />
      <CalendarRow />
      <CalendarGrid
        year={currentDate.year}
        month={currentDate.month}
        selectedDate={currentDate.date}
        diaryDates={diaryDates}
        onSelectDate={(date) => {
          setCurrentDate({ ...currentDate, date });
        }}
      />
    </div>
  );
};

export default Calendar;
