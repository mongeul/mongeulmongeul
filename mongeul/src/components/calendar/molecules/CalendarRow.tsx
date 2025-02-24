const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarRow: React.FC = () => {
  return (
    <div className="grid grid-cols-7 text-center text-gray-500 text-sm">
      {daysOfWeek.map((day) => (
        <span key={day} className="py-2">
          {day}
        </span>
      ))}
    </div>
  );
};

export default CalendarRow;
