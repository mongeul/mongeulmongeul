import CalendarHeader from "../atoms/CalendarHeader";
import CalendarRow from "../molecules/CalendarRow";
import CalendarGrid from "../molecules/CalendarGrid";
import Card from "@/components/common/atoms/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedDate, setCurrentMonth } from "@/store/calendarSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const { currentMonth, diaryDates, selectedDate } = useSelector(
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
            <CalendarGrid
              year={currentMonth.year}
              month={currentMonth.month}
              selectedDate={
                selectedDate ? Number(selectedDate.split("-")[2]) : undefined
              }
              diaryDates={diaryDates}
              onSelectDate={handleDateSelect}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Calendar;
