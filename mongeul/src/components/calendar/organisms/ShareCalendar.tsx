import CalendarHeader from "../atoms/CalendarHeader";
import CalendarRow from "../molecules/CalendarRow";
import ShareCalendarGrid from "../molecules/ShareCalendarGrid";
import Card from "@/components/common/atoms/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedDate, setCurrentMonth } from "@/store/calendarSlice";

interface ShareCalendarProps {
  onSelectDate: (date: string) => void;
}

const ShareCalendar: React.FC<ShareCalendarProps> = ({ onSelectDate }) => {
  const dispatch = useDispatch();
  const { currentMonth, selectedDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const handleMonthChange = (newMonth: { year: number; month: number }) => {
    dispatch(setCurrentMonth(newMonth));
  };

  const handleDateSelect = (date: number) => {
    const formattedDate = `${currentMonth.year}-${String(
      currentMonth.month
    ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    dispatch(setSelectedDate(formattedDate));
    onSelectDate(formattedDate);
  };

  return (
    <div className="">
      <Card height="min-h-[450px]">
        <div className="flex justify-center items-center w-full">
          <div className="">
            <CalendarHeader
              year={currentMonth.year}
              month={currentMonth.month}
              onMonthChange={handleMonthChange}
            />
            <CalendarRow />
            <ShareCalendarGrid
              year={currentMonth.year}
              month={currentMonth.month}
              selectedDate={
                selectedDate ? Number(selectedDate.split("-")[2]) : undefined
              }
              onSelectDate={handleDateSelect}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShareCalendar;
