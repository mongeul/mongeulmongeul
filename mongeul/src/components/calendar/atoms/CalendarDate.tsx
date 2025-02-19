"use client";
import CalendarIcon from "./CalendarIcon";

interface CalendarDateProps {
  date: number;
  isSelected?: boolean;
  hasDiary?: boolean;
  diaryImage?: string;
  onClick?: () => void;
}

const CalendarDate: React.FC<CalendarDateProps> = ({
  date,
  hasDiary = false,
  diaryImage,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-12 h-12
      transition duration-200"
    >
      <CalendarIcon hasDiary={hasDiary} diaryImage={diaryImage} />
      <span>{date}</span>
    </button>
  );
};

export default CalendarDate;
