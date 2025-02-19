interface CalendarHeaderProps {
  year: number;
  month: number;
  onMonthChange: (newYear: number, newMonth: number) => void;
}

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

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onMonthChange,
}) => {
  const handlePrevMonth = () => {
    const newMonth = month === 1 ? 12 : month - 1;
    const newYear = month === 1 ? year - 1 : year;
    onMonthChange(newYear, newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = month === 12 ? 1 : month + 1;
    const newYear = month === 12 ? year + 1 : year;
    onMonthChange(newYear, newMonth);
  };

  return (
    <div className="flex items-center justify-between p-4">
      {/* 이전 월 버튼 */}
      <button onClick={handlePrevMonth} className="text-lg font-bold px-2">
        ◀
      </button>

      {/* 현재 연도 & 월 표시 */}
      <span className="text-lg font-semibold">
        {year}년 {months[month - 1]}
      </span>

      {/* 다음 월 버튼 */}
      <button onClick={handleNextMonth} className="text-lg font-bold px-2">
        ▶
      </button>
    </div>
  );
};

export default CalendarHeader;
