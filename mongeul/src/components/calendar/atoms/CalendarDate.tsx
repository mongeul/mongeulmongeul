"use client";
import CalendarIcon from "./CalendarIcon";
import { Feeling } from "@/types/diaryTypes";

interface CalendarDateProps {
  date: number;
  isSelected?: boolean;
  hasDiary?: boolean;
  feeling?: Feeling;
  onClick?: () => void;
}

const CalendarDate: React.FC<CalendarDateProps> = ({
  date,
  hasDiary = false,
  feeling,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-auto h-auto"
    >
      <CalendarIcon hasDiary={hasDiary} feeling={feeling} />
      <span>{date}</span>
    </button>
  );
};

export default CalendarDate;
