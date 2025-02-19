"use client";

import Card from "@/components/common/atoms/Card";
import Calendar from "../organisms/Calendar";
import { div } from "framer-motion/client";

interface CalendarCardProps {
  diaryDates: string[];
  onDateSelect: (date: string) => void;
  onMonthChange: (newDate: { year: number; month: number }) => void;
}

const CalendarCard = ({
  diaryDates,
  onDateSelect,
  onMonthChange,
}: CalendarCardProps) => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="flex w-full justify-center lg:justify-start flex-grow">
        <Card width="w-full max-w-md" height="flex-grow">
          <div className="w-full h-full flex justify-center items-start flex-grow">
            <Calendar
              diaryDates={diaryDates}
              onSelectDate={onDateSelect}
              onMonthChange={onMonthChange}
            />
          </div>
        </Card>
      </div>
      <div className="hidden lg:block "></div>
    </div>
  );
};

export default CalendarCard;
